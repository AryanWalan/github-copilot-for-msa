# MCP Server Creation and Recovery

## Project creation did not complete

The workshop asks Copilot to create the Developer Workbench project during Step 4. If creation does not complete:

1. Confirm that the Step 3 plan was reviewed and approved.
2. Return to Step 4 in the same Copilot conversation.
3. Paste the creation request exactly as shown.
4. Review Copilot's proposed file changes and commands before approving them.

Don't copy a completed implementation from another branch or repository. Recover the learning flow by having your Copilot agent create it from the specification.

## Project creation or package installation fails

1. Preserve the exact command and error output.
2. Paste it into the same Copilot conversation.
3. Ask Copilot to diagnose the root cause and make the smallest focused repair.
4. Rerun the same command before allowing any broader change.

## The created server is not visible

1. Confirm Step 4 is complete and all validation commands pass.
2. Verify that Copilot added `developer-workbench` using the created project's actual start command:
   - VS Code Insiders reads `.vscode/mcp.json`.
   - Copilot CLI reads `.github/mcp.json` and doesn't read `.vscode/mcp.json`.
3. Confirm the workspace is trusted and restart or reload the local MCP server in your primary client.
4. Inspect server diagnostics. Stdio protocol messages belong on stdout; diagnostics belong on stderr.

## A remote source is unavailable

Microsoft Learn and Context7 are grounding sources, not a reason to fabricate information. State the source is unavailable, continue with repository context, and verify source-derived links later.

## A write was not approved

Do not call `add_learning_links`. The learning curator must show proposed titles, URLs, descriptions, and categories, then ask for explicit approval.

## Bookmark import fails

Open the generated `samples/developer-workbench-mcp/output/developer-learning-bookmarks.html` first. Confirm that the expected category hierarchy and links are present. Browser import behavior is separate from the local MCP server; it must not trigger profile writes or browser automation.

## A validation command fails

Ask Copilot to rerun the failing command in `samples/developer-workbench-mcp`, preserve its output, and diagnose the exact failure. Ask for the smallest repair and require the same command to pass before changing scope. Don't remove or skip a failing test.
