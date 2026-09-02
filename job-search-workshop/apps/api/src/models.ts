export type SourceStatus = "approved" | "pending" | "rejected";
export type PreferredRole =
  | "any"
  | "software"
  | "platform"
  | "management"
  | "data-security"
  | "qa";

export interface Source {
  id: string;
  name: string;
  careersUrl: string;
  endpointUrl: string | null;
  sourceType: string;
  enabled: boolean;
  policyStatus: SourceStatus;
}

export interface Listing {
  id: string;
  sourceId: string;
  companyName: string;
  title: string;
  location: string | null;
  summary: string | null;
  benefits: string | null;
  postedAt: string | null;
  sourceUrl: string;
  firstSeenAt: string;
  lastSeenAt: string;
  status: "active" | "stale" | "unavailable";
  benefitsScore?: number | null;
  benefitsReasons?: string[];
  roleScore?: number;
  matchScore?: number | null;
  rankingReasons?: string[];
}

export interface ListingFilters {
  search?: string;
  company?: string;
  location?: string;
  sourceId?: string;
  benefits?: string;
  rankByBenefits?: boolean;
  preferredRole?: PreferredRole;
}

export interface CollectionRun {
  id: string;
  startedAt: string;
  completedAt: string | null;
  status: "running" | "completed" | "partial" | "failed";
  sourceCount: number;
  successCount: number;
  skippedCount: number;
  failureCount: number;
}
