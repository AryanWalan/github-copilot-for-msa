import type { CollectionRun, Listing, Source } from "./types";

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

export async function getListings(search = ""): Promise<Listing[]> {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
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
