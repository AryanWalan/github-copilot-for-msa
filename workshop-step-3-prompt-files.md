# Workshop Step 3: Ground, clarify, and review a plan

**Time:** 15 minutes

Continue the read-only conversation from Step 2. Reveal the product contract, add current documentation sources, create a scoped instruction, resolve uncertainty, and approve a reviewable plan. Do not create the target project yet.

## Read the contract

The required behavior and security boundaries are in [spec/spec-developer-workbench-mcp.md](spec/spec-developer-workbench-mcp.md). Allow Copilot to read it. Microsoft Learn is authoritative for Microsoft product guidance. Context7 is useful for current package and SDK APIs; assess its suggestions against primary sources.

## Add grounding sources

### VS Code Insiders

1. Open the Command Palette and run `MCP: Add Server`.
2. Choose **HTTP**, enter `https://learn.microsoft.com/api/mcp`, name it `microsoft.docs.mcp`, and choose **Workspace** scope.
3. Repeat with `https://mcp.context7.com/mcp` named `context7`.
4. Approve each server and confirm both appear in the Chat tools list.

### Copilot CLI

1. Open [.github/mcp.json](.github/mcp.json) and add `microsoft.docs.mcp` and `context7` under `mcpServers`, using type `http` and the URLs above.
2. Restart the CLI session if prompted.
3. Enter `/mcp show` and confirm both project servers appear.

## Create a scoped instruction

An instruction tells Copilot how to work with matching files. Ask it to create `.github/instructions/mcp-typescript.instructions.md` with an `applyTo` pattern for `samples/developer-workbench-mcp/**/*.ts`. Review and approve the write only when the rules require strict TypeScript, stdio diagnostics on stderr, fixed output boundaries, focused validation, and asking rather than inventing requirements.

```text
Read spec/spec-developer-workbench-mcp.md. Propose a concise path-specific instruction for TypeScript files under samples/developer-workbench-mcp. It must enforce strict TypeScript, MCP stdio discipline, the fixed bookmark-output boundary, focused validation, and asking about missing requirements. Do not write the instruction until I approve the proposed content.
```

After approval, ask Copilot to confirm that the new instruction applies to future project files.

## Clarify and challenge

Paste this prompt:

```text
I want you to create the application defined in spec/spec-developer-workbench-mcp.md. Use Microsoft Learn for Microsoft product guidance and Context7 for current package and SDK APIs.

Read the specification, then ask exactly five questions to make sure you understand the outcome and are not making assumptions. After I answer, ask one senior-engineer question that challenges a consequential solution assumption. Do not create or edit project files or run commands yet.
```

Use these facilitator-approved answers when the questions cover them: generate a Netscape bookmark HTML file rather than changing a browser profile; keep the output path fixed; accept only bounded HTTPS links; escape user-controlled HTML; preserve categories and links while rejecting canonical URL duplicates; write atomically; and show proposed links before a write tool runs.

## Request and review the plan

```text
Based on the specification and our agreed decisions, return a no-edit plan for the complete Developer Workbench MCP project. Include project files, dependencies, MCP tool schemas, security boundaries, failure modes, focused tests, selected-client configuration, and exact validation commands. Do not create or edit files or run commands.
```

Run the built-in `/rubber-duck` command with the plan. Revise valid findings, then explicitly approve creation only when the plan names the files and validation commands.

## Checkpoint

- [ ] Microsoft Learn and Context7 are connected in my primary client.
- [ ] I created and verified a scoped TypeScript instruction.
- [ ] I recorded five answers and one challenged assumption.
- [ ] I reviewed a plan with tests, security boundaries, and validation commands.
- [ ] I have not approved target-project creation yet.

## Recovery

If a documentation server is unavailable, state its intended role and continue with the specification. Do not invent sources. If the session is lost, start a new Plan conversation, attach the specification, and paste the clarification answers and reviewed plan.

Next: [create the MCP server incrementally](workshop-step-4-build-your-application.md).