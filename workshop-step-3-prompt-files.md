# Workshop Step 3: Ground, clarify, and review a plan

**Time:** 15 minutes

Continue the read-only conversation from Step 2. You will reveal the product contract, add current documentation sources, create a scoped instruction, resolve uncertainty, and approve a reviewable plan. Do not create the target project yet.

- [ ] **1. Let Copilot read the product contract**

## 1. Let Copilot read the product contract

1. Open [spec/spec-developer-workbench-mcp.md](spec/spec-developer-workbench-mcp.md) from the repository root.
2. In the Step 2 conversation, allow Copilot to read this specification when it asks for approval.
3. Do not approve project-file creation, edits, or shell commands at this stage.

Microsoft Learn is authoritative for Microsoft product guidance. Context7 is useful for current package and SDK APIs; evaluate its suggestions against primary documentation.

**Success signal:** Copilot can summarize the required behavior and security boundaries from the specification, but the `samples/developer-workbench-mcp` project does not exist yet.

- [ ] **2. Add documentation sources**

## 2. Add documentation sources

Choose only the instructions for your primary client.

### VS Code Insiders

1. Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> to open the Command Palette.
2. Type `MCP: Add Server`, select the command, and choose **HTTP** when asked for the server type.
3. Enter `https://learn.microsoft.com/api/mcp` as the URL, enter `microsoft.docs.mcp` as the name, and choose **Workspace** scope.
4. Repeat the command and enter `https://mcp.context7.com/mcp` as the URL and `context7` as the name. Choose **Workspace** scope.
5. Approve each server configuration when requested.
6. Open the Chat tools list and confirm that both `microsoft.docs.mcp` and `context7` are listed.

**Success signal:** Both documentation servers appear in the Chat tools list for this workspace.

### Copilot CLI

1. Open the repository-root configuration file, [.github/mcp.json](.github/mcp.json).
2. Replace its empty `mcpServers` object with the following configuration and save the file:

```json
{
	"mcpServers": {
		"microsoft.docs.mcp": {
			"type": "http",
			"url": "https://learn.microsoft.com/api/mcp"
		},
		"context7": {
			"type": "http",
			"url": "https://mcp.context7.com/mcp"
		}
	}
}
```

3. Restart the CLI session if it asks you to reload the configuration.
4. Enter `/mcp show` in Copilot CLI.
5. Confirm that both project servers appear in the result.

**Success signal:** `/mcp show` lists `microsoft.docs.mcp` and `context7`.

- [ ] **3. Create a scoped TypeScript instruction**

## 3. Create a scoped TypeScript instruction

The instruction file belongs at `.github/instructions/mcp-typescript.instructions.md`. Its `applyTo` pattern must limit it to `samples/developer-workbench-mcp/**/*.ts`, so it applies to future project TypeScript files and not unrelated repository files.

1. Paste this request into the same conversation:

```text
Read spec/spec-developer-workbench-mcp.md. Propose a concise path-specific instruction for TypeScript files under samples/developer-workbench-mcp. It must enforce strict TypeScript, MCP stdio discipline, the fixed bookmark-output boundary, focused validation, and asking about missing requirements. Do not write the instruction until I approve the proposed content.
```

2. Review the proposed content. Approve the file write only when it includes all of the following:

	- [ ] An `applyTo` pattern for `samples/developer-workbench-mcp/**/*.ts`.
	- [ ] Strict TypeScript requirements.
	- [ ] MCP stdio discipline: protocol output on stdout and diagnostics on stderr.
	- [ ] The fixed bookmark-output boundary.
	- [ ] Focused validation before broader checks.
	- [ ] A requirement to ask about missing requirements rather than inventing them.

3. After the write is approved, ask Copilot to confirm that the instruction will apply to future matching project files.

**Success signal:** The instruction exists at `.github/instructions/mcp-typescript.instructions.md` and its scope is limited to the planned project TypeScript files.

- [ ] **4. Clarify and challenge the design**

## 4. Clarify and challenge the design

1. Paste this prompt:

```text
I want you to create the application defined in spec/spec-developer-workbench-mcp.md. Use Microsoft Learn for Microsoft product guidance and Context7 for current package and SDK APIs.

Read the specification, then ask exactly five questions to make sure you understand the outcome and are not making assumptions. After I answer, ask one senior-engineer question that challenges a consequential solution assumption. Do not create or edit project files or run commands yet.
```

2. Answer the five questions using the following agreed decisions when relevant:

	- Generate a Netscape bookmark HTML file instead of changing a browser profile.
	- Keep the output path fixed.
	- Accept only bounded HTTPS links.
	- Escape user-controlled HTML.
	- Preserve categories and links while rejecting canonical URL duplicates.
	- Write the output atomically.
	- Show proposed links before the `add_learning_links` write tool runs.

3. Record the consequential assumption raised by the senior-engineer question and your answer.

**Success signal:** Copilot has exactly five answered clarification questions and one explicit challenge-and-response, with no project creation or commands approved.

- [ ] **5. Request and approve a no-edit plan**

## 5. Request and approve a no-edit plan

1. Paste this request:

```text
Based on the specification and our agreed decisions, return a no-edit plan for the complete Developer Workbench MCP project. Include project files, dependencies, MCP tool schemas, security boundaries, failure modes, focused tests, selected-client configuration, and exact validation commands. Do not create or edit files or run commands.
```

2. Run the built-in `/rubber-duck` command with the proposed plan.
3. Ask Copilot to revise any valid findings from that review.
4. Approve creation only when the final plan names the project files and exact validation commands.

**Success signal:** You have an approved no-edit plan that describes the implementation and checks, but have not yet approved target-project creation.

## Checkpoint

- [ ] Microsoft Learn and Context7 are connected in my primary client.
- [ ] I created and verified a scoped TypeScript instruction.
- [ ] I recorded five answers and one challenged assumption.
- [ ] I reviewed a plan with tests, security boundaries, and validation commands.
- [ ] I have not approved target-project creation yet.

## Recovery

### A documentation server is unavailable

1. State that the unavailable server cannot provide grounding for this session.
2. Continue from the specification and the available source without inventing source-derived information.
3. Verify any source-derived links after the server is available again.

### The conversation is lost

1. Start a new Plan or read-only conversation in your primary client.
2. Allow Copilot to read [spec/spec-developer-workbench-mcp.md](spec/spec-developer-workbench-mcp.md).
3. Paste your five clarification answers, challenged assumption, and reviewed plan into the new conversation.
4. Reconfirm that no project creation, file writes, or shell commands are approved until Step 4.

---

**Next:** [Step 4: Create the MCP server incrementally](workshop-step-4-build-your-application.md)