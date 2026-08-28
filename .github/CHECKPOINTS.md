# Workshop Checkpoints

Use these checkpoints to resume the lab without skipping the engineering loop.

## Checkpoint 1: Context and plan

You have given Copilot the incomplete creation request without repository context or tool use, identified its assumptions, used authoritative sources, answered clarification questions, challenged an assumption, and reviewed a plan. Don't approve creation until the plan names files and validation commands.

## Checkpoint 2: Copilot creation

Your Copilot coding agent has created `samples/developer-workbench-mcp` from the specification and approved plan. The server exposes `add_learning_links` and `list_learning_links`, enforces the fixed output and security boundaries, and passes:

```text
npm test
npm run typecheck
npm run lint
```

After validation passed, Copilot added repository-level local server configuration to `.vscode/mcp.json` and `.github/mcp.json`. Both tools are visible in your primary client.

## Checkpoint 3: Acceptance review

The created server preserves existing links and categories, prevents canonical URL duplicates, and writes atomically. Tests cover malformed URLs, HTML escaping, duplicates, existing data, categories, and write failures. Your Copilot agent and the read-only quality-review Skill have reported findings against the specification.

## Checkpoint 4: Trust and review

The `learning-curator` agent has proposed links, the student has explicitly approved a local write, the HTML has been manually imported into a browser, and one valid review finding has been repaired and revalidated.
