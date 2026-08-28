# Workshop Step 5: Use and review the created server

**Time:** 15 minutes

Use the MCP server that Copilot created as a real capability with clear approval boundaries. Then review the result as code you would maintain, not as a one-time generated artifact.

## Curate before writing

After the local server is running and its tools are visible, select the `learning-curator` custom agent:

- **VS Code Insiders:** select `learning-curator` from the agent picker.
- **Copilot CLI:** enter `/agent`, then select `learning-curator`.

The workshop already provides this agent in `.github/agents`. You switch to it because its tools and instructions are intentionally limited to finding, inspecting, and proposing learning links. It doesn't create or repair application code.

Paste:

```text
Find up to three current learning links for building TypeScript MCP servers.
Use Microsoft Learn for Microsoft concepts and Context7 only for current package
or SDK API details. Inspect existing bookmarks, explain why each link is useful,
and show the proposed additions. Do not save anything until I explicitly approve.
```

- [ ] Inspect the proposed URLs, categories, titles, and descriptions.
- [ ] Approve the `add_learning_links` tool call only after confirming the result belongs in your bookmark collection.
- [ ] Open `samples/developer-workbench-mcp/output/developer-learning-bookmarks.html` and import it manually through Chrome or Edge's bookmark manager.

## Ask Copilot to verify the created application

Switch from the restricted curator to a general-purpose coding agent:

- **VS Code Insiders:** open a new agent session in the Chat view or Agents window and select the built-in coding agent you used in Step 4.
- **Copilot CLI:** enter `/agent`, then select the built-in agent you used in Step 4.

The new session doesn't need the curator conversation. It reads the created project and specification directly. Paste:

```text
Review the Developer Workbench MCP project you created against
spec/spec-developer-workbench-mcp.md. Inspect the implementation and tests, then
run npm test, npm run typecheck, and npm run lint from the project directory.

Do not edit files yet. Report findings first, ordered by severity, and include any
acceptance criterion that is missing or not adequately tested. Report the actual
command output and distinguish implementation defects from test gaps.
```

## Perform a code-quality review

The `code-quality-review` Skill applies a reusable read-only review procedure. This separation prevents the reviewer from silently fixing the code it is assessing.

Copilot Student and paid plans:

- **VS Code Insiders:** enter `/code-quality-review`.
- **Copilot CLI:** ask Copilot to use the repository's `code-quality-review` Skill.

Copilot Free fallback: if the Skill isn't available, invoke `/code-quality-review-fallback` where supported or paste the contents of [.github/prompts/code-quality-review-fallback.prompt.md](.github/prompts/code-quality-review-fallback.prompt.md). The fallback applies the same read-only review criteria.

- [ ] Choose one valid finding from the reviews.
- [ ] Return to a general-purpose coding agent and ask it to make the smallest focused repair and rerun the affected check.
- [ ] Ask Copilot to rerun all three validation commands after the focused check passes, and inspect the actual output.

## Checkpoint

- [ ] I reviewed sources and approved a bookmark write intentionally.
- [ ] I imported the generated HTML manually instead of modifying a browser profile.
- [ ] I can explain why the write tool required an explicit approval boundary.
- [ ] The server created by Copilot satisfies the specification, including data preservation, duplicate rejection, and atomic writes.
- [ ] I performed a read-only code review and addressed a valid finding.
- [ ] I verified the final validation results from actual command output.

## Recovery

If an MCP server is unavailable, use the exact prompt in a normal Copilot chat and do not invent source results. If bookmark import fails, inspect the generated HTML first; browser import behavior is separate from the MCP server process.

Next: [continue the practice](workshop-step-6-next-steps.md).
