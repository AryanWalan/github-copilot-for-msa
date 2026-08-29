# Local job search application specification

This document defines the product contract for the alternative Microsoft Student Accelerator live-coding workshop. It defines required outcomes and boundaries, not a fixed project structure.

## Purpose

Build a local application that helps people find software-development roles advertised by companies in New Zealand. The application collects permitted public job listings, stores them locally, and presents them through a small web interface.

The application is also a teaching vehicle. Learners use GitHub Copilot to clarify requirements, plan changes, implement features, test behavior, review output, and collaborate through GitHub Issues and pull requests.

## Target users

- A job seeker who wants one local view of relevant New Zealand roles.
- A workshop learner who wants to improve a working application through a small, reviewable change.
- A facilitator who needs a deterministic application that demonstrates reliability and agentic development practices.

## Goals

- Provide a useful local MVP with a small set of configured company career sources.
- Collect software-development roles from publicly accessible pages.
- Preserve useful data when an individual source fails.
- Make source, freshness, and collection errors visible to the user.
- Provide a codebase that supports independent student contributions.

## Non-goals

- Exhaustively discovering every software company or job in New Zealand.
- Scraping authenticated pages, bypassing CAPTCHAs, evading anti-bot controls, or modifying browser profiles.
- Automatically applying for jobs or collecting unnecessary personal information.
- Running a production-scale crawler or deploying to the cloud.
- Depending on a paid search API for the initial demonstration.

## Assumptions and boundaries

- The initial source list is a small, version-controlled registry of New Zealand software companies and public careers URLs.
- The collector fetches only pages that are publicly accessible and permitted by the source's terms and robots policy. When permission is unclear, it skips the source.
- The application runs on the user's machine, binds to localhost by default, and stores data locally.
- A search-provider adapter may be added later to discover candidate companies. It is optional and must not be required for the live MVP.
- The parser must tolerate a source failure without deleting previously collected listings from other sources.

## User workflow

1. Start the local application.
2. Review the configured companies and the last collection status.
3. Start a collection run.
4. Inspect new and previously collected roles in the job list.
5. Search by title, company, or location and filter by relevant fields.
6. Open a role to see its summary, source, collection time, and original link.
7. Follow the original link to apply on the employer's site.
8. Review source errors and stale-data indicators before relying on results.

## Functional requirements

### Source registry

- Store a stable identifier, company name, careers URL, source type, enabled state, and policy-review note for each source.
- Allow a source to be enabled or disabled without deleting its historical listings.
- Keep source-specific parsing behind an adapter boundary so one layout change does not affect every source.

### Collection

- Start a run manually from the local UI or an equivalent local API operation.
- Fetch only enabled, valid HTTPS URLs.
- Apply a descriptive user agent, per-host rate limits, bounded concurrency, timeouts, response-size limits, and limited retries with backoff for transient failures.
- Parse software-development roles from each supported source and normalize them to the common listing model.
- Record a result for every source: success, skipped, partial, or failed, with a safe diagnostic and timestamp.
- Preserve existing listings when a source fails. Do not interpret a temporary empty response as permission to delete all prior data.
- Deduplicate listings using a stable source identifier where available, otherwise a documented canonical key based on source, title, company, location, and URL.

### Local data and presentation

- Store companies, sources, listings, and collection runs in a local database or equivalent durable store.
- Display a list of listings with title, company, location, posted date when available, collection time, freshness, and source status.
- Support search and filters for title, company, location, and source.
- Display a detail view with the normalized summary, original URL, source, dates, and any parsing caveats.
- Link to the original careers page rather than copying an application workflow.
- Show an empty state, loading state, source-level errors, and a clear indication when data may be stale.

## Recommended implementation approach

Use the following stack for a predictable live build, but treat the contracts in this specification as more important than the exact libraries:

- Node.js 22 or later with strict TypeScript.
- React with Vite for the local web UI.
- A small Node HTTP API for collection and query operations.
- SQLite for local durable storage.
- Standards-based `fetch` and an HTML parser for permitted pages.

A fetch-based parser keeps the MVP credential-free and avoids browser automation. A learner may choose another stack when it provides equivalent behavior, tests, local operation, and safeguards.

## Component boundaries

- **Source registry:** owns configured companies, URLs, enablement, and policy notes.
- **Collector:** schedules requests, applies limits, handles retries, and records outcomes.
- **Source adapter:** parses one source layout into a common listing shape.
- **Normalizer and deduplicator:** validates fields, canonicalizes URLs, and assigns stable listing keys.
- **Local repository:** persists sources, listings, and collection runs.
- **HTTP API:** exposes local operations for collection status, collection runs, and listing queries.
- **Web UI:** presents status, listings, filters, details, and source links.

Keep network access, parsing, persistence, and presentation independently testable. Do not let a parser write directly to the UI or let a request handler contain source-specific selectors.

## Data model

### Company and source

- `id`: stable local identifier.
- `name`: display name.
- `careersUrl`: validated public HTTPS URL.
- `sourceType`: adapter identifier.
- `enabled`: Boolean.
- `policyReviewedAt`: optional date.

### Job listing

- `id`: stable deduplication key.
- `sourceId`: related source.
- `companyName`: normalized company name.
- `title`: role title.
- `location`: normalized location when available.
- `summary`: bounded plain-text summary when available.
- `postedAt`: optional source-provided date.
- `sourceUrl`: original public listing URL.
- `firstSeenAt` and `lastSeenAt`: local timestamps.
- `status`: active, stale, or unavailable.

### Collection run

- `id`: stable run identifier.
- `startedAt` and `completedAt`.
- `status`: completed, partial, or failed.
- `sourceCount`, `successCount`, `skippedCount`, and `failureCount`.
- Per-source result, duration, item count, and safe error classification.

## Reliability and security requirements

- Check source terms and robots policy before enabling a source, and document the review.
- Use a descriptive user agent and respect per-host rate limits.
- Bound concurrency, request duration, response size, retries, and stored text length.
- Validate URLs and reject non-HTTPS or unexpected destinations.
- Escape or safely render all source-controlled text in the UI.
- Do not execute fetched scripts or HTML. Treat source content as untrusted data.
- Keep diagnostics structured and free of credentials, tokens, and full response bodies.
- Bind to localhost by default and do not expose an unauthenticated network service by default.
- Never bypass authentication, CAPTCHAs, robots directives, rate limits, or access controls.
- Mark stale data rather than presenting it as current.
- Use deterministic fixtures for parsers and avoid tests that depend on live websites.

## Test strategy

Cover the following with focused automated tests:

- Source configuration and URL validation.
- Parser fixtures for each supported source, including missing optional fields and changed or empty layouts.
- Normalization, canonical URLs, stable identifiers, and duplicate listings within and across runs.
- Request limits, timeouts, retry behavior, response limits, and safe error classification.
- Repository persistence, preservation of prior data, stale status, and partial collection failures.
- API validation, error responses, and collection status.
- UI loading, empty, error, stale, search, filter, detail, and original-link workflows.

Use a small local fixture set for the live demonstration. A passing test suite must not require network access or credentials.

## Milestones

1. Define the source registry, data model, local commands, and sample fixtures.
2. Implement storage and deterministic parsing for one source.
3. Add collection limits, retries, diagnostics, and partial-failure behavior.
4. Add the API and a usable listing, search, filter, and detail UI.
5. Add a second source adapter and verify that the boundary remains isolated.
6. Run the documented tests, typecheck, lint, build, and local end-to-end demonstration.

## Acceptance criteria

The MVP is acceptable when:

- A learner can start it locally using documented commands.
- It collects roles from at least two configured public sources using fixtures or permitted live pages.
- A failed source does not remove successful results or prior data.
- Search, filtering, details, freshness, source links, and collection outcomes are visible in the UI.
- Duplicate listings remain a single listing with updated collection metadata.
- Tests cover parsing, validation, deduplication, persistence, partial failure, API behavior, and core UI states.
- The application respects source policies and does not require credentials or browser automation.
- Documented test, typecheck, lint, and build commands pass.
- A facilitator can demonstrate the application and open a student Issue without explaining hidden behavior.

## Definition of done

The repository contains a working local application, focused automated tests, concise setup and usage documentation, and repository instructions that support small Copilot-driven contributions. The facilitator has verified the core workflow, actual validation output, source-policy assumptions, and recovery behavior. No requirement depends on exhaustive company discovery or an authenticated service.

## Related workshop assets

- [Student contribution checklist](student-contribution-checklist.md)
- [Copilot prompt guide](copilot-prompt-guide.md)
