# Workshop Step 3: Ground, clarify, and review the plan

**Time:** 15 minutes

Replace the incomplete request with authoritative context, explicit boundaries, clarifying questions, and a reviewable plan. Continue in the same conversation so you can compare Copilot's grounded response with its initial assumptions.

## Grounding sources

Use the workshop contract and trusted workspace MCP servers deliberately:

- **Developer Workbench specification:** the required outcome and acceptance boundaries in [spec/spec-developer-workbench-mcp.md](spec/spec-developer-workbench-mcp.md).
- **Microsoft Learn MCP:** authoritative Microsoft product documentation.
- **Context7:** current package and SDK API references. Verify recommendations against the primary source before saving a link.

The Developer Workbench MCP server isn't a grounding source yet because you haven't created it.

## Prepare your primary client

- **VS Code Insiders:** continue in the agent session from Step 2. Allow read-only access to the specification and grounding tools, but don't approve edits or commands.
- **Copilot CLI:** remain in Plan mode. Approve read-only access to the specification and grounding tools, but don't approve changes.

## Ask for clarification and challenge an assumption

Paste this prompt:

```text
I want you to create the application defined in
spec/spec-developer-workbench-mcp.md. No source code or project scaffold exists yet.
Use Microsoft Learn for Microsoft product guidance and Context7 for current
package and SDK APIs.

Read the specification, then ask me five questions to make sure you understand the
desired outcome and aren't making assumptions. After those questions, identify and
challenge the central solution assumption in the specification. Don't create or
edit files or run commands yet.
```

Answer the questions and discuss the challenge before continuing. Confirm each required decision:

- [ ] Confirm the output path is fixed; the tool never accepts a path from the caller.
- [ ] Confirm links must use HTTPS and have bounded title, category, and description fields.
- [ ] Confirm user-controlled values are HTML-escaped.
- [ ] Confirm existing links and categories are preserved and canonical URLs are not duplicated.
- [ ] Confirm updates are atomic so a failed write can't leave a partial or corrupt export.
- [ ] Confirm the agent must show candidate links and obtain approval before using a write tool.

## Request a plan

Paste this follow-up:

```text
Based on the specification and our agreed decisions, plan how you will create the
complete Developer Workbench MCP project from nothing. Choose and justify the
project structure and implementation approach. Include dependencies, MCP tool
schemas, security boundaries, failure modes, focused tests, configuration for both
supported clients, and exact validation commands. Don't create or edit files or
run commands yet. Return a reviewable plan.
```

## Review the plan

The `rubber-duck` Skill is a reusable, read-only review workflow supplied by the workshop. Invocation differs by client:

Copilot Student and paid plans:

- **VS Code Insiders:** enter `/rubber-duck` and provide the plan.
- **Copilot CLI:** ask Copilot to use the repository's `rubber-duck` Skill to review the plan.

Copilot Free fallback: if the Skill isn't available, invoke `/rubber-duck-fallback` where supported or paste the contents of [.github/prompts/rubber-duck-fallback.prompt.md](.github/prompts/rubber-duck-fallback.prompt.md) with the plan. The fallback applies the same review criteria without interactive Skill invocation.

- [ ] Revise the plan to address valid findings.
- [ ] Approve creation only when the plan names the files and validation commands.

## Checkpoint

- [ ] I used grounding sources with distinct roles.
- [ ] I received five clarification questions and one challenged assumption.
- [ ] I compared the grounded decisions with Copilot's initial assumptions.
- [ ] I reviewed a plan that includes security and test boundaries.
- [ ] I have not approved creation until the plan is complete.

## Recovery

If a remote MCP server is unavailable, state the source role and continue using the project instructions. Do not fabricate a citation. If a Skill is unavailable, use its matching fallback prompt.

Next: [use your Copilot agent to create the MCP server](workshop-step-4-build-your-application.md).
