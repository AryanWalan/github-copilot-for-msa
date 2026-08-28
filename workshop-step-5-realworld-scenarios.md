# Workshop Step 5: Reuse, curate, and review

**Time:** 8 minutes

This capstone turns the process you just used into reusable agent behavior. Create one repository-specific validation Skill, create a focused curator agent, approve a real local write, and divide two independent reviews.

- [ ] **1. Create and run a validation Skill**

## 1. Create and run a validation Skill

A Skill packages a repeated process. Ask Copilot to propose `.github/skills/developer-workbench-validation/SKILL.md` by pasting this request:

```text
Create a proposal for a repository Skill named developer-workbench-validation. It must provide a read-only, repeatable quality gate for samples/developer-workbench-mcp: run the established checks from cheapest to broadest, verify the two tools and fixed bookmark-output contract, report actual results, and stop at the first discriminating failure. Do not write it until I approve the content.
```

Review the proposal before approving the file write. Approve only when it includes all of the following:

- [ ] A trigger-rich description that identifies when to use the Skill.
- [ ] A read-only workflow for `samples/developer-workbench-mcp`.
- [ ] Checks ordered from cheapest to broadest.
- [ ] Verification of both MCP tools and the fixed bookmark-output contract.
- [ ] Actual command results rather than claimed validation.
- [ ] A stop at the first discriminating failure.

After the write, reload customizations if your client requests it. Invoke `developer-workbench-validation` and inspect its report before continuing.

**Success signal:** The Skill returns a read-only report that shows the checks it ran and their actual results.

- [ ] **2. Create and select the curator agent**

## 2. Create and select the curator agent

Ask Copilot to create `.github/agents/learning-curator.agent.md`. Its role is to use Microsoft Learn and Context7, inspect existing bookmarks, propose up to three categorized links with a rationale, and wait for your approval before calling `add_learning_links`. Its tool boundary must be limited to documentation and the local bookmark server.

1. Review the proposed agent definition before approving the file write.
2. Confirm its YAML frontmatter identifies the `learning-curator` agent and its allowed tools do not extend beyond documentation sources and the local bookmark server.
3. Reload customizations if prompted.
4. Select `learning-curator` from the agent picker in the Chat view or your CLI's agent-selection command.
5. Confirm the active-agent label or prompt identifies `learning-curator` before sending the request below.

Paste:

```text
Find up to three current learning links for building TypeScript MCP servers. Use Microsoft Learn for Microsoft concepts and Context7 only for current package or SDK API details. Inspect existing bookmarks, explain why each link is useful, and show proposed additions. Do not save anything until I explicitly approve.
```

- [ ] **3. Approve one deliberate bookmark write**

## 3. Approve one deliberate bookmark write

1. Inspect the proposed URLs, categories, titles, descriptions, and rationale.
2. Approve one `add_learning_links` call only after you can describe the proposed change.
3. Run `list_learning_links` and confirm the approved links are present.
4. Open the generated bookmark HTML file.
5. Import the file manually through Chrome or Edge's bookmark manager after completing the workshop. Do not allow browser automation or browser-profile writes.

**Success signal:** The generated HTML contains the approved categorized links, and the client only wrote within the fixed bookmark-output boundary.

- [ ] **4. Review the implementation in parallel**

## 4. Review the implementation in parallel

First, run built-in `/review` for correctness and `/security-review` for input and file-handling risks. Keep both reviews read-only.

Choose the parallel workflow for your primary client.

### VS Code Insiders

1. Ask the parent conversation to delegate **correctness and MCP protocol behavior** to one read-only subagent.
2. Ask it to delegate **security, input validation, and file handling** to a second read-only subagent.
3. Review both returned reports in the parent conversation.

### Copilot CLI

1. Enter `/fleet` and create one explicit read-only task for **correctness and MCP protocol behavior**.
2. Create a second explicit read-only task for **security, input validation, and file handling**.
3. Enter `/tasks` to inspect both task reports.

Ask the parent conversation to synthesize duplicate findings and disagreements. This exercise is review-only: record findings first, then repair the prioritized findings after the review has been synthesized.

## Checkpoint

- [ ] I created and invoked `developer-workbench-validation`.
- [ ] I created, selected, and constrained `learning-curator`.
- [ ] I distinguished selecting an agent from approving its write tool.
- [ ] I approved one bookmark write deliberately and verified the output.
- [ ] Built-in and parallel reviews produced a read-only report.

## Recovery

### A Skill or agent is not visible

1. Confirm the files exist at `.github/skills/developer-workbench-validation/SKILL.md` and `.github/agents/learning-curator.agent.md`.
2. Open each file and confirm that its YAML frontmatter starts and ends with `---`.
3. Reload your primary client, then reopen the Skill or agent picker.

### A parallel review worker cannot start

1. Run the same review concern sequentially in the parent conversation.
2. Keep it read-only and record that the parallel review demonstration was unavailable.
3. Include its findings in the parent synthesis.

---

**Next:** [Step 6: Carry the loop forward](workshop-step-6-next-steps.md)