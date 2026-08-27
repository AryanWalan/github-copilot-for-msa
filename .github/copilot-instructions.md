# Developer Workbench MCP

This repository is a workshop for building a local TypeScript MCP server that collects approved developer-learning links into a browser-importable HTML file.

## Project rules

- Use Node.js 22 or later, strict TypeScript, Zod validation, and the official MCP TypeScript SDK.
- Keep the MCP server deterministic, local, secret-free, and narrowly scoped.
- Never write diagnostics or logs to stdout. Stdio stdout is reserved for MCP protocol messages; use stderr for diagnostics.
- Accept only HTTPS URLs and reject malformed, oversized, or ambiguous input.
- Always escape user-controlled values before writing HTML.
- Write only to `samples/developer-workbench-mcp/output/developer-learning-bookmarks.html`; never accept an arbitrary output path.
- Preserve existing categories and links, prevent canonical URL duplicates, and write through a temporary file followed by rename.
- Never modify Chrome or Edge profiles, use browser automation, or store credentials.

## Workflow

1. Ask clarifying questions before implementation when requirements are incomplete.
2. Produce and review a plan covering schemas, security boundaries, failure modes, tests, and validation.
3. Make the smallest focused change.
4. Run `npm test`, `npm run typecheck`, and `npm run lint` from `samples/developer-workbench-mcp`.
5. Report actual command output; do not claim validation that was not run.

The generated HTML is an export artifact for manual import into Chrome or Edge. It is not a live browser integration.
