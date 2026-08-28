# Workshop Step 4: Create the MCP server incrementally

**Time:** 22 minutes

Now approve implementation. Copilot creates the complete project under `samples/developer-workbench-mcp/` from the reviewed plan and specification. You approve every file write and shell command, then inspect the evidence it returns.

- [ ] **1. Start implementation in your primary client**

## 1. Start implementation in your primary client

Choose only the instructions for your primary client.

### VS Code Insiders

1. Open the approved plan in the Chat view.
2. Select **Start Implementation** below the approved plan when it is available.
3. If that button is unavailable, use the mode picker above the message box to switch from **Plan** to an agent-capable mode, then continue the same conversation.

**Success signal:** The chat mode can propose file and command actions for your approval.

### Copilot CLI

1. Continue the Step 3 conversation in the terminal.
2. Press <kbd>Shift</kbd>+<kbd>Tab</kbd> to leave Plan mode and enter an implementation-capable mode.
3. Check the CLI mode indicator before continuing; it must no longer show Plan mode.

**Success signal:** The CLI can propose file and command actions for your approval.

- [ ] **2. Send the implementation request**

## 2. Send the implementation request

Paste this request into the implementation-capable conversation:

```text
Implement the approved plan for spec/spec-developer-workbench-mcp.md. Create files only under samples/developer-workbench-mcp and the selected-client MCP configuration required by the plan. Work incrementally.

After the first substantive file creation, run the cheapest focused check that could disprove the approach. Stop for my approval before every file write and shell command. Repair a focused failure and rerun the same check before expanding scope. At completion, run the project's documented test, typecheck, lint, and build commands. Report actual output; never claim a check ran when it did not. Do not modify browser profiles, automate a browser, accept an arbitrary output path, or write outside the fixed bookmark-output boundary.
```

- [ ] **3. Supervise every proposed action**

## 3. Supervise every proposed action

Before approving an action, read its target and purpose.

- Approve a proposed write when it creates or updates a planned file under `samples/developer-workbench-mcp/` or the selected-client MCP configuration named in the plan.
- Approve a proposed command when it runs an expected package install, focused check, test, typecheck, lint, or build from the project directory.
- Do not approve a write outside those boundaries, a browser-profile change, browser automation, or an unexplained command.

Mark each condition as you observe it:

- [ ] I approved only commands and writes I understood.
- [ ] The first focused check ran immediately after the first substantive file creation.
- [ ] I compared the tool behavior with the specification.
- [ ] I inspected actual test, typecheck, lint, and build output.

A **focused check** is the smallest command that can test the just-created slice, such as a single unit-test file or `npm run typecheck`. It is not the whole test suite. Actual output is the full command result, including pass or failure text and any exit code.

Verify the completed server against the specification: `add_learning_links` and `list_learning_links`, HTTPS-only bounded inputs, escaping, duplicate handling, preserved data, atomic writes, and stderr diagnostics.

- [ ] **4. Repair a focused failure, if needed**

## 4. Repair a focused failure

Look for a failure indicator such as `FAIL`, an error message, a nonzero exit code, or a failed-test summary. Copy the complete command output and paste it with this request:

```text
Diagnose this failed check, make the smallest focused repair, and rerun this same check before doing any other work. Report the actual result.
```

1. Approve the smallest proposed repair only after reviewing it.
2. Require Copilot to rerun the same failed command before it makes any broader change.
3. Continue only after the rerun returns passing output or the failure identifies a missing requirement that you resolve.

- [ ] **5. Configure and discover your local server**

## 5. Configure and discover your local server

After all project checks pass, ask Copilot to add the local server using the project's actual start command and working directory. Approve the configuration write only in your primary client's configuration.

### VS Code Insiders

1. Confirm the configuration write targets `.vscode/mcp.json` as named in the approved plan.
2. Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>, run **Developer: Reload Window**, and reopen the Chat view.
3. Open the Chat tools list and confirm that `add_learning_links` and `list_learning_links` are visible.

### Copilot CLI

1. Confirm the configuration write targets [.github/mcp.json](.github/mcp.json) as named in the approved plan.
2. Exit the current CLI session, run `copilot` again from the repository root, and enter `/mcp show`.
3. Confirm that the local Developer Workbench server and both `add_learning_links` and `list_learning_links` are visible.

Do not rebuild the project in the comparison client.

## Checkpoint

- [ ] Copilot created the target project from the specification and plan.
- [ ] I approved every command and file write.
- [ ] The two MCP tools are visible in my primary client.
- [ ] The project checks report actual passing output.
- [ ] The server only generates the fixed bookmark HTML output; it does not modify a browser profile.

## Recovery

### The conversation or plan is lost

1. Start a new planning conversation in your primary client.
2. Allow it to read [spec/spec-developer-workbench-mcp.md](spec/spec-developer-workbench-mcp.md).
3. Paste the approved plan and the complete current command failure, if one exists.
4. Approve only the smallest next action needed to restore progress.

### The local server is not visible

Follow the client-specific discovery and diagnostics steps in [.github/mcp-server-recovery.md](.github/mcp-server-recovery.md).

---

**Next:** [Step 5: Reuse, curate, and review](workshop-step-5-realworld-scenarios.md)