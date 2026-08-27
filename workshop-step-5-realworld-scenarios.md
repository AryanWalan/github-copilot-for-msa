# Workshop Step 5: Curate Links, Approve Writes, and Review Quality

**Time:** 15 minutes

Use the MCP server as a capability with clear approval boundaries. Then review the implementation as code you will maintain, not as a one-time generated artifact.

## Curate before writing

Select the `learning-curator` custom agent. Ask a narrow development question, for example:

```text
Find up to three current learning links for building TypeScript MCP servers.
Use Microsoft Learn for Microsoft concepts and Context7 only for current package
or SDK API details. Inspect existing bookmarks, explain why each link is useful,
and show the proposed additions. Do not save anything until I explicitly approve.
```

- [ ] Inspect the proposed URLs, categories, titles, and descriptions.
- [ ] Approve the `add_learning_links` tool call only after confirming the result belongs in your bookmark collection.
- [ ] Open `samples/developer-workbench-mcp/output/developer-learning-bookmarks.html` and import it manually through Chrome or Edge's bookmark manager.

## Improve the implementation

Ask Copilot to extend the first cut:

```text
Improve the MCP server without expanding its output boundary. Preserve existing
categories and links, prevent canonical URL duplicates, write through a temporary
file followed by rename, and add list_learning_links. Add focused tests for
malformed URLs, escaping, duplicates, multiple categories, existing files, and
failed writes. Run the test, typecheck, and lint commands and report actual output.
```

## Perform a code-quality review

Copilot Student and paid plans: invoke `/code-quality-review`.

Copilot Free fallback: invoke `/code-quality-review-fallback` or paste the contents of [.github/prompts/code-quality-review-fallback.prompt.md](.github/prompts/code-quality-review-fallback.prompt.md).

- [ ] Address one valid finding.
- [ ] Rerun the same focused validation commands.

## Checkpoint

- [ ] I reviewed sources and approved a bookmark write intentionally.
- [ ] I imported the generated HTML manually instead of modifying a browser profile.
- [ ] The server preserves data, rejects duplicates, and writes atomically.
- [ ] I performed a read-only code review and addressed a valid finding.
- [ ] All focused validation commands pass.

## Recovery

If an MCP server is unavailable, use the exact prompt in a normal Copilot chat and do not invent source results. If bookmark import fails, inspect the generated HTML first; browser import behavior is separate from the MCP server process.

Next: [continue the practice](workshop-step-6-next-steps.md).
