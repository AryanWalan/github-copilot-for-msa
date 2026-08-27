---
name: code-quality-review-fallback
description: "Use when: Copilot Skill invocation is unavailable and you need a read-only quality review of the MCP server."
---

Review the developer-workbench MCP server without modifying files. Check the tool schemas, fixed output boundary, HTTPS validation, size limits, HTML escaping, canonical duplicate prevention, atomic writes, stdout-only MCP protocol behavior, errors, tests, and maintainability. Report findings first, ordered by severity, with file and line references. Then list test gaps and a short summary.
