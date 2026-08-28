# Workshop Step 0: Setup and Prerequisites

Complete this setup before the workshop begins. You need an active GitHub Copilot account, VS Code Insiders, Copilot CLI, Git, Node.js 22 or later, and a local clone of this repository. During the workshop, you use GitHub Copilot to create the Developer Workbench MCP server from scratch.

## 1. Activate GitHub Copilot

- [ ] Create or sign in to a [GitHub account](https://github.com/).
- [ ] Make sure you have one of these supported GitHub Copilot plans:
   - [**Copilot Student**](https://github.com/education/students): apply and activate before the workshop. Student verification and Copilot activation are separate and may take several days.
   - **Copilot Pro, Pro+, or Max:** fully supported.
   - **Copilot Free:** supported for the core workflow. Use the fallback prompts when interactive Skill invocation is unavailable. Do not rely on a published numeric AI-credit allowance.
   - **Copilot Business or Enterprise:** supported only when your organization enables both MCP and Copilot CLI.
- [ ] Confirm that GitHub Copilot is active in both clients.

## 2. Install the guided client software

Install and sign in to both clients before the session. The facilitator compares both experiences, and having both available lets you switch if one client is blocked. Choose one primary client for the hands-on exercises and create the server once; you don't repeat the lab in both clients.

- [ ] **VS Code Insiders:** download [VS Code Insiders](https://code.visualstudio.com/insiders/), sign in with GitHub, and confirm Copilot Chat is available.
- [ ] **Copilot CLI:** install [Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli), sign in to GitHub, and confirm that `copilot --version` succeeds. For npm installation, use Node.js 22 or later:

```text
npm install -g @github/copilot
```

- [ ] Choose VS Code Insiders or Copilot CLI as your primary client for the hands-on exercises.

## Optional: Install GitHub Copilot App

Students already comfortable with both guided tracks may install GitHub Copilot App and try the completed lab independently. This is optional and outside the timed workshop; no Copilot App setup or usage instructions are provided.

## 3. Install local development tools

- [ ] Install and verify Git and Node.js:

```text
git --version
node --version
```

- [ ] Use Node.js 22 or later. Install [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/) if either command is unavailable or Node is older than version 22.

## 4. Clone the workshop repository

- [ ] Clone this repository and open its root folder.
- [ ] Confirm that `samples/developer-workbench-mcp` does not exist. This is intentional: you use your GitHub Copilot coding agent to create the complete project during the workshop.

Don't open the detailed Developer Workbench specification yet. Step 2 first shows what Copilot assumes when it receives only an incomplete request. Step 3 then introduces the specification and grounding sources.

## 5. Trust and inspect the grounding servers

- [ ] Open the repository as a trusted workspace.
- [ ] Review [.vscode/mcp.json](.vscode/mcp.json), which configures grounding servers for VS Code.
- [ ] Review [.github/mcp.json](.github/mcp.json), which configures Microsoft Learn and Context7 for Copilot CLI.
- [ ] Approve only the servers you understand.
- [ ] Confirm that Microsoft Learn and Context7 tools are available.

The files use different JSON schemas because each client has its own configuration format. Copilot CLI also includes GitHub MCP automatically, so its project file doesn't repeat that server.

The local Developer Workbench server is deliberately not configured yet. In Step 4, your Copilot agent creates and validates the server. You then configure it for both clients and verify it in your primary client.

## 6. Understand the workshop customizations

The repository provides reusable Skills in `.github/skills` and the `learning-curator` custom agent in `.github/agents`. Both clients discover these repository customizations automatically. You don't use the curator until after you create and configure its required local MCP tools in Step 4.

- [ ] Confirm that [.github/agents/learning-curator.agent.md](.github/agents/learning-curator.agent.md) exists. Don't invoke it yet.
- [ ] If you use Copilot Free, note that Steps 3 and 5 provide copyable fallback prompts when interactive Skill invocation isn't available.

## Setup checkpoint

- [ ] My GitHub Copilot plan is active and appropriate for the workshop.
- [ ] I installed and signed in to VS Code Insiders and Copilot CLI.
- [ ] I chose one primary client for the hands-on exercises.
- [ ] Git and Node.js 22 or later are installed.
- [ ] I understand that the Developer Workbench source is not included in the starter repository.
- [ ] The workspace is trusted and I can see the Microsoft Learn and Context7 tools.
- [ ] Optional: I installed GitHub Copilot App for self-directed exploration after the core lab.

## Recovery

Use [.github/PREFLIGHT.md](.github/PREFLIGHT.md) for the concise checklist and [.github/mcp-server-recovery.md](.github/mcp-server-recovery.md) if project creation or the later local server registration fails.

Next: [Workshop Step 1: Reimagining Development with Agentic DevOps](workshop-step-1-reimagining-development-with-agentic-devops.md).
