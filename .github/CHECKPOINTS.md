# Workshop Checkpoints

Use these checkpoints to resume the lab without skipping the engineering loop.

## Checkpoint 1: Context and plan

You have run the incomplete request, identified missing requirements, used authoritative sources, answered clarification questions, challenged an assumption, and reviewed a plan. Do not implement until the plan names files and validation commands.

## Checkpoint 2: First implementation cut

The MCP server exposes `add_learning_links`, accepts one to five bounded HTTPS links, writes the fixed bookmark export, escapes user-controlled values, and passes:

```text
npm test
npm run typecheck
npm run lint
```

## Checkpoint 3: Guided improvement

The server preserves existing links and categories, prevents canonical URL duplicates, uses a temporary file followed by rename, and exposes `list_learning_links`. Tests cover malformed URLs, HTML escaping, duplicates, existing data, categories, and write failures.

## Checkpoint 4: Trust and review

The `learning-curator` agent has proposed links, the student has explicitly approved a local write, the HTML has been manually imported into a browser, and a read-only code-quality review has been completed.
