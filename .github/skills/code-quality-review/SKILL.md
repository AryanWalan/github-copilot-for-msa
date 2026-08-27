---
name: code-quality-review
description: "Use when: reviewing the developer-workbench MCP server for correctness, security, protocol behavior, tests, maintainability, or unnecessary complexity. Return a read-only code review."
---

# MCP Code-Quality Review

Review the implementation without modifying files.

1. Inspect the MCP tool schemas and the bookmark-store implementation.
2. Check security boundaries: fixed output location, HTTPS validation, bounded input, HTML escaping, canonical URL duplicate prevention, and atomic writes.
3. Check MCP protocol behavior: stdout contains only protocol messages, errors are useful, and no secret or browser-profile behavior exists.
4. Check correctness, regression risk, focused test coverage, and maintainability.
5. Report findings first, ordered by severity, with file and line references. Follow with test gaps and a short summary.

Do not make edits unless the user separately asks to address a finding.
