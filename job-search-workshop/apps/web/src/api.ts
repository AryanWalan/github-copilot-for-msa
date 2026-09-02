import type { CollectionRun, Listing, PreferredRole, Source } from "./types";

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(
      body?.error ?? `Request failed with status ${response.status}.`,
    );
  }
  return (await response.json()) as T;
}

export async function getSources(): Promise<Source[]> {
  const result = await requestJson<{ sources: Source[] }>("/api/sources");
  return result.sources;
}

export async function getListings(
  search = "",
  options: {
    benefits?: string;
    rankByBenefits?: boolean;
    preferredRole?: PreferredRole;
  } = {},
): Promise<Listing[]> {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (options.benefits) params.set("benefits", options.benefits);
  if (options.rankByBenefits) params.set("rank", "benefits");
  if (options.preferredRole && options.preferredRole !== "any") {
    params.set("role", options.preferredRole);
  }
  const query = params.size > 0 ? `?${params.toString()}` : "";
  const result = await requestJson<{ listings: Listing[] }>(
    `/api/listings${query}`,
  );
  return result.listings;
}

export async function getLatestRun(): Promise<CollectionRun | null> {
  const result = await requestJson<{ run: CollectionRun | null }>(
    "/api/collection-runs/latest",
  );
  return result.run;
}

export async function startCollection(): Promise<CollectionRun> {
  const result = await requestJson<{ run: CollectionRun }>(
    "/api/collection-runs",
    { method: "POST" },
  );
  return result.run;
}
