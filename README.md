# GitHub Copilot Agentic Development Workshop

This Microsoft Student Accelerator workshop teaches a disciplined agentic-development loop:

**context -> clarify -> challenge assumptions -> plan -> create -> review -> validate**

You use a GitHub Copilot coding agent to create a local TypeScript MCP server that collects approved developer-learning links from Microsoft Learn and Context7 into a browser-importable HTML bookmark file.

The starter repository deliberately contains no Developer Workbench source code, tests, package files, or local server registration. The workshop introduces the target specification after students first inspect Copilot's assumptions. Creating the application is the lab, not a prerequisite.

## Choose your primary client

Install both clients, then choose one as your primary client for this workshop. Create the server only once in that client. You can use the other client later to compare its workflow without rebuilding the project.

- **VS Code Insiders:** choose this track to work in an IDE, use Copilot Chat, and manage workspace MCP configuration.
- **Copilot CLI:** choose this track to work from a terminal and manage project MCP configuration.

The concepts and application are shared. Each workshop step clearly labels the instructions that differ between the two clients.

## Optional exploration

Learners who are already confident with VS Code Insiders and Copilot CLI can install GitHub Copilot App and try the completed lab independently. The workshop does not provide Copilot App setup or usage instructions. The optional bookmark viewer remains separate from the core lab.

## Prerequisites

Complete the detailed [setup and prerequisites](workshop-step-0-setup-and-prerequisites.md) before beginning the workshop:

- GitHub account and an active Copilot plan.
- [VS Code Insiders](https://code.visualstudio.com/insiders/) and [Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli).
- [Git](https://git-scm.com/) and Node.js 22 or later.
- A personal fork or local clone of this repository, opened as a trusted workspace.
- A trusted workspace with MCP server approval available.

For npm-based Copilot CLI installation, use `npm install -g @github/copilot` with Node.js 22 or later.

## What you create

During the workshop, your Copilot coding agent creates `samples/developer-workbench-mcp` from nothing. The intentionally incomplete exercise in Step 2 comes first. Step 3 then reveals the detailed product specification and safety boundaries, so do not inspect the specification before completing Step 2.

## Workshop journey

1. Complete [setup and prerequisites](workshop-step-0-setup-and-prerequisites.md).
2. [Reimagine development as an agentic engineering loop](workshop-step-1-reimagining-development-with-agentic-devops.md).
3. [Give Copilot an intentionally incomplete creation request](workshop-step-2-agent-mode-and-custom-chat-modes.md) without allowing repository inspection or edits.
4. [Ground the agent with the specification, Microsoft Learn, and Context7](workshop-step-3-prompt-files.md).
5. Ask clarifying questions, challenge an assumption, and review the creation plan.
6. [Create and test the complete MCP server](workshop-step-4-build-your-application.md) from the approved plan.
7. [Package validation behavior, curate links, and review the code](workshop-step-5-realworld-scenarios.md).
8. [Carry the loop into your next project](workshop-step-6-next-steps.md).

## MCP configuration

The starter leaves documentation MCP configuration empty. In Step 3, you add Microsoft Learn and Context7 at workspace scope in VS Code Insiders or repository scope in Copilot CLI. After validation, configure the local Developer Workbench only for your primary client. Every shell command and file write requires your explicit approval.

The detailed product and security boundaries are deliberately introduced in Step 3 rather than disclosed here.
