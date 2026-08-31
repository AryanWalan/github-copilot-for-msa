# Job Finder

Local application for collecting and reviewing software-development roles available to candidates in New Zealand.

## Requirements

- Node.js 22 or later
- npm 10 or later

## Run locally

```powershell
npm install
npm run dev
```

Open `http://127.0.0.1:5173`. The web application proxies `/api` requests to the API at `http://127.0.0.1:3001`.

Mutable data is stored in the operating system's per-user application-data directory. Set `JOB_FINDER_DATA_DIR` to use a different directory during local development.

## Validate

```powershell
npm run test
npm run typecheck
npm run lint
npm run build
npm run format:check
```

## Structure

- `apps/api`: localhost-only Express API, SQLite repository, source registry, and collection-run orchestration.
- `apps/web`: React and Vite user interface for source status, collection status, listing search, and source links.

## Current state

The initial vertical slice seeds all eight candidate sources as disabled and pending policy review. A collection run records a safe skipped result for each candidate. No live source is contacted until its structured endpoint and collection policy have been verified and an adapter has been implemented.

See [application-specification.md](application-specification.md) for the product contract and accepted workshop risks.