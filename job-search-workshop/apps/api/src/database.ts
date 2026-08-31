import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

import Database from "better-sqlite3";

import type {
  CollectionRun,
  Listing,
  ListingFilters,
  Source,
} from "./models.js";
import { candidateSources } from "./sources.js";

type SqlValue = string | number | null;

export class JobFinderRepository {
  private readonly database: Database.Database;

  public constructor(databasePath: string) {
    if (databasePath !== ":memory:") {
      mkdirSync(dirname(databasePath), { recursive: true });
    }

    this.database = new Database(databasePath);
    this.database.pragma("journal_mode = WAL");
    this.migrate();
    this.seedSources();
  }

  public close(): void {
    this.database.close();
  }

  public listSources(): Source[] {
    const rows = this.database
      .prepare(
        `SELECT id, name, careers_url, endpoint_url, source_type, enabled, policy_status
         FROM sources
         ORDER BY name`,
      )
      .all() as Array<Record<string, SqlValue>>;

    return rows.map((row) => ({
      id: String(row.id),
      name: String(row.name),
      careersUrl: String(row.careers_url),
      endpointUrl: row.endpoint_url === null ? null : String(row.endpoint_url),
      sourceType: String(row.source_type),
      enabled: Boolean(row.enabled),
      policyStatus: String(row.policy_status) as Source["policyStatus"],
    }));
  }

  public listListings(filters: ListingFilters = {}): Listing[] {
    const clauses: string[] = [];
    const parameters: Record<string, string> = {};

    if (filters.search) {
      clauses.push(
        "(title LIKE @search OR company_name LIKE @search OR location LIKE @search)",
      );
      parameters.search = `%${filters.search}%`;
    }
    if (filters.company) {
      clauses.push("company_name = @company");
      parameters.company = filters.company;
    }
    if (filters.location) {
      clauses.push("location = @location");
      parameters.location = filters.location;
    }
    if (filters.sourceId) {
      clauses.push("source_id = @sourceId");
      parameters.sourceId = filters.sourceId;
    }

    const where = clauses.length > 0 ? `WHERE ${clauses.join(" AND ")}` : "";
    const rows = this.database
      .prepare(
        `SELECT id, source_id, company_name, title, location, summary, posted_at,
                source_url, first_seen_at, last_seen_at, status
         FROM listings
         ${where}
         ORDER BY last_seen_at DESC, title`,
      )
      .all(parameters) as Array<Record<string, SqlValue>>;

    return rows.map((row) => ({
      id: String(row.id),
      sourceId: String(row.source_id),
      companyName: String(row.company_name),
      title: String(row.title),
      location: row.location === null ? null : String(row.location),
      summary: row.summary === null ? null : String(row.summary),
      postedAt: row.posted_at === null ? null : String(row.posted_at),
      sourceUrl: String(row.source_url),
      firstSeenAt: String(row.first_seen_at),
      lastSeenAt: String(row.last_seen_at),
      status: String(row.status) as Listing["status"],
    }));
  }

  public createCollectionRun(sourceCount: number): CollectionRun {
    const run: CollectionRun = {
      id: crypto.randomUUID(),
      startedAt: new Date().toISOString(),
      completedAt: null,
      status: "running",
      sourceCount,
      successCount: 0,
      skippedCount: 0,
      failureCount: 0,
    };

    this.database
      .prepare(
        `INSERT INTO collection_runs
           (id, started_at, completed_at, status, source_count, success_count, skipped_count, failure_count)
         VALUES
           (@id, @startedAt, @completedAt, @status, @sourceCount, @successCount, @skippedCount, @failureCount)`,
      )
      .run(run);

    return run;
  }

  public completeCollectionRun(
    id: string,
    status: CollectionRun["status"],
    counts: Pick<
      CollectionRun,
      "successCount" | "skippedCount" | "failureCount"
    >,
  ): void {
    this.database
      .prepare(
        `UPDATE collection_runs
         SET completed_at = @completedAt,
             status = @status,
             success_count = @successCount,
             skipped_count = @skippedCount,
             failure_count = @failureCount
         WHERE id = @id`,
      )
      .run({ id, completedAt: new Date().toISOString(), status, ...counts });
  }

  public addSourceResult(
    runId: string,
    sourceId: string,
    status: "success" | "skipped" | "partial" | "failed",
    diagnostic: string | null,
  ): void {
    this.database
      .prepare(
        `INSERT INTO collection_source_results
           (run_id, source_id, status, diagnostic, completed_at)
         VALUES (?, ?, ?, ?, ?)`,
      )
      .run(runId, sourceId, status, diagnostic, new Date().toISOString());
  }

  public getLatestCollectionRun(): CollectionRun | null {
    const row = this.database
      .prepare(
        `SELECT id, started_at, completed_at, status, source_count,
                success_count, skipped_count, failure_count
         FROM collection_runs
         ORDER BY started_at DESC
         LIMIT 1`,
      )
      .get() as Record<string, SqlValue> | undefined;

    if (!row) {
      return null;
    }

    return {
      id: String(row.id),
      startedAt: String(row.started_at),
      completedAt: row.completed_at === null ? null : String(row.completed_at),
      status: String(row.status) as CollectionRun["status"],
      sourceCount: Number(row.source_count),
      successCount: Number(row.success_count),
      skippedCount: Number(row.skipped_count),
      failureCount: Number(row.failure_count),
    };
  }

  private migrate(): void {
    this.database.exec(`
      CREATE TABLE IF NOT EXISTS sources (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        careers_url TEXT NOT NULL,
        endpoint_url TEXT,
        source_type TEXT NOT NULL,
        enabled INTEGER NOT NULL DEFAULT 0,
        policy_status TEXT NOT NULL DEFAULT 'pending'
          CHECK (policy_status IN ('approved', 'pending', 'rejected'))
      );

      CREATE TABLE IF NOT EXISTS listings (
        id TEXT PRIMARY KEY,
        source_id TEXT NOT NULL REFERENCES sources(id),
        company_name TEXT NOT NULL,
        title TEXT NOT NULL,
        location TEXT,
        summary TEXT,
        posted_at TEXT,
        source_url TEXT NOT NULL,
        first_seen_at TEXT NOT NULL,
        last_seen_at TEXT NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('active', 'stale', 'unavailable'))
      );

      CREATE TABLE IF NOT EXISTS collection_runs (
        id TEXT PRIMARY KEY,
        started_at TEXT NOT NULL,
        completed_at TEXT,
        status TEXT NOT NULL CHECK (status IN ('running', 'completed', 'partial', 'failed')),
        source_count INTEGER NOT NULL,
        success_count INTEGER NOT NULL,
        skipped_count INTEGER NOT NULL,
        failure_count INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS collection_source_results (
        run_id TEXT NOT NULL REFERENCES collection_runs(id),
        source_id TEXT NOT NULL REFERENCES sources(id),
        status TEXT NOT NULL CHECK (status IN ('success', 'skipped', 'partial', 'failed')),
        diagnostic TEXT,
        completed_at TEXT NOT NULL,
        PRIMARY KEY (run_id, source_id)
      );
    `);
  }

  private seedSources(): void {
    const insert = this.database.prepare(
      `INSERT OR IGNORE INTO sources
         (id, name, careers_url, endpoint_url, source_type, enabled, policy_status)
       VALUES
         (@id, @name, @careersUrl, @endpointUrl, @sourceType, @enabled, @policyStatus)`,
    );

    const seed = this.database.transaction((sources: Source[]) => {
      for (const source of sources) {
        insert.run({ ...source, enabled: source.enabled ? 1 : 0 });
      }
    });

    seed(candidateSources);
  }
}
