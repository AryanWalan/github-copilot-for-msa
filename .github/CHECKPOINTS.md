# Workshop Checkpoints

Use these checkpoints to resume the lab without skipping the engineering loop.

## Checkpoint 1: Context and plan

You have given Copilot the incomplete creation request without repository context or tool use, identified its assumptions, added Microsoft Learn and Context7, created a scoped TypeScript instruction, answered five clarification questions, challenged an assumption, and reviewed a plan with built-in `/rubber-duck`. Don't approve creation until the plan names files and validation commands.

## Checkpoint 2: Copilot creation

Your Copilot coding agent has created `samples/developer-workbench-mcp` from the specification and approved plan. The server exposes `add_learning_links` and `list_learning_links`, enforces the fixed output and security boundaries, and passes:

```text
npm test
npm run typecheck
npm run lint
```

After validation passed, Copilot added local server configuration only for the assigned primary client. Both tools are visible there.

## Checkpoint 3: Reusable validation

The created server preserves existing links and categories, prevents canonical URL duplicates, and writes atomically. Tests cover malformed URLs, HTML escaping, duplicates, existing data, categories, and write failures. You created and invoked the read-only `developer-workbench-validation` Skill against the project.

## Checkpoint 4: Trust and review

You created the `learning-curator` agent, it proposed links, and you explicitly approved one local write. The generated HTML is ready for manual browser import. Built-in `/review` and `/security-review`, plus two independent read-only workers, produced a synthesized report.
