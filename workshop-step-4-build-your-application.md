# Workshop Step 4: Create the MCP server with Copilot

**Time:** 45 minutes

This is the creation step. The starter repository contains no Developer Workbench project, source code, tests, or package files. Your Copilot coding agent creates the complete MCP server from the specification and reviewed plan while you supervise its decisions, tool approvals, edits, and validation results.

## Prepare your primary client

- **VS Code Insiders:** continue in the same agent session in the Chat view or Agents window.
- **Copilot CLI:** press <kbd>Shift</kbd>+<kbd>Tab</kbd> to leave Plan mode and return to the interactive agent session.

Keep the reviewed plan in the current conversation.

## Ask Copilot to create the project

Paste:

```text
Create the complete Developer Workbench MCP server by carrying out the approved
plan and satisfying spec/spec-developer-workbench-mcp.md.

Create all required project files under samples/developer-workbench-mcp. Follow
.github/copilot-instructions.md and AGENTS.md. Use current official documentation
through the configured grounding tools when an SDK or package detail is uncertain.

Work incrementally. After the first substantive file creation, run the cheapest
focused check that can disprove your approach. Fix local failures before expanding
scope. When the implementation is complete, run npm test, npm run typecheck, and
npm run lint from the created project. Show the files you created and the actual
output from each validation command. Don't configure the local MCP server yet.
Don't modify browser profiles, use browser automation, write outside the fixed
output boundary, or claim validation you didn't run. Stop and ask me if a
requirement remains unclear.
```

This prompt tells Copilot to create the project, use tools, edit files, run commands, and repair local failures. You don't manually create files or type source code. Your role is to evaluate and steer the agent.

## Supervise the creation run

As Copilot works:

- [ ] Confirm it creates a new project under `samples/developer-workbench-mcp` rather than searching for a hidden starter implementation.
- [ ] Review each proposed command and file change before approval.
- [ ] Check its decisions against the specification instead of prescribing code line by line.
- [ ] Inspect the actual output whenever Copilot runs a validation command.
- [ ] If a check fails, confirm Copilot repairs the same focused area and reruns that check before continuing.

## Respond to a validation failure

If Copilot stops after a failed check without proposing a focused repair, paste:

```text
The validation command failed with the output below. Diagnose the root cause,
make the smallest focused repair, and rerun this same command before doing any
other work. Report the actual result.

<paste the command and output here>
```

Don't move on until Copilot has run all three required commands successfully and shown their output.

## Configure the created MCP server

After validation passes, paste:

```text
The implementation checks pass. Configure the created Developer Workbench MCP
server for both workshop clients at repository scope. Preserve the existing
Microsoft Learn and Context7 servers.

Update .vscode/mcp.json for VS Code and .github/mcp.json for Copilot CLI, using
the created project's actual start command and working directory. Don't add
secrets or use a user-level configuration. Show the exact changes, then explain
how to reload each client and verify the two Developer Workbench tools.
```

The two configuration files intentionally use different schemas. Your Copilot agent must update each file according to its existing client format rather than copying one structure into the other. It can edit both repository files from either primary client.

Follow the reload instructions for your primary client. Confirm that the local server starts and exposes both tools. You can verify the second client after the workshop without creating the project again.

## Checkpoint

- [ ] Copilot created the complete project; no solution source was supplied by the workshop.
- [ ] The MCP server exposes `add_learning_links` and `list_learning_links`.
- [ ] The output location is fixed and no browser profile is changed.
- [ ] `npm test`, `npm run typecheck`, and `npm run lint` pass.
- [ ] I inspected Copilot's edits, tool approvals, and actual command output.
- [ ] I steered Copilot through any failure instead of bypassing validation.
- [ ] Copilot added repository-level client configuration only after validation passed.

## Recovery

Use the [Developer Workbench MCP specification](spec/spec-developer-workbench-mcp.md) to compare the created project with the intended outcome. If creation or registration fails, use [.github/mcp-server-recovery.md](.github/mcp-server-recovery.md). Don't work around a failing test by removing it.

Next: [use MCP safely and review the result](workshop-step-5-realworld-scenarios.md).
