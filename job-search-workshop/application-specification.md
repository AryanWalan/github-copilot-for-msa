# Local job search application specification

This document defines the product contract for the alternative Microsoft Student Accelerator live-coding workshop. It defines required outcomes and boundaries, not a fixed project structure.

## Purpose

Build a local application that helps people find software-development roles advertised by companies in New Zealand. The application collects permitted public job listings, stores them locally, and presents them through a small web interface.

The application is also a teaching vehicle. Learners use GitHub Copilot to clarify requirements, plan changes, implement features, test behavior, review output, and collaborate through GitHub Issues and pull requests.

## Target users

- A job seeker who wants one local view of relevant New Zealand roles.
- A workshop learner who wants to improve a working application through a small, reviewable change.
- A facilitator who needs predictable application behavior that demonstrates reliability and agentic development practices while using live source data.

## Goals

- Provide a useful local MVP with a small set of configured job sources.
- Collect software-development roles from permitted, publicly accessible structured endpoints.
- Preserve useful data when an individual source fails.
- Make source, freshness, and collection errors visible to the user.
- Provide a codebase that supports independent student contributions.

## Non-goals

- Exhaustively discovering every software company or job in New Zealand.
- Scraping authenticated pages, bypassing CAPTCHAs, evading anti-bot controls, or modifying browser profiles.
- Automatically applying for jobs or collecting unnecessary personal information.
- Running a production-scale crawler or deploying to the cloud.
- Depending on a paid search API, authenticated API, or HTML scraping for the initial demonstration.

## Assumptions and boundaries

- The initial source registry contains the following candidates: [SEEK](https://www.seek.co.nz/), [Microsoft Careers](https://jobs.careers.microsoft.com/global/en/search?lc=New%20Zealand), [Vista](https://careers.vista.co/), [Xero](https://careers.xero.com/jobs/), [Serko](https://www.serko.com/careers), [Pushpay](https://pushpay.com/about-us/careers/new-zealand/), [Datacom](https://careers.datacom.com/), and [Trade Me Jobs](https://www.trademe.co.nz/a/jobs).
- A candidate remains disabled until a facilitator verifies that it provides a stable, public JSON API or another machine-readable structured feed that does not require credentials, and that its terms and robots policy permit collection.
- Career-page availability alone does not qualify a source. The MVP must enable at least two verified candidates; sources that require authentication, browser automation, or HTML parsing remain disabled.
- The application runs on the user's machine, binds to localhost by default, and stores data locally.
- A search-provider adapter may be added later to discover candidate companies. It is optional and must not be required for the live MVP.
- The collector uses live sources for application collection runs. Local structured-response fixtures are used only by automated tests and development tooling, not as an application data source.
- The source adapter must tolerate a source failure without deleting previously collected listings from other sources.

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

- Store a stable identifier, company name, careers URL, structured endpoint URL, source type, enabled state, and policy-review evidence for each source.
- Record the facilitator reviewer, review date, terms URL, robots URL, decision, and notes for every policy review.
- Allow a source to be enabled or disabled without deleting its historical listings.
- Keep source-specific response mapping behind an adapter boundary so one schema change does not affect every source.

### Collection

- Start a background run manually from the local UI or an equivalent local API operation. Return immediately and expose progress and final status through the API and UI.
- Fetch only enabled, valid HTTPS URLs.
- Apply a descriptive user agent, per-host rate limits, bounded concurrency, timeouts, response-size limits, and limited retries with backoff for transient failures.
- Read software-development roles from each supported structured source and normalize them to the common listing model.
- Include a role when the source classifies it as software engineering or development, or when its normalized title matches a configurable allowlist containing `software engineer`, `software developer`, `web developer`, `frontend`, `backend`, `full stack`, `mobile developer`, `DevOps engineer`, `site reliability engineer`, `platform engineer`, `QA automation`, or `engineering manager`.
- Exclude support, sales, recruitment, hardware, civil engineering, data-entry, and generic IT-administration roles unless a source-specific rule explicitly includes them.
- Include onsite, hybrid, remote, and multi-location roles only when the source explicitly indicates that candidates located in New Zealand are eligible.
- Record a result for every source: success, skipped, partial, or failed, with a safe diagnostic and timestamp.
- Preserve existing listings when a source fails. Do not interpret a temporary empty response as permission to delete all prior data.
- Deduplicate listings using a stable source identifier where available, otherwise a documented canonical key based on source, title, company, location, and URL.
- Mark a listing as stale when it has not been confirmed by its source for 14 days. A failed or skipped collection must not mark it unavailable. After a successful collection, mark a previously known listing unavailable when the source confirms that it is no longer returned.

### Local data and presentation

- Store companies, sources, listings, and collection runs in a local SQLite database that persists across application restarts.
- Store mutable application data in the operating system's standard per-user application-data directory: `%APPDATA%\job-finder` on Windows, `~/Library/Application Support/job-finder` on macOS, and `${XDG_DATA_HOME:-~/.local/share}/job-finder` on Linux. Resolve these paths through an operating-system-aware library.
- Display a list of listings with title, company, location, posted date when available, collection time, freshness, and source status.
- Support search and filters for title, company, location, and source.
- Display a detail view with the normalized summary, original URL, source, dates, and any parsing caveats.
- Link to the original careers page rather than copying an application workflow.
- Show an empty state, loading state, source-level errors, and a clear indication when data may be stale.

## Recommended implementation approach

Use the following stack for a predictable live build, but treat the contracts in this specification as more important than the exact libraries:

- Node.js 22 or later with strict TypeScript.
- npm workspaces for package and script management.
- React with Vite for the local web UI, tested with React Testing Library.
- A small Node HTTP API for collection and query operations.
- SQLite for local durable storage.
- Standards-based `fetch` for permitted JSON APIs and structured feeds.
- ESLint and Prettier for static analysis and formatting, Vitest for unit and integration tests, and Playwright for local end-to-end tests.

The repository must provide `npm run dev`, `npm run test`, `npm run typecheck`, `npm run lint`, and `npm run build`. Collection remains credential-free and does not use browser automation or parse HTML. A learner may choose an equivalent library within this stack when it provides the same behavior, tests, local operation, and safeguards.

## Workshop delivery decisions and accepted risks

This application is built during a time-limited live demonstration. The workshop intentionally favors building the end-to-end workflow over completing a separate production-readiness phase. Automated tests remain deterministic, but live collection and the demonstration itself depend on external source availability and data.

The following senior-engineering recommendations are documented but explicitly deferred. They do not block the workshop build or its definition of done:

- **Source-feasibility spike:** Do not require a separate discovery spike before implementation. Verify candidate endpoints, schemas, pagination, policy permission, and representative responses while building the first two adapters. The workshop accepts the risk that a candidate might be unsuitable and need to be replaced during the demonstration.
- **Offline demonstration mode:** Do not add a fixture replay or offline fallback to the application. The demonstration uses permitted live sources and accepts the risk of source unavailability, schema changes, or no matching New Zealand roles. Fixtures remain limited to deterministic automated tests.
- **Fixed operational limits:** Do not require specification-level numeric values for concurrency, per-host delay, timeouts, response size, retry count, backoff, or stored-text limits. The implementation must choose conservative values, centralize them in configuration, and test the selected behavior. Production tuning is deferred.
- **Stricter listing lifecycle:** For the workshop, a successful authoritative source response may mark a missing listing unavailable as already specified. Requiring two consecutive complete runs, stronger pagination-completeness proof, or a configurable removal policy is deferred.
- **Expanded background-run lifecycle:** Implement the simplest background-run behavior that satisfies the UI and API requirements. Formal rules for overlapping runs, cancellation, restart recovery, durable queues, and detailed progress calculation are deferred.
- **Terminology cleanup:** References to parsing mean parsing or mapping structured responses, never parsing source HTML. A comprehensive rename from parser terminology to adapter-mapping terminology is optional and does not block the workshop.

For a production release, revisit every deferred recommendation and resolve it through explicit requirements, implementation, and validation evidence.

## Component boundaries

- **Source registry:** owns configured companies, URLs, enablement, and policy notes.
- **Collector:** schedules requests, applies limits, handles retries, and records outcomes.
- **Source adapter:** maps one structured source schema into a common listing shape.
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
- `endpointUrl`: validated public HTTPS URL for a structured, machine-readable source.
- `sourceType`: adapter identifier.
- `enabled`: Boolean.
- `policyReview`: facilitator name, review date, terms URL, robots URL, decision, and notes.

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
- `status`: active when confirmed within 14 days, stale when not confirmed for 14 days, or unavailable when absent from a successful authoritative source response.

### Collection run

- `id`: stable run identifier.
- `startedAt` and `completedAt`.
- `status`: completed, partial, or failed.
- `sourceCount`, `successCount`, `skippedCount`, and `failureCount`.
- Per-source result, duration, item count, and safe error classification.

## Reliability and security requirements

- Require a facilitator to check source terms and robots policy before enabling a source, and retain the required policy-review evidence.
- Use a descriptive user agent and respect per-host rate limits.
- Bound concurrency, request duration, response size, retries, and stored text length.
- Validate URLs and reject non-HTTPS or unexpected destinations.
- Escape or safely render all source-controlled text in the UI.
- Do not fetch or parse source HTML or execute fetched scripts. Treat structured source content as untrusted data.
- Keep diagnostics structured and free of credentials, tokens, and full response bodies.
- Bind to localhost by default and do not expose an unauthenticated network service by default.
- Never bypass authentication, CAPTCHAs, robots directives, rate limits, or access controls.
- Mark stale data rather than presenting it as current.
- Use deterministic fixtures for parsers and avoid tests that depend on live websites.

## Test strategy

Cover the following with focused automated tests:

- Source configuration and URL validation.
- Structured-response fixtures for each supported source adapter, including missing optional fields and changed or empty schemas.
- Normalization, canonical URLs, stable identifiers, and duplicate listings within and across runs.
- Request limits, timeouts, retry behavior, response limits, and safe error classification.
- Repository persistence, preservation of prior data, stale status, and partial collection failures.
- API validation, error responses, and collection status.
- UI loading, empty, error, stale, search, filter, detail, and original-link workflows.

Use a small local structured-response fixture set for deterministic automated tests. The application demonstration uses permitted live sources, while the passing test suite must not require network access or credentials.

## Milestones

1. Define the source registry, data model, local commands, and sample fixtures.
2. Implement storage and deterministic structured-response mapping for one source.
3. Add collection limits, retries, diagnostics, and partial-failure behavior.
4. Add the API and a usable listing, search, filter, and detail UI.
5. Add a second source adapter and verify that the boundary remains isolated.
6. Run the documented tests, typecheck, lint, build, and local end-to-end demonstration.

## Acceptance criteria

The MVP is acceptable when:

- A learner can start it locally using documented commands.
- It collects roles from at least two enabled, facilitator-approved live structured sources without credentials or HTML parsing.
- A failed source does not remove successful results or prior data.
- Search, filtering, details, freshness, source links, and collection outcomes are visible in the UI.
- Duplicate listings remain a single listing with updated collection metadata.
- Tests cover parsing, validation, deduplication, persistence, partial failure, API behavior, and core UI states.
- The application respects source policies and does not require credentials, browser automation, or HTML parsing.
- Documented test, typecheck, lint, and build commands pass.
- A facilitator can demonstrate the application and open a student Issue without explaining hidden behavior.

## Definition of done

The repository contains a working local application, focused automated tests, concise setup and usage documentation, and repository instructions that support small Copilot-driven contributions. The facilitator has verified the core workflow, actual validation output, source-policy assumptions, and recovery behavior. No requirement depends on exhaustive company discovery or an authenticated service.

## Related workshop assets

- [Student contribution checklist](student-contribution-checklist.md)
- [Copilot prompt guide](copilot-prompt-guide.md)
