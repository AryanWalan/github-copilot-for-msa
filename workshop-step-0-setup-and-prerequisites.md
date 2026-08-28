# Workshop Step 0: Setup and prerequisites

Complete these steps before starting the workshop. You need Git, Node.js 22 or later, VS Code Insiders, and GitHub Copilot CLI. Install both clients, choose one primary client, and create the application only once in that client.

- [ ] **1. Verify your GitHub and Copilot access**

## 1. Verify your GitHub and Copilot access

1. Open [GitHub](https://github.com/) and sign in to the account you will use for the workshop.
2. Confirm that the account has an active GitHub Copilot entitlement.
3. If you need student access, apply through [Copilot Student](https://github.com/education/students). Complete verification and confirm activation before continuing; they are separate steps and activation can take several days.

**Success signal:** You are signed in to GitHub and can access GitHub Copilot.

- [ ] **2. Install and verify Git and Node.js**

## 2. Install and verify Git and Node.js

1. Download and install [Git](https://git-scm.com/).
2. Download and install [Node.js 22 or later](https://nodejs.org/).
3. Open PowerShell or another terminal and run:

```text
git --version
node --version
```

4. Confirm that both commands print a version and that the Node.js major version is 22 or higher.

**Recovery:** If either command is not recognized, close and reopen the terminal after installation. If Node.js is below version 22, install a current Node.js release before installing Copilot CLI.

- [ ] **3. Install and sign in to VS Code Insiders**

## 3. Install and sign in to VS Code Insiders

1. Download and install [VS Code Insiders](https://code.visualstudio.com/insiders/).
2. Open VS Code Insiders.
3. Select the Accounts icon in the lower-left corner, select **Sign in with GitHub**, and complete the browser sign-in flow.
4. Open the Chat view from the Activity Bar and confirm that Copilot Chat is available.

**Success signal:** The Chat view opens and identifies your signed-in GitHub account.

- [ ] **4. Install and sign in to GitHub Copilot CLI**

## 4. Install and sign in to GitHub Copilot CLI

1. Follow the [GitHub Copilot CLI installation instructions](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli).
2. For an npm installation, run this command in a terminal after verifying Node.js 22 or later:

```text
npm install -g @github/copilot
```

3. Start the sign-in flow with `copilot` and complete the prompts in the terminal and browser.
4. Verify the installation:

```text
copilot --version
```

**Success signal:** The command prints a Copilot CLI version without an error.

- [ ] **5. Fork or clone the workshop repository**

## 5. Fork or clone the workshop repository

Start from the [github-copilot-for-msa repository](https://github.com/PlagueHO/github-copilot-for-msa).

### Option A: Create your own fork

1. Select **Fork** near the top-right of the repository page.
2. Select your personal GitHub account as the owner, keep the repository name, and select **Create fork**.
3. On your fork, select **Code**, copy the HTTPS clone URL, and run the following command in a terminal. Replace `<your-fork-url>` with the copied URL:

```text
git clone <your-fork-url>
```

### Option B: Clone the workshop repository directly

1. Select **Code** on the [workshop repository](https://github.com/PlagueHO/github-copilot-for-msa).
2. Select the **HTTPS** tab and copy the clone URL.
3. Run the following command in a terminal. Replace `<repository-url>` with the copied URL:

```text
git clone <repository-url>
```

### Open the cloned folder

1. Change to the newly cloned `github-copilot-for-msa` directory:

```text
cd github-copilot-for-msa
```

2. In VS Code Insiders, select **File** > **Open Folder**, select the `github-copilot-for-msa` folder, and select **Select Folder**.
3. If VS Code displays the Workspace Trust dialog, select **Yes, I trust the authors** for your own fork or the workshop repository.

**Success signal:** The Explorer shows `README.md`, `spec`, and the workshop-step Markdown files at the workspace root.

- [ ] **6. Choose your primary client**

## 6. Choose your primary client

Choose one primary client for project creation. Complete the matching instructions in each later step; do not create the project in both clients.

- Choose **VS Code Insiders** if you prefer an IDE workflow with Copilot Chat and workspace MCP configuration.
- Choose **Copilot CLI** if you prefer an interactive terminal workflow with project MCP configuration.

Record your choice: `VS Code Insiders` or `Copilot CLI`.

Do not open the detailed Developer Workbench specification yet. Step 2 deliberately shows what an agent assumes when it receives only an incomplete request. Step 3 reveals the contract and adds grounding.

## Setup checkpoint

- [ ] Git and Node.js 22 or later are installed and report their versions.
- [ ] I am signed in to VS Code Insiders and GitHub Copilot CLI.
- [ ] I have forked or cloned the workshop repository and opened its root folder.
- [ ] I trusted the workspace and selected one primary client.
- [ ] I understand that Copilot creates the Developer Workbench during Step 4.

## Recovery

Use the self-paced [.github/PREFLIGHT.md](.github/PREFLIGHT.md) checklist to find the missing prerequisite. If Copilot access is unavailable, resolve the account entitlement or sign-in problem before proceeding; Steps 2 through 5 require a working Copilot client.

---

**Next:** [Step 1: Reimagine development with an agent](workshop-step-1-reimagining-development-with-agentic-devops.md)
