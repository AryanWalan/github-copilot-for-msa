# Developer Workbench workshop

This repository is a workshop in which students use a GitHub Copilot coding agent to create the Developer Workbench application during the lab.

## Workshop rules

- Don't create the target project during setup, the facilitator presentation, or the incomplete-request exercise.
- During the incomplete-request exercise, follow the student's read-only boundary and don't inspect repository files or use tools.
- When the student approves creation in Step 4, treat `spec/spec-developer-workbench-mcp.md` and the reviewed plan as the target contract.
- Ask rather than invent missing requirements.
- Keep changes within the target project and the repository-level client configuration named in the approved plan.
- Never modify browser profiles or add browser automation to the core lab.

## Workflow

1. Preserve the sequence from incomplete request to grounding, clarification, assumption challenge, reviewed plan, creation, review, and validation.
2. Don't edit files until the student explicitly approves the creation step.
3. During creation, work incrementally and run the cheapest focused check after the first substantive change.
4. Report actual command output and don't claim validation that wasn't run.
