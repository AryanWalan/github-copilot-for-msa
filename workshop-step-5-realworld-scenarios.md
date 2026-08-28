# Workshop Step 5: Reuse, curate, and review

**Time:** 8 minutes

This capstone turns the process you just used into reusable agent behavior. Create one repository-specific validation Skill, create a focused curator agent, approve a real local write, and divide two independent reviews.

## Create a validation Skill

A Skill packages a repeated process. Ask Copilot to propose `.github/skills/developer-workbench-validation/SKILL.md`, then approve the write only when it has a trigger-rich description and a read-only workflow that runs checks from cheapest to broadest, verifies the two MCP tools and fixed bookmark output, reports actual results, and stops at the first discriminating failure.

```text
Create a proposal for a repository Skill named developer-workbench-validation. It must provide a read-only, repeatable quality gate for samples/developer-workbench-mcp: run the established checks from cheapest to broadest, verify the two tools and fixed bookmark-output contract, report actual results, and stop at the first discriminating failure. Do not write it until I approve the content.
```

Reload customization if required by your client, invoke the new validation Skill, and inspect its report.

## Create and use the curator agent

Ask Copilot to create `.github/agents/learning-curator.agent.md`. Its role is to use Microsoft Learn and Context7, inspect existing bookmarks, propose up to three categorized links with a rationale, and wait for your approval before calling `add_learning_links`. Keep its tool boundary limited to documentation and the local bookmark server.

Select the new agent, then paste:

```text
Find up to three current learning links for building TypeScript MCP servers. Use Microsoft Learn for Microsoft concepts and Context7 only for current package or SDK API details. Inspect existing bookmarks, explain why each link is useful, and show proposed additions. Do not save anything until I explicitly approve.
```

- [ ] Inspect the proposed URLs, categories, titles, and descriptions.
- [ ] Approve one `add_learning_links` call only after reviewing the proposed change.
- [ ] Run `list_learning_links` and open the generated bookmark HTML file. Import it manually through Chrome or Edge's bookmark manager after the workshop.

## Review in parallel

Run built-in `/review` for correctness and `/security-review` for input and file-handling risks. Then split the two independent read-only concerns:

- **VS Code Insiders:** delegate correctness/protocol behavior and security/input/file handling to two read-only subagents.
- **Copilot CLI:** use `/fleet` to create two explicit read-only review tasks, then inspect them with `/tasks`.

Ask the parent conversation to synthesize duplicate findings and disagreements. Do not repair findings during this timed module.

## Checkpoint

- [ ] I created and invoked `developer-workbench-validation`.
- [ ] I created, selected, and constrained `learning-curator`.
- [ ] I distinguished selecting an agent from approving its write tool.
- [ ] I approved one bookmark write deliberately and verified the output.
- [ ] Built-in and parallel reviews produced a read-only report.

## Recovery

If customization is not visible, reload the primary client and confirm the file paths and YAML frontmatter. If a review worker cannot start, run the same concern sequentially in the parent conversation and record that the parallel demonstration was unavailable.

Next: [carry the loop into your next project](workshop-step-6-next-steps.md).