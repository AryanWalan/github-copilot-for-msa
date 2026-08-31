import { useEffect, useState } from "react";
import {
  CheckCircle2,
  CircleAlert,
  Clock3,
  Database,
  ExternalLink,
  MapPin,
  RefreshCw,
  Search,
} from "lucide-react";

import { getLatestRun, getListings, getSources, startCollection } from "./api";
import type { CollectionRun, Listing, Source } from "./types";

function formatTimestamp(value: string | null): string {
  if (!value) {
    return "Never";
  }
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function App() {
  const [sources, setSources] = useState<Source[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [run, setRun] = useState<CollectionRun | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [collecting, setCollecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    Promise.all([getSources(), getListings(), getLatestRun()])
      .then(([nextSources, nextListings, latestRun]) => {
        if (!active) return;
        setSources(nextSources);
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
            void getListings().then(setListings);
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
      setListings(await getListings(search.trim()));
    } catch (searchError) {
      setError(
        searchError instanceof Error ? searchError.message : "Search failed.",
      );
    }
  }

  const approvedSourceCount = sources.filter(
    (source) => source.policyStatus === "approved",
  ).length;

  return (
    <div className="app-shell">
      <aside className="source-rail">
        <div className="brand-mark" aria-hidden="true">
          JF
        </div>
        <div>
          <p className="eyebrow">Source registry</p>
          <h2>{sources.length || 8} candidates</h2>
        </div>

        <div className="source-list" aria-label="Configured sources">
          {sources.map((source) => (
            <a
              className="source-row"
              href={source.careersUrl}
              key={source.id}
              rel="noreferrer"
              target="_blank"
            >
              <span className={`status-dot status-${source.policyStatus}`} />
              <span>
                <strong>{source.name}</strong>
                <small>{source.enabled ? "Enabled" : "Review pending"}</small>
              </span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          ))}
        </div>

        <div className="rail-summary">
          <CheckCircle2 size={17} aria-hidden="true" />
          <span>{approvedSourceCount} approved</span>
        </div>
      </aside>

      <main>
        <header className="page-header">
          <div>
            <p className="eyebrow">New Zealand software roles</p>
            <h1>Job Finder</h1>
          </div>
          <button
            className="primary-action"
            disabled={collecting || run?.status === "running"}
            onClick={() => void handleCollection()}
            type="button"
          >
            <RefreshCw
              className={collecting || run?.status === "running" ? "spin" : ""}
              size={18}
              aria-hidden="true"
            />
            {collecting || run?.status === "running"
              ? "Collecting"
              : "Collect roles"}
          </button>
        </header>

        <section className="status-band" aria-label="Collection status">
          <div>
            <Clock3 size={19} aria-hidden="true" />
            <span>
              <small>Last collection</small>
              <strong>{formatTimestamp(run?.completedAt ?? null)}</strong>
            </span>
          </div>
          <div>
            <Database size={19} aria-hidden="true" />
            <span>
              <small>Stored roles</small>
              <strong>{listings.length}</strong>
            </span>
          </div>
          <div>
            <CircleAlert size={19} aria-hidden="true" />
            <span>
              <small>Source outcomes</small>
              <strong>
                {run
                  ? `${run.successCount} ok / ${run.skippedCount} skipped / ${run.failureCount} failed`
                  : "No runs yet"}
              </strong>
            </span>
          </div>
        </section>

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
              <h2>Software roles</h2>
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
              <button type="submit">Search</button>
            </form>
          </div>

          {loading ? (
            <div className="empty-state" aria-live="polite">
              <RefreshCw className="spin" size={24} aria-hidden="true" />
              <strong>Loading local data</strong>
            </div>
          ) : listings.length === 0 ? (
            <div className="empty-state">
              <Database size={28} aria-hidden="true" />
              <strong>No roles collected yet</strong>
              <p>
                Sources remain disabled until their endpoint and collection
                policy are verified.
              </p>
            </div>
          ) : (
            <div className="listing-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Freshness</th>
                    <th aria-label="Open source" />
                  </tr>
                </thead>
                <tbody>
                  {listings.map((listing) => (
                    <tr key={listing.id}>
                      <td>
                        <strong>{listing.title}</strong>
                      </td>
                      <td>{listing.companyName}</td>
                      <td>
                        <span className="location">
                          <MapPin size={14} aria-hidden="true" />
                          {listing.location ?? "Not provided"}
                        </span>
                      </td>
                      <td>
                        <span className={`listing-status ${listing.status}`}>
                          {listing.status}
                        </span>
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
      </main>
    </div>
  );
}
