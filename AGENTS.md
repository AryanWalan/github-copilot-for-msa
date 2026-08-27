# Agent Guidance

## Scope

This is a learning workshop. Preserve the progression from context and clarification to planning, implementation, review, and validation. Keep the guided client tracks limited to VS Code Insiders and Copilot CLI. GitHub Copilot App is optional self-directed exploration for students already confident with both core tracks; do not add Copilot App instructions to the core workshop.

## Implementation

- Prefer the nearest applicable repository guidance and existing local patterns.
- Ask rather than invent missing requirements.
- Keep the bookmark MCP server local, deterministic, secret-free, and limited to its fixed output boundary.
- Treat all link metadata as untrusted input: validate HTTPS URLs, enforce size limits, escape HTML, and prevent duplicates.
- Never write non-protocol output to an MCP server's stdout.
- Do not modify browser profiles or add browser extensions to the core lab.

## Validation

Run the focused checks from `samples/developer-workbench-mcp` after MCP changes:

```text
npm test
npm run typecheck
npm run lint
```

Report the actual results and keep unrelated worktree changes intact.