# Workshop Step 0: Setup and prerequisites

Complete this prework before the in-person workshop. Bring your own laptop with Git, Node.js 22 or later, VS Code Insiders, and GitHub Copilot CLI installed. The facilitator assigns the primary client track for your cohort. You install both clients, but create the application only once.

## Account and laptop readiness

- [ ] Sign in to a [GitHub account](https://github.com/) with an active GitHub Copilot entitlement. Apply for [Copilot Student](https://github.com/education/students) early: student verification and activation are separate and can take several days.
- [ ] Install [Git](https://git-scm.com/) and [Node.js 22 or later](https://nodejs.org/), then run:

```text
git --version
node --version
```

- [ ] Install [VS Code Insiders](https://code.visualstudio.com/insiders/), sign in with GitHub, and confirm Copilot Chat is visible.
- [ ] Install [GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli), sign in, and run:

```text
copilot --version
```

For an npm installation, use Node.js 22 or later:

```text
npm install -g @github/copilot
```

## Get the workshop

- [ ] Create a personal fork or local clone of this repository and open its root folder.
- [ ] Trust the workspace when your selected client asks.
- [ ] Wait for the facilitator to assign the VS Code Insiders or Copilot CLI primary track. You can compare the other track later in the workshop site.

Do not open the detailed Developer Workbench specification yet. Step 2 deliberately shows what an agent assumes when it receives only an incomplete request. Step 3 reveals the contract and adds grounding.

## Day-of fallback

If Copilot access is unavailable on the day, pair with a student whose access works. The enabled student operates the client while both of you decide what context to provide, what tool actions to approve, and how to evaluate the result.

## Setup checkpoint

- [ ] My laptop has Git and Node.js 22 or later.
- [ ] I am signed in to VS Code Insiders and Copilot CLI.
- [ ] I have a personal clone or fork and a facilitator-assigned primary track.
- [ ] I understand that Copilot creates the Developer Workbench during the workshop.

## Recovery

Use [.github/PREFLIGHT.md](.github/PREFLIGHT.md) for the concise readiness checklist. Tell the facilitator about access problems before the timed session so a pairing can be arranged.

Next: [reimagine development with an agent](workshop-step-1-reimagining-development-with-agentic-devops.md).
