import type { CollectionRun } from "./models.js";
import { JobFinderRepository } from "./database.js";

export class CollectionAlreadyRunningError extends Error {}

export class CollectionService {
  private activeRunId: string | null = null;

  public constructor(private readonly repository: JobFinderRepository) {}

  public start(): CollectionRun {
    if (this.activeRunId) {
      throw new CollectionAlreadyRunningError(
        "A collection run is already active.",
      );
    }

    const sources = this.repository.listSources();
    const run = this.repository.createCollectionRun(sources.length);
    this.activeRunId = run.id;

    setImmediate(() => {
      try {
        for (const source of sources) {
          this.repository.addSourceResult(
            run.id,
            source.id,
            "skipped",
            source.enabled
              ? "No verified adapter is available."
              : "Source is disabled pending endpoint and policy verification.",
          );
        }

        this.repository.completeCollectionRun(run.id, "completed", {
          successCount: 0,
          skippedCount: sources.length,
          failureCount: 0,
        });
      } catch {
        this.repository.completeCollectionRun(run.id, "failed", {
          successCount: 0,
          skippedCount: 0,
          failureCount: sources.length,
        });
      } finally {
        this.activeRunId = null;
      }
    });

    return run;
  }
}
