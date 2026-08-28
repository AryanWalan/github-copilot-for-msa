# Developer Workbench MCP product specification

## Purpose

Create a local Model Context Protocol (MCP) server that collects approved developer-learning links in a browser-importable bookmark file. This document defines required behavior and boundaries, not a project structure or implementation recipe.

## User outcome

A developer can inspect the links already saved, review newly proposed learning resources, explicitly approve additions, and manually import the generated HTML file into Chrome or Edge.

## Technical constraints

- Use Node.js 22 or later and strict TypeScript.
- Use the official MCP TypeScript SDK and Zod validation.
- Communicate through the MCP stdio transport.
- Keep the server local, deterministic, and secret-free.

Within these constraints, choose and justify the project structure, scripts, internal design, and testing approach in the implementation plan.

## MCP tools

### `add_learning_links`

Accept between one and five links. Each link contains:

- `title`: required, 1 to 200 characters.
- `url`: required, valid HTTPS URL.
- `description`: optional, no more than 500 characters.
- `category`: required, 1 to 100 characters and must not contain `>`.

Return the fixed output path, links added, and duplicates skipped.

### `list_learning_links`

Accept no input. Return the number of links and the links currently stored in the export.

## Output contract

- Write only to `samples/developer-workbench-mcp/output/developer-learning-bookmarks.html`.
- Produce Netscape bookmark HTML suitable for manual Chrome or Edge import.
- Organize links below `Microsoft Student Accelerator > Developer Learning > <category>`.
- Preserve existing categories and links when adding new links.
- Prevent duplicates by canonical URL, including duplicates submitted in the same request.
- Escape all user-controlled values before writing HTML.
- Make updates atomic so an interrupted or failed write doesn't leave a partial or corrupt export.

## Security boundaries

- Never accept an output path from a caller.
- Reject malformed, non-HTTPS, oversized, or ambiguous input.
- Never modify browser profiles or use browser automation.
- Never store credentials or secrets.
- Reserve stdout for MCP protocol messages. Send diagnostics only to stderr.
- Require the user to review proposed links and explicitly approve the write tool call.

## Acceptance criteria

The created project must:

- Include focused automated tests for validation, HTML escaping, duplicate handling, category preservation, existing files, and failed writes.
- Pass `npm test`, `npm run typecheck`, and `npm run lint` from `samples/developer-workbench-mcp`.
- Define repository-level local server configuration for VS Code in `.vscode/mcp.json` and Copilot CLI in `.github/mcp.json` only after the implementation passes validation.
- Expose `add_learning_links` and `list_learning_links` in the selected Copilot client.
