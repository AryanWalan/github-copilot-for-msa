import { join } from "node:path";

import envPaths from "env-paths";

import { createApp } from "./app.js";
import { JobFinderRepository } from "./database.js";

const port = Number(process.env.PORT ?? 3001);
const dataDirectory =
  process.env.JOB_FINDER_DATA_DIR ?? envPaths("job-finder").data;
const repository = new JobFinderRepository(
  join(dataDirectory, "job-finder.sqlite"),
);
const app = createApp(repository);

const server = app.listen(port, "127.0.0.1", () => {
  console.log(`Job Finder API listening on http://127.0.0.1:${port}`);
});

function shutdown(): void {
  server.close(() => {
    repository.close();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
