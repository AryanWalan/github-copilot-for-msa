# Workshop Step 1: Reimagining development with an agent

**Time:** 5 minutes

GitHub Copilot can do more than complete a line of code. In an agent session it can inspect approved context, make a plan, propose edits and commands, observe results, and adapt. You remain responsible for the outcome: you decide what it knows, what it may do, and whether its evidence is convincing.

## The loop you will practice

1. **Context:** give the agent the product contract, repository rules, and current documentation it needs.
2. **Clarify:** ask it to expose missing decisions instead of guessing.
3. **Challenge:** test one important assumption before it becomes code.
4. **Plan:** review files, boundaries, tests, and commands before approving changes.
5. **Create:** approve a small implementation step.
6. **Review and validate:** inspect the result, run a focused check, and use the observed output for the next decision.

You will make that loop concrete with three reusable customization types:

- **Instructions** give rules to work matching files.
- **Custom agents** give a focused role and limited tool boundary.
- **Skills** package a repeated repository-specific process.

Built-in commands such as `/rubber-duck`, `/review`, and `/security-review` provide general workflows. MCP servers provide approved capabilities and documentation sources.

## What you will build

With Copilot, you will create a local TypeScript MCP server that manages categorized developer-learning links and exports a browser-importable bookmark HTML file. It never modifies a browser profile.

- [ ] **Choose a decision you will keep**

## Choose a decision you will keep

Choose one decision type that you, rather than Copilot, will own during the remaining steps:

1. Choose **context** to decide which files, specifications, and documentation Copilot may use.
2. Choose **tool approval** to decide which proposed reads, commands, and writes Copilot may perform.
3. Choose **plan acceptance** to decide whether its proposed files, boundaries, and checks are sufficient before implementation.
4. Choose **validation evidence** to decide whether the actual command output proves the change works.
5. Record your choice in a note or keep it visible beside this workshop. In later steps, identify one moment where you made that decision.

**Success signal:** You can state the decision type you chose and identify the next step where you will exercise it.

---

**Next:** [Step 2: Give Copilot an incomplete request](workshop-step-2-agent-mode-and-custom-chat-modes.md)
