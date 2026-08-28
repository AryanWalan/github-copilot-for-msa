# Workshop Step 2: Give Copilot an incomplete request

**Time:** 7 minutes

This exercise makes the cost of vague requirements visible. Ask Copilot what it would create based only on a short request. It must not inspect the repository, use tools, run commands, or edit files.

Keep this conversation open through Step 3. You will compare these initial assumptions with the grounded plan that follows.

- [ ] **1. Start a read-only conversation**

## 1. Start a read-only conversation

Choose only the instructions for the primary client you selected in Step 0.

### VS Code Insiders

1. Open the Chat view from the Activity Bar.
2. Start a new conversation and select an agent-capable chat mode.
3. Select **Plan** from the mode picker above the message box, if it is available.
4. If Plan mode is unavailable, continue with the prompt below but select **Deny** for every proposed tool action.
5. When Copilot proposes a workspace read, terminal command, or file change, select **Deny** in the approval control shown with the proposal.

**Success signal:** The conversation contains no approved workspace reads, commands, or edits.

### Copilot CLI

1. Open a terminal in the `github-copilot-for-msa` repository root.
2. Run:

```text
copilot
```

3. Press <kbd>Shift</kbd>+<kbd>Tab</kbd> until the CLI indicates Plan mode is active.
4. When the CLI proposes a file read, shell command, or write action, choose its deny option rather than approving it.

**Success signal:** The CLI session remains in Plan mode and no action proposal is approved.

- [ ] **2. Paste the incomplete request**

## 2. Paste the incomplete request

Paste this request exactly as written. Do not add requirements from later steps:

```text
Based only on this request, explain how you would create an MCP server that saves
categorized developer-learning links to a browser-importable bookmarks file.

List the outcome, architecture, files, dependencies, security boundaries, and
tests you are assuming. Do not read repository files, use tools, run commands,
or make changes.
```

- [ ] **3. Record the assumptions**

## 3. Record the assumptions

Record what the agent invented:

- [ ] The assumed output location.
- [ ] Whether it chose direct browser integration or an export file.
- [ ] How it would handle malformed or malicious links.
- [ ] The files, dependencies, and tests it assumed.

## Success signal

The response contains useful ideas but at least three unagreed assumptions. The conversation shows no approved tools, commands, repository reads, or file changes.

## Recovery

### Your client session ends or is unavailable

1. Open the other installed client from the repository root.
2. Start a new Plan or read-only conversation.
3. Paste the incomplete request exactly as shown above.
4. Deny every proposed repository read, command, and write.
5. Record the new response's assumptions, then continue to Step 3 in that same conversation.

Do not reveal the specification until Step 3.

---

**Next:** [Step 3: Ground, clarify, and review a plan](workshop-step-3-prompt-files.md)
