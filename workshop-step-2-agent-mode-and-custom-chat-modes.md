# Workshop Step 2: Give Copilot an incomplete creation request

**Time:** 10 minutes

This step makes the cost of vague requirements visible. You ask Copilot what it would create based only on an incomplete request. Copilot must not inspect the repository, use tools, or edit files during this exercise.

## Goal

Identify the technical, security, and product decisions Copilot invents when the request doesn't provide enough context.

## Before you begin

- [ ] Open this repository in your primary client.
- [ ] Confirm the workspace is trusted.
- [ ] Prepare a read-only conversation for this exercise:
  - **VS Code Insiders:** open a new agent session in the Chat view or Agents window. Don't approve any tool use.
  - **Copilot CLI:** run `copilot` from the repository root, confirm folder trust, and press <kbd>Shift</kbd>+<kbd>Tab</kbd> until Plan mode is active.

Plan mode signals that you want analysis and planning rather than implementation. The prompt and your approval choices still enforce the boundary: don't allow repository reads, commands, or edits in this exercise.

## The weak request

Paste this request without adding requirements that are not shown:

```text
Based only on this request, explain how you would create an MCP server that saves
categorized developer-learning links to a browser-importable bookmarks file.

List the outcome, architecture, files, dependencies, security boundaries, and
tests you are assuming. Don't read repository files, use tools, or make changes.
```

Do not approve edits yet. Read the response and record:

- [ ] Record the output location the agent assumed.
- [ ] Record whether it proposed a live browser integration or an export file.
- [ ] Record how it would prevent malicious or malformed links.
- [ ] Record the files it planned to create and the tests it planned to run.

## Expected result

A confident response can still be wrong or incomplete. That is the point: a Copilot coding agent can create an entire project, but it can't infer your security boundary, import format, source quality bar, or definition of done. Step 3 introduces the missing context before any source code is created.

## Checkpoint

- [ ] I entered the incomplete request without supplying hidden requirements.
- [ ] I identified at least three assumptions Copilot made.
- [ ] I can explain why a plausible answer isn't the same as an agreed solution.
- [ ] Copilot didn't inspect files, use tools, or edit the repository.

## Recovery

If your primary client is unavailable, use the other installed client. Keep the exercise read-only and use the same prompt.

Next: [ground the agent and remove assumptions](workshop-step-3-prompt-files.md).
