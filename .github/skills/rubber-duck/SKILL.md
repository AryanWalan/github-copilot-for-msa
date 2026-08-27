---
name: rubber-duck
description: "Use when: reviewing a proposed implementation plan for the developer-workbench MCP server before code edits. Challenge scope, assumptions, security boundaries, failure modes, tests, and validation."
---

# Rubber-Duck Plan Review

Review the proposed plan without editing files or running write-capable tools.

1. Restate the intended user outcome and identify any ambiguity.
2. Ask one question that challenges the central solution assumption.
3. Check the plan covers the MCP tool schemas, fixed output boundary, HTTPS-only URLs, input limits, HTML escaping, canonical duplicate handling, atomic writes, and stdout/stderr behavior.
4. Identify missing failure cases and focused tests.
5. Return findings first, ordered by severity, then a short list of required plan changes.

Do not approve implementation until the plan names the files to change and the commands that will validate the result.
