# Workshop Step 2: Start With an Incomplete Request

**Time:** 10 minutes

This step makes the cost of vague requirements visible. Do not build immediately: observe the questions, assumptions, and scope that the agent chooses when context is missing.

## Goal

Ask Copilot to propose a first cut of a local MCP server that stores curated development-learning links in a browser-importable bookmark file.

## Before you begin

- [ ] Open this repository in VS Code Insiders or from Copilot CLI.
- [ ] Confirm the workspace is trusted.
- [ ] Open [samples/developer-workbench-mcp](samples/developer-workbench-mcp/).
- [ ] In VS Code, select Agent mode. In Copilot CLI, start a session in this repository.

## The weak request

Paste this request without adding requirements that are not shown:

```text
Build an MCP server that saves categorized developer-learning links to a browser-importable bookmarks file.
```

Do not approve edits yet. Read the response and record:

- [ ] Record the output location the agent assumed.
- [ ] Record whether it proposed a live browser integration or an export file.
- [ ] Record how it would prevent malicious or malformed links.
- [ ] Record the tests it planned to run.

## Expected result

A useful response may still be incomplete. That is the point: an agent cannot infer your security boundary, import format, source quality bar, or definition of done.

## Checkpoint

- [ ] I ran the weak request.
- [ ] I identified at least two assumptions that need to become explicit requirements.
- [ ] I did not approve code edits yet.

## Recovery

If Agent mode is unavailable, ask the same request in normal Copilot Chat and critique its answer. The next step uses a copyable prompt and does not require this exact interaction.

Next: [ground the agent and remove assumptions](workshop-step-3-prompt-files.md).
