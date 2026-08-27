# Workshop Step 3: Ground, Clarify, and Review the Plan

**Time:** 15 minutes

Replace an under-specified request with sources, boundaries, questions, and a reviewable plan. This is where agentic development becomes an engineering practice instead of a guessing game.

## Grounding sources

Use the trusted workspace MCP servers deliberately:

- **Microsoft Learn MCP:** authoritative Microsoft product documentation.
- **Context7:** current package and SDK API references. Verify recommendations against the primary source before saving a link.
- **Developer Workbench MCP:** local bookmark export only. It never edits browser profiles.

## Ask for clarification and challenge an assumption

Paste this prompt:

```text
We are building a local TypeScript MCP server in samples/developer-workbench-mcp.
It collects approved learning links into output/developer-learning-bookmarks.html,
a Netscape bookmark export for manual Chrome or Edge import. Use Microsoft Learn for
Microsoft topics and Context7 for current package or SDK APIs.

Ask me 5 questions to ensure your knowledge of the problem is complete and you are
not making assumptions. Then ask one question that challenges my central solution
assumption. Do not edit files.
```

Discuss the answers before continuing. The required decisions are:

1. The output path is fixed; the tool never accepts a path from the caller.
2. Links must use HTTPS and have bounded title, category, and description fields.
3. User-controlled values are HTML-escaped.
4. Existing links and categories are preserved; canonical URLs are not duplicated.
5. Writes use a temporary file followed by rename.
6. The agent must show candidate links and obtain approval before using a write tool.

## Request a plan

Paste this follow-up:

```text
Based on the agreed decisions, create a concise implementation plan before editing.
Include architecture, files to change, MCP tool schemas, security boundaries,
failure modes, focused tests, and the exact validation commands. Do not edit files.
```

## Review the plan

Copilot Student and paid plans: invoke `/rubber-duck` and provide the plan.

Copilot Free fallback: invoke `/rubber-duck-fallback` or paste the contents of [.github/prompts/rubber-duck-fallback.prompt.md](.github/prompts/rubber-duck-fallback.prompt.md) with the plan.

Revise the plan to address valid findings. Approve implementation only when it names the changed files and validation commands.

## Checkpoint

- [ ] I used grounding sources with distinct roles.
- [ ] I received five clarification questions and one challenged assumption.
- [ ] I reviewed a plan that includes security and test boundaries.
- [ ] I have not approved implementation until the plan is complete.

## Recovery

If a remote MCP server is unavailable, state the source role and continue using the project instructions. Do not fabricate a citation. If a Skill is unavailable, use its matching fallback prompt.

Next: [implement the first MCP server cut](workshop-step-4-build-your-application.md).
