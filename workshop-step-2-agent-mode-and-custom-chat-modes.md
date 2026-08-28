# Workshop Step 2: Give Copilot an incomplete request

**Time:** 7 minutes

This exercise makes the cost of vague requirements visible. Ask Copilot what it would create based only on a short request. It must not inspect the repository, use tools, run commands, or edit files.

## Prepare a read-only conversation

Follow only your facilitator-assigned track. Stay in this conversation through Step 3 so you can compare the agent's first assumptions with its grounded plan.

### VS Code Insiders

1. Open Chat and start a new agent conversation.
2. Select Plan if it is available. If it is not, continue with the prompt below and deny every proposed tool action.
3. When Copilot requests a workspace read, command, or edit, select **Deny**.

### Copilot CLI

1. Run `copilot` from the repository root.
2. Press <kbd>Shift</kbd>+<kbd>Tab</kbd> until Plan mode is active.
3. Deny any proposed file read, shell command, or write action.

## The weak request

Paste this request without adding requirements from later modules:

```text
Based only on this request, explain how you would create an MCP server that saves
categorized developer-learning links to a browser-importable bookmarks file.

List the outcome, architecture, files, dependencies, security boundaries, and
tests you are assuming. Do not read repository files, use tools, run commands,
or make changes.
```

Record what the agent invented:

- [ ] The assumed output location.
- [ ] Whether it chose direct browser integration or an export file.
- [ ] How it would handle malformed or malicious links.
- [ ] The files, dependencies, and tests it assumed.

## Success signal

The response contains useful ideas but at least three unagreed assumptions. The conversation shows no approved tools, commands, repository reads, or file changes.

## Recovery

If the primary client is unavailable, pair with an enabled student or use the other installed client with the same read-only prompt. Do not reveal the specification yet.

Next: [ground, clarify, and review a plan](workshop-step-3-prompt-files.md).
