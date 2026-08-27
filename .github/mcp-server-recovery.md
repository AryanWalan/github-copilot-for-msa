# MCP Server Recovery

## The server is not visible

1. Confirm the workspace is trusted.
2. Verify that `.vscode/mcp.json` includes `developer-workbench`.
3. Run `npm ci` from `samples/developer-workbench-mcp`.
4. Restart the MCP server from VS Code and inspect its output. Stdio protocol output must remain on stdout; diagnostics belong on stderr.

## A remote source is unavailable

Microsoft Learn and Context7 are grounding sources, not a reason to fabricate information. State the source is unavailable, continue with repository context, and verify source-derived links later.

## A write was not approved

Do not call `add_learning_links`. The learning curator must show proposed titles, URLs, descriptions, and categories, then ask for explicit approval.

## Bookmark import fails

Open the generated `output/developer-learning-bookmarks.html` first. Confirm that the expected category hierarchy and links are present. Browser import behavior is separate from the local MCP server; it must not trigger profile writes or browser automation.

## A validation command fails

Run the failing command in `samples/developer-workbench-mcp`, preserve its output, and ask for the smallest repair. Rerun the same command before changing scope.
