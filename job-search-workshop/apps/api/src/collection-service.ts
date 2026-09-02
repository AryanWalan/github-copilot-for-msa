import { JobFinderRepository } from "./database.js";
import type { CollectionRun, Listing, Source } from "./models.js";

export class CollectionAlreadyRunningError extends Error {}

const JOB_URL_PATTERNS: Record<string, RegExp> = {
  seek: /\/job\//,
  "microsoft-careers": /\/careers\?[^\s]*pid=/,
  xero: /\/jobs\/[0-9a-f-]+\//,
  serko: /\/job-listing\//,
  pushpay: /job-boards\.greenhouse\.io\/pushpay\/jobs\//,
  "trade-me-jobs": /\/a\/jobs\/.*\/listing\//,
};

function text(value: string): string {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractXeroLocation(value: string): string | null {
  const location = value
    .replace(/<[^>]+>/g, "\n")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .split(/\n+/)
    .map((fragment) => fragment.replace(/\s+/g, " ").trim())
    .find((fragment) => fragment.endsWith("New Zealand"));

  return location ?? null;
}

function extractSerkoLocation(value: string): string | null {
  const location = text(value).match(
    /\b(?:Auckland|Wellington|Christchurch|Dunedin|Hamilton|Tauranga|Queenstown|Palmerston North),\s*New Zealand\b/,
  );

  return location?.[0] ?? null;
}

function extractListings(
  source: Source,
  html: string,
): Array<
  Pick<Listing, "title" | "location" | "summary" | "benefits" | "sourceUrl">
> {
  const pattern = JOB_URL_PATTERNS[source.id];
  if (!pattern) return [];

  const matches = [
    ...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi),
  ];
  const listings = new Map<
    string,
    Pick<Listing, "title" | "location" | "summary" | "benefits" | "sourceUrl">
  >();
  for (const [index, match] of matches.entries()) {
    const href = match[1];
    const label = match[2];
    if (!href || !label) continue;
    const sourceUrl = new URL(href.replace(/&amp;/g, "&"), source.careersUrl)
      .href;
    const labelText = text(label);
    const serkoLocation =
      source.id === "serko" ? extractSerkoLocation(labelText) : null;
    const title = serkoLocation
      ? labelText
          .replace(serkoLocation, "")
          .replace(/\b(?:full[- ]time|part[- ]time|contract)\b/gi, "")
          .replace(/\s+/g, " ")
          .trim()
      : labelText;
    if (!pattern.test(sourceUrl) || title.length < 3 || title.length > 160)
      continue;

    const nextMatch = matches[index + 1];
    const nextMatchIndex = nextMatch?.index ?? html.length;
    const location =
      source.id === "xero"
        ? extractXeroLocation(
            html.slice((match.index ?? 0) + match[0].length, nextMatchIndex),
          )
        : serkoLocation;
    if (
      (source.id === "xero" || source.id === "serko") &&
      !location?.endsWith("New Zealand")
    )
      continue;

    listings.set(sourceUrl, {
      title,
      location,
      summary: null,
      benefits: null,
      sourceUrl,
    });
  }
  return [...listings.values()].slice(0, 50);
}

export class CollectionService {
  private activeRunId: string | null = null;

  public constructor(private readonly repository: JobFinderRepository) {}

  public start(): CollectionRun {
    if (this.activeRunId) {
      throw new CollectionAlreadyRunningError(
        "A collection run is already active.",
      );
    }

    const sources = this.repository
      .listSources()
      .filter((source) => source.enabled);
    const run = this.repository.createCollectionRun(sources.length);
    this.activeRunId = run.id;

    setImmediate(async () => {
      try {
        let successCount = 0;
        let failureCount = 0;
        for (const source of sources) {
          try {
            const response = await fetch(source.careersUrl, {
              headers: { "user-agent": "JobFinderMvp/0.1 (local job search)" },
              signal: AbortSignal.timeout(15_000),
            });
            if (!response.ok)
              throw new Error(`Request failed with ${response.status}`);
            this.repository.saveListings(
              source,
              extractListings(source, await response.text()),
            );
            this.repository.addSourceResult(run.id, source.id, "success", null);
            successCount += 1;
          } catch {
            this.repository.addSourceResult(
              run.id,
              source.id,
              "failed",
              "Unable to collect listings from this source.",
            );
            failureCount += 1;
          }
        }

        this.repository.completeCollectionRun(
          run.id,
          failureCount ? "partial" : "completed",
          {
            successCount,
            skippedCount: 0,
            failureCount,
          },
        );
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
