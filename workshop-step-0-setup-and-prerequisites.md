# Workshop Step 0: Setup and Prerequisites

Complete this step before the facilitator-led session and before starting the hands-on lab. The workshop uses a local TypeScript MCP server, so each student needs a working GitHub Copilot account, one supported client track, and a validated local environment.

## 1. Activate GitHub Copilot

- [ ] Create or sign in to a [GitHub account](https://github.com/).
- [ ] Choose one supported plan:
   - [ ] **Copilot Student:** apply and activate before the workshop. Student verification and Copilot activation are separate and may take several days.
   - [ ] **Copilot Pro, Pro+, or Max:** fully supported.
   - [ ] **Copilot Free:** supported for the core workflow. Use the fallback prompts when interactive Skill invocation is unavailable. Do not rely on a published numeric AI-credit allowance.
   - [ ] **Copilot Business or Enterprise:** supported only when your organization enables both MCP and Copilot CLI.
- [ ] Confirm that GitHub Copilot is active in your chosen client.

## 2. Choose a guided client track

The workshop has two fully documented tracks. Choose one for the session:

- [ ] **VS Code Insiders:** download [VS Code Insiders](https://code.visualstudio.com/insiders/), sign in with GitHub, and confirm Copilot Chat is available.
- [ ] **Copilot CLI:** install [Copilot CLI](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli), sign in to GitHub, and confirm that `copilot --version` succeeds. For npm installation, use Node.js 22 or later:

```text
npm install -g @github/copilot
```

## Optional: Install GitHub Copilot App

Students already comfortable with both guided tracks may install GitHub Copilot App and try the completed lab independently. This is optional and outside the timed workshop; no Copilot App setup or usage instructions are provided.

## 3. Install local development tools

- [ ] Install and verify Git and Node.js:

```text
git --version
node --version
```

- [ ] Use Node.js 22 or later. Install [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/) if either command is unavailable or Node is older than version 22.

## 4. Clone and validate the lab

- [ ] Clone this repository and run the local MCP project validation:

```text
cd samples/developer-workbench-mcp
npm ci
npm test
npm run typecheck
npm run lint
```

- [ ] Confirm all three validation commands pass before the workshop begins. Keep the command output available if one fails.

## 5. Trust and inspect MCP servers

- [ ] Open the repository as a trusted workspace.
- [ ] Review [.vscode/mcp.json](.vscode/mcp.json). It configures Microsoft Learn, Context7, and the local Developer Workbench MCP server.
- [ ] Approve only the servers you understand.
- [ ] Confirm that the local server exposes `add_learning_links` and `list_learning_links`.

The bookmark tool writes only the local HTML export. It never edits a Chrome or Edge profile.

## Setup checkpoint

- [ ] My GitHub Copilot plan is active and appropriate for the workshop.
- [ ] I selected VS Code Insiders or Copilot CLI as my guided track.
- [ ] Git and Node.js 22 or later are installed.
- [ ] The MCP project installs and passes tests, typecheck, and lint.
- [ ] The workspace is trusted and I can see the required MCP tools.
- [ ] Optional: I installed GitHub Copilot App for self-directed exploration after the core lab.

## Recovery

Use [.github/PREFLIGHT.md](.github/PREFLIGHT.md) for the concise checklist and [.github/mcp-server-recovery.md](.github/mcp-server-recovery.md) if the local MCP server is not visible.

Next: [Workshop Step 1: Reimagining Development with Agentic DevOps](workshop-step-1-reimagining-development-with-agentic-devops.md).
