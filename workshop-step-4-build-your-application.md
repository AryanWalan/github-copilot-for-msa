# Workshop Step 4: Create the MCP server incrementally

**Time:** 22 minutes

Now approve implementation. Copilot creates the complete project under `samples/developer-workbench-mcp/` from the reviewed plan and specification. You approve every file write and shell command, then inspect the evidence it returns.

## Start implementation

### VS Code Insiders

Use **Start Implementation** on the approved plan, or continue the agent conversation after switching from Plan to Agent mode.

### Copilot CLI

Continue the same conversation and leave Plan mode with <kbd>Shift</kbd>+<kbd>Tab</kbd>.

Paste:

```text
Implement the approved plan for spec/spec-developer-workbench-mcp.md. Create files only under samples/developer-workbench-mcp and the selected-client MCP configuration required by the plan. Work incrementally.

After the first substantive file creation, run the cheapest focused check that could disprove the approach. Stop for my approval before every file write and shell command. Repair a focused failure and rerun the same check before expanding scope. At completion, run the project's documented test, typecheck, lint, and build commands. Report actual output; never claim a check ran when it did not. Do not modify browser profiles, automate a browser, accept an arbitrary output path, or write outside the fixed bookmark-output boundary.
```

## Supervise the run

- [ ] Approve only the proposed commands and writes you understand.
- [ ] Confirm the first focused check runs immediately after the first meaningful implementation slice.
- [ ] Compare tool behavior with the specification: `add_learning_links` and `list_learning_links`, HTTPS-only bounded inputs, escaping, duplicate handling, preserved data, atomic writes, and stderr diagnostics.
- [ ] Inspect actual test, typecheck, lint, and build output.

If a check fails, paste its actual output and say:

```text
Diagnose this failed check, make the smallest focused repair, and rerun this same check before doing any other work. Report the actual result.
```

## Configure your local server

After all checks pass, ask Copilot to add the local server to the configuration for your selected primary client, using the project's actual start command and working directory. Approve the configuration write, reload the client, and confirm both `add_learning_links` and `list_learning_links` are visible. Do not rebuild the project in the comparison client.

## Checkpoint

- [ ] Copilot created the target project from the specification and plan.
- [ ] I approved every command and file write.
- [ ] The two MCP tools are visible in my primary client.
- [ ] The project checks report actual passing output.
- [ ] The server only generates the fixed bookmark HTML output; it does not modify a browser profile.

## Recovery

If the conversation or plan is lost, start a new planning conversation, attach the specification, paste the approved plan and the current command failure if present, then approve only the smallest next action. Use [.github/mcp-server-recovery.md](.github/mcp-server-recovery.md) for local server discovery failures.

Next: [package validation and use the server safely](workshop-step-5-realworld-scenarios.md).