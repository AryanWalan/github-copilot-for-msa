# GitHub Copilot Agentic Development Workshop

This Microsoft Student Accelerator workshop teaches a disciplined agentic-development loop:

**context -> clarify -> challenge assumptions -> plan -> implement -> review -> validate**

The shared application is a local TypeScript MCP server that collects approved developer-learning links from Microsoft Learn and Context7 into a browser-importable HTML bookmark file.

## Core tracks

The guided workshop supports both:

- **VS Code Insiders** with Agent Mode and workspace MCP configuration.
- **Copilot CLI** with the same repository, prompts, and local MCP server.

The concepts and application are shared. The workshop site provides client-specific commands where they differ.

Copilot Student, Pro, Pro+, and Max are supported. Business and Enterprise require organization policy approval for MCP and Copilot CLI. Copilot Free can complete the learning outcomes using documented prompt fallbacks where interactive Skill invocation is unavailable. No numeric Copilot Free AI-credit allowance is assumed.

## Optional exploration

Students who are already confident with VS Code Insiders and Copilot CLI are encouraged to install GitHub Copilot App and try the completed lab independently. The workshop does not provide Copilot App setup or usage instructions. The optional bookmark viewer remains separate from the core lab.

## Prerequisites

Complete these before the timed session:

- GitHub account and an active Copilot plan.
- [VS Code Insiders](https://code.visualstudio.com/insiders/) or [Copilot CLI](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli).
- [Git](https://git-scm.com/) and Node.js 22 or later.
- A local clone of this repository.
- A trusted workspace with MCP server approval available.

For npm-based Copilot CLI installation, use `npm install -g @github/copilot` with Node.js 22 or later.

## Start the MCP project

```text
cd samples/developer-workbench-mcp
npm ci
npm test
npm run typecheck
npm run lint
```

The local server exposes:

- `add_learning_links`: validates one to five HTTPS links and writes `output/developer-learning-bookmarks.html`.
- `list_learning_links`: inspects the current collection before additions are proposed.

The server never edits Chrome or Edge profiles, accepts arbitrary output paths, stores secrets, or writes diagnostics to MCP stdout.

## Workshop journey

1. Reimagine development as an agentic engineering loop.
2. Run the intentionally weak bookmark-MCP request.
3. Ground the agent with Microsoft Learn and Context7.
4. Ask clarifying questions and challenge an assumption.
5. Review the implementation plan with the rubber-duck rubric.
6. Implement the MCP server and run focused tests.
7. Add repository guidance, a constrained custom agent, and a code-quality review Skill.
8. Approve proposed links, generate the HTML export, and import it manually through Chrome or Edge.

The detailed workshop steps are being rebuilt around this sequence. The implementation source is in [samples/developer-workbench-mcp](samples/developer-workbench-mcp/).

## MCP configuration

The workspace configuration in [.vscode/mcp.json](.vscode/mcp.json) includes Microsoft Learn, Context7, the local bookmark server, and GitHub MCP. The core exercise should use only the servers needed for the current step and require approval before a write tool call.

## Design boundaries

- The output is a Netscape-format HTML export, not a live browser integration.
- Link metadata is validated and HTML-escaped.
- Writes preserve existing links, prevent canonical URL duplicates, and use a temporary file followed by rename.
- Azure deployment, databases, browser extensions, native messaging, OAuth, and cloud-hosted MCP are outside the core workshop.
