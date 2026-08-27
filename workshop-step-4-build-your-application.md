# Workshop Step 4: Implement and Test the MCP Server

**Time:** 15 minutes

Implement only the reviewed plan. Keep the first cut focused, run tests immediately, then use the results to decide the next change.

## Implementation request

After approving the plan from Step 3, paste:

```text
Implement the approved first cut in samples/developer-workbench-mcp only.
Follow .github/copilot-instructions.md and AGENTS.md. Keep the server local,
deterministic, and secret-free. Do not modify browser profiles. After the first
substantive change, run the focused test command and report its actual output.
Stop if a requirement is unclear.
```

Review the proposed file changes before allowing them. The first cut must provide:

- An `add_learning_links` MCP tool for one to five links.
- HTTPS validation and bounded title, category, and description fields.
- A Netscape HTML export below `Microsoft Student Accelerator > Developer Learning > <category>`.
- Escaped user-controlled HTML.
- The fixed `output/developer-learning-bookmarks.html` location.
- No diagnostics on standard output.

## Run the validation loop

From `samples/developer-workbench-mcp`, run:

```text
npm test
npm run typecheck
npm run lint
```

When a command fails, give Copilot the exact output and ask for the smallest repair. Rerun the same check before changing scope.

## Checkpoint

- [ ] The MCP server has an `add_learning_links` tool.
- [ ] The output location is fixed and no browser profile is changed.
- [ ] `npm test`, `npm run typecheck`, and `npm run lint` pass.
- [ ] I inspected the actual command output.

## Recovery

Use the expected contract in [samples/developer-workbench-mcp/README.md](samples/developer-workbench-mcp/README.md) to compare the implementation and plan a narrow repair. Do not work around a failing test by removing it.

Next: [use MCP safely and review the result](workshop-step-5-realworld-scenarios.md).
