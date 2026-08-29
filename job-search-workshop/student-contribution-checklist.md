# Student contribution checklist

Use this checklist after the initial local job-search application works. Complete every step with GitHub Copilot in VS Code Insiders or Copilot CLI.

> You review and approve every generated change. Do not accept Copilot output without checking that it meets the Issue and repository instructions.

## Contribution workflow

- [ ] **1. Understand the repository**
  - Ask Copilot to inspect the structure, instructions, scripts, tests, and current behavior.
  - Confirm the application starts and the existing checks pass before changing it.

- [ ] **2. Choose a useful improvement**
  - Identify a user, reliability, accessibility, testing, or developer-experience problem.
  - Prefer one small improvement that can be demonstrated and reviewed in the session.

- [ ] **3. Challenge the idea**
  - Ask Copilot to identify assumptions, risks, edge cases, dependencies, and a smaller alternative.
  - Reject ideas that require bypassing site policies, credentials, browser automation, or unnecessary personal data.

- [ ] **4. Check for conflicts**
  - Search the code, open Issues, and pull requests for existing functionality or similar work.
  - Choose a distinct scope or coordinate with the owner of related work.

- [ ] **5. Create a plan**
  - Ask Copilot for the smallest implementation plan that names files, behavior, tests, and validation commands.
  - Review the plan against the application specification and repository instructions.

- [ ] **6. Create the Issue**
  - Use Copilot to draft a concise title, problem statement, proposed outcome, acceptance criteria, and test notes.
  - Submit the Issue only after checking that it is clear, actionable, and not a duplicate.

- [ ] **7. Get approval and create a branch**
  - Wait for the required facilitator or maintainer approval.
  - Ask Copilot for a branch name that follows the repository convention, then create the branch.

- [ ] **8. Implement incrementally**
  - Ask Copilot to make one small change at a time and explain the intended file and behavior changes.
  - Approve only commands and writes that you understand.
  - Run the cheapest focused check immediately after the first substantive change.

- [ ] **9. Validate the complete change**
  - Add or update tests and documentation with Copilot.
  - Run the required test, typecheck, lint, and build commands.
  - Investigate failures with the actual output and rerun the same focused check after each repair.

- [ ] **10. Open, review, and merge the pull request**
  - Ask Copilot to prepare a concise PR title, summary, test evidence, and known limitations.
  - Request a Copilot review before merge.
  - Address valid feedback, verify the final diff, and merge only after the required human approval.

## Operating rules

- Use GitHub Copilot throughout the workflow. VS Code Insiders and Copilot CLI are both supported.
- Do not manually write application code, tests, configuration, Issues, or PR descriptions.
- You may review, question, edit, and approve Copilot-generated work.
- Follow repository instructions and the approved Issue scope.
- Keep changes small, testable, and easy to reverse.
- Report actual command output. Never claim a check ran when it did not.
- Keep credentials and personal data out of source, prompts, Issues, logs, and commits.
- Never bypass authentication, CAPTCHAs, robots directives, rate limits, or access controls.

## When you are stuck

Ask Copilot to inspect the current state and identify one concrete next step. Include the exact error or command output when one exists. Do not ask for a broad rewrite before understanding the failure.

If a conversation is lost, reopen the specification, checklist, prompt guide, Issue, and current diff. Ask Copilot to reconstruct the state and propose the smallest action that restores progress.

## Completion signal

You are done when the Issue acceptance criteria are met, tests and documentation are updated, required checks pass with actual output, the PR has received Copilot review, and a maintainer has approved the merge.

## Related workshop assets

- [Application specification](application-specification.md)
- [Copilot prompt guide](copilot-prompt-guide.md)
