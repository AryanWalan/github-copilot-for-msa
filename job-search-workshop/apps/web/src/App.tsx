import {
    CircleAlert,
    ExternalLink,
    MapPin,
    RefreshCw,
    Search,
} from "lucide-react";
import { useEffect, useState } from "react";

import { getLatestRun, getListings, startCollection } from "./api";
import type { CollectionRun, Listing } from "./types";

function formatTimestamp(value: string | null): string {
  if (!value) {
    return "Never";
  }
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function scoreTone(score: number | undefined): string {
  if (score === undefined) return "";
  if (score >= 7) return "score-high";
  if (score >= 4) return "score-mid";
  return "score-low";
}

export default function App() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [run, setRun] = useState<CollectionRun | null>(null);
  const [search, setSearch] = useState("");
  const [benefits, setBenefits] = useState("");
  const [rankByBenefits, setRankByBenefits] = useState(true);
  const [loading, setLoading] = useState(true);
  const [collecting, setCollecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    Promise.all([
      getListings("", { rankByBenefits: true }),
      getLatestRun(),
    ])
      .then(([nextListings, latestRun]) => {
        if (!active) return;
        setListings(nextListings);
        setRun(latestRun);
      })
      .catch((loadError: unknown) => {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load data.",
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (run?.status !== "running") return;

    const timer = window.setInterval(() => {
      getLatestRun()
        .then((latestRun) => {
          setRun(latestRun);
          if (latestRun?.status !== "running") {
            setCollecting(false);
            void getListings(search.trim(), {
              benefits: benefits.trim(),
              rankByBenefits,
            }).then((nextListings) => {
              setListings(nextListings);
              setSelectedListing(null);
            });
          }
        })
        .catch((pollError: unknown) => {
          setError(
            pollError instanceof Error
              ? pollError.message
              : "Unable to refresh collection status.",
          );
          setCollecting(false);
        });
    }, 750);

    return () => window.clearInterval(timer);
  }, [run?.status]);

  async function handleCollection(): Promise<void> {
    setError(null);
    setCollecting(true);
    try {
      setRun(await startCollection());
    } catch (collectionError) {
      setError(
        collectionError instanceof Error
          ? collectionError.message
          : "Unable to start collection.",
      );
      setCollecting(false);
    }
  }

  async function handleSearch(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    setError(null);
    try {
      setListings(
        await getListings(search.trim(), {
          benefits: benefits.trim(),
          rankByBenefits,
        }),
      );
      setSelectedListing(null);
    } catch (searchError) {
      setError(
        searchError instanceof Error ? searchError.message : "Search failed.",
      );
    }
  }

  return (
    <div className="app-shell">
      <main>
        <header className="page-header">
          <div>
            <p className="eyebrow">New Zealand software roles</p>
            <h1>Job Finder</h1>
          </div>
          <div className="refresh-control">
            <span className="refresh-timestamp">
              Last refreshed {formatTimestamp(run?.completedAt ?? null)}
            </span>
            <button
              className="primary-action"
              disabled={collecting || run?.status === "running"}
              onClick={() => void handleCollection()}
              type="button"
            >
              <RefreshCw
                className={
                  collecting || run?.status === "running" ? "spin" : ""
                }
                size={18}
                aria-hidden="true"
              />
              {collecting || run?.status === "running"
                ? "Refreshing"
                : "Refresh"}
            </button>
          </div>
        </header>

        {error && (
          <div className="error-banner" role="alert">
            <CircleAlert size={18} aria-hidden="true" />
            {error}
          </div>
        )}

        <section className="listings-section">
          <div className="section-toolbar">
            <div>
              <p className="eyebrow">Current results</p>
              <h2>Software roles ({listings.length})</h2>
            </div>
            <form
              className="search-form"
              onSubmit={(event) => void handleSearch(event)}
            >
              <Search size={18} aria-hidden="true" />
              <label className="sr-only" htmlFor="job-search">
                Search roles
              </label>
              <input
                id="job-search"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Title, company, or location"
                type="search"
                value={search}
              />
              <input
                aria-label="Filter by benefits"
                onChange={(event) => setBenefits(event.target.value)}
                placeholder="Benefits"
                type="search"
                value={benefits}
              />
              <label className="ranking-toggle">
                <input
                  checked={rankByBenefits}
                  onChange={(event) => setRankByBenefits(event.target.checked)}
                  type="checkbox"
                />
                Rank by NZ fit and benefits
              </label>
              <button type="submit">Search</button>
            </form>
          </div>

          {loading ? (
            <div className="empty-state" aria-live="polite">
              <RefreshCw className="spin" size={24} aria-hidden="true" />
              <strong>Loading roles</strong>
            </div>
          ) : listings.length === 0 ? (
            <div className="empty-state">
              <strong>No roles found yet</strong>
              <p>Select Refresh to check for current vacancies.</p>
            </div>
          ) : (
            <div className="listing-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Rank</th>
                    <th aria-label="Open source" />
                  </tr>
                </thead>
                <tbody>
                  {listings.map((listing) => (
                    <tr
                      className={
                        selectedListing?.id === listing.id ? "selected" : ""
                      }
                      key={listing.id}
                      onClick={() => setSelectedListing(listing)}
                    >
                      <td>
                        <strong>{listing.title}</strong>
                      </td>
                      <td>{listing.companyName}</td>
                      <td>
                        <span className="location">
                          <MapPin size={14} aria-hidden="true" />
                          {listing.location ?? "Not provided"}
                        </span>
                        {listing.locationScore !== undefined && (
                          <small
                            className={`score-note ${scoreTone(listing.locationScore)}`}
                          >
                            {listing.locationScore}/10 NZ fit
                          </small>
                        )}
                      </td>
                      <td>
                        {listing.matchScore !== undefined && (
                          <strong
                            className={`score-note ${scoreTone(listing.matchScore)}`}
                          >
                            {listing.matchScore}/10
                          </strong>
                        )}
                      </td>
                      <td>
                        <a
                          className="icon-link"
                          href={listing.sourceUrl}
                          rel="noreferrer"
                          target="_blank"
                          title="Open original listing"
                        >
                          <ExternalLink size={17} aria-hidden="true" />
                          <span className="sr-only">Open {listing.title}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {selectedListing && (
          <section
            className="listing-detail"
            aria-labelledby="listing-detail-title"
          >
            <p className="eyebrow">Role details</p>
            <h2 id="listing-detail-title">{selectedListing.title}</h2>
            <dl>
              <div>
                <dt>Company</dt>
                <dd>{selectedListing.companyName}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{selectedListing.location ?? "Not provided"}</dd>
              </div>
              <div>
                <dt>Collected</dt>
                <dd>{formatTimestamp(selectedListing.lastSeenAt)}</dd>
              </div>
            </dl>
            <p>
              {selectedListing.summary ??
                "Open the original listing for the full job description."}
            </p>
            {selectedListing.benefitsScore !== undefined && (
              <div className="comparison-summary">
                <strong className={scoreTone(selectedListing.matchScore)}>
                  Match score: {selectedListing.matchScore}/10
                </strong>
                <span>
                  Benefits {selectedListing.benefitsScore}/10; New Zealand fit{" "}
                  {selectedListing.locationScore}/10
                </span>
                <span>{selectedListing.rankingReasons?.join("; ")}</span>
              </div>
            )}
            <a
              className="primary-action"
              href={selectedListing.sourceUrl}
              rel="noreferrer"
              target="_blank"
            >
              View original listing{" "}
              <ExternalLink size={18} aria-hidden="true" />
            </a>
          </section>
        )}
      </main>
    </div>
  );
}
