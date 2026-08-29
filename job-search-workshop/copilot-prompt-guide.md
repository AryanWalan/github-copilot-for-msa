# Copilot prompt guide

Use short prompts that give Copilot the information it cannot infer. A useful prompt usually contains:

- **Goal:** what you need to decide or change.
- **Constraints:** boundaries that affect the answer.
- **Evidence:** the error, file, diff, or command output that matters.
- **Output:** the format or next action you expect.

Omit greetings, politeness filler, repeated repository context, and instructions Copilot can discover from the workspace. Ask for the smallest useful next step. Keep credentials and personal data out of prompts.

## Understand the repository

```text
Inspect this repository. Explain the application flow, key components, instructions, scripts, tests, and current gaps. Cite relevant files.
```

## Find improvement opportunities

```text
Inspect the application and suggest ten high-value improvements, ranked by user impact, reliability, effort, and workshop suitability.
```

```text
Review the current UI for usability, accessibility, responsiveness, and missing workflows. Suggest the three highest-value improvements.
```

## Evaluate and reduce scope

```text
Review this feature idea. Identify assumptions, risks, edge cases, duplication, and a smaller viable alternative.
```

```text
Challenge this proposal against the application specification. Recommend what to keep, remove, or defer for a small reliable change.
```

## Check for conflicts

```text
Search the repository, Issues, and pull requests for related functionality or duplicate work. Summarize conflicts and recommend a distinct scope.
```

## Plan and create an Issue

```text
Create a small implementation plan for this approved idea. Name affected files, behavior, tests, documentation, risks, and validation commands. Do not edit files.
```

```text
Draft a concise GitHub Issue from this idea. Include the problem, proposed outcome, scope, non-goals, acceptance criteria, and test notes.
```

## Get unstuck

```text
Inspect the current repository state, identify the next concrete step, and explain why it is the best next step.
```

```text
I am stuck. Diagnose this exact error using the current code and output. Propose the smallest repair and the check that will confirm it.

<error or command output>
```

## Implement safely

```text
Implement only the approved Issue scope. First list the files you need to change and the behavior for each. Work incrementally and stop after the smallest testable change.
```

```text
Review the proposed change against repository instructions and the Issue. Identify any unnecessary files, behavior, dependencies, or permissions before editing.
```

## Diagnose and repair

```text
Diagnose this failed check. Identify the root cause, make the smallest focused repair, and rerun the same check before broader work.

<command and actual output>
```

```text
Review this failure for a flaky test, timing issue, unbounded input, missing error path, or dependency on a live website. Recommend a deterministic fix.
```

## Improve reliability and simplicity

```text
Review this code for timeouts, retries, rate limits, partial failures, stale data, duplicate data, unbounded input, and unsafe output. Recommend only material fixes.
```

```text
Reduce unnecessary complexity and token use in this change. Preserve behavior, tests, readability, and the Issue acceptance criteria. Show the smallest useful diff.
```

## Validate and prepare a pull request

```text
Validate this change against the Issue acceptance criteria. List missing tests, documentation, edge cases, and the exact checks still required.
```

```text
Prepare a concise pull request title and summary from the current diff. Include tests run with actual results, design decisions, limitations, and follow-up work.
```

```text
Review this final diff for correctness, reliability, unnecessary complexity, security, accessibility, test coverage, and token efficiency. Recommend only changes that materially improve it.
```

## Fallback prompts

```text
Inspect this repository and explain how the application works. Then suggest ten high-value improvements, ordered by impact and effort.
```

```text
Review this feature idea. Identify assumptions, risks, edge cases, likely duplication, and a smaller viable alternative.
```

```text
I am stuck. Inspect the current repository state, identify the next concrete step, and explain why it is the best next step.
```

```text
Review the current UI for usability, accessibility, responsiveness, and missing workflows. Suggest the three highest-value improvements.
```

```text
Review this change for correctness, reliability, unnecessary complexity, test coverage, and token efficiency. Recommend only changes that materially improve it.
```

## Related workshop assets

- [Application specification](application-specification.md)
- [Student contribution checklist](student-contribution-checklist.md)
