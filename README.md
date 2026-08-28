# GitHub Copilot Agentic Development Workshop

This Microsoft Student Accelerator workshop teaches a disciplined agentic-development loop:

**context -> clarify -> challenge assumptions -> plan -> implement -> review -> validate**

Students use a GitHub Copilot coding agent to create a local TypeScript MCP server that collects approved developer-learning links from Microsoft Learn and Context7 into a browser-importable HTML bookmark file.

The starter repository deliberately contains no Developer Workbench source code, tests, package files, or local server registration. The workshop introduces the target specification after students first inspect Copilot's assumptions. Creating the application is the lab, not a prerequisite.

## Core tracks

Install both clients before the workshop, then choose one as your primary client for the hands-on exercises. You create the server once; you don't repeat the lab in both clients.

- **VS Code Insiders:** use an agent session in the Chat view or Agents window and workspace MCP configuration.
- **Copilot CLI:** run an interactive `copilot` session from the repository root and use its project MCP configuration.

The concepts and application are shared. The workshop site provides client-specific commands where they differ.

Copilot Student, Pro, Pro+, and Max are supported. Business and Enterprise require organization policy approval for MCP and Copilot CLI. Copilot Free can complete the learning outcomes using documented prompt fallbacks where interactive Skill invocation is unavailable. No numeric Copilot Free AI-credit allowance is assumed.

## Optional exploration

Students who are already confident with VS Code Insiders and Copilot CLI are encouraged to install GitHub Copilot App and try the completed lab independently. The workshop does not provide Copilot App setup or usage instructions. The optional bookmark viewer remains separate from the core lab.

## Prerequisites

Complete these before the timed session:

- GitHub account and an active Copilot plan.
- [VS Code Insiders](https://code.visualstudio.com/insiders/) and [Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli).
- [Git](https://git-scm.com/) and Node.js 22 or later.
- A local clone of this repository.
- A trusted workspace with MCP server approval available.

For npm-based Copilot CLI installation, use `npm install -g @github/copilot` with Node.js 22 or later.

## What students create

During the workshop, your Copilot coding agent creates `samples/developer-workbench-mcp` from nothing. The intentionally incomplete exercise in Step 2 comes first. Step 3 then reveals the detailed product specification and safety boundaries, so don't inspect the specification before completing Step 2.

## Workshop journey

1. Complete [setup and prerequisites](workshop-step-0-setup-and-prerequisites.md).
2. Reimagine development as an agentic engineering loop.
3. Give Copilot an intentionally incomplete creation request without allowing it to inspect the repository or edit files.
4. Ground the Copilot agent with the specification, Microsoft Learn, and Context7.
5. Ask clarifying questions, challenge an assumption, and review the creation plan.
6. Give the Copilot agent the approved plan and ask it to create and test the complete MCP server.
7. Inspect real validation output and use the same agent to repair focused failures.
8. Approve proposed links, generate the HTML export, review the created code, and import the export manually through Chrome or Edge.

## MCP configuration

The starter configures Microsoft Learn and Context7 for both clients: [.vscode/mcp.json](.vscode/mcp.json) for VS Code and [.github/mcp.json](.github/mcp.json) for Copilot CLI. After the server passes validation, students configure the local Developer Workbench in both repository files and verify it in their primary client. Write tool calls always require explicit approval.

The detailed product and security boundaries are deliberately introduced in Step 3 rather than disclosed here.
