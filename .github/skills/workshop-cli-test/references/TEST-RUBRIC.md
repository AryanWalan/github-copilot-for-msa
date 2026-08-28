# Workshop Test Rubric

Apply this rubric to every participant instruction, prompt, checkpoint, and
recovery path. Record evidence at the moment it occurs.

## Status

| Status | Meaning |
| --- | --- |
| Pass | Executed as written and produced the stated, observable result. |
| Concern | Completed, but caused avoidable ambiguity, friction, or guesswork. |
| Fail | Did not produce the required result or violated a stated boundary. |
| Blocked | Could not execute because a prerequisite or external dependency failed. |
| Not exercised | Reviewed but not executed; never count this as a pass. |
| Manual verification required | Requires a human-only action outside the permitted harness. |

## Quality Dimensions

Evaluate all dimensions independently. A functionally successful instruction can
still fail clarity or knowledge-assumption criteria.

| Dimension | Pass criteria | Failure signals |
| --- | --- | --- |
| Functional validity | Commands, files, prompts, and transitions work as stated. | Wrong path, invalid command, missing file, contradictory state, or unverifiable expected result. |
| Clarity | A first-time participant can identify the next action and success state. | Ambiguous actor, location, sequence, approval, client, or completion signal. |
| Knowledge independence | All information needed at that point has been introduced. | Requires later content, facilitator knowledge, unstated product knowledge, or guessing. |
| Reliability | Repeated runs reach materially equivalent checkpoints. | Prompt sensitivity, unstable tool choice, unexplained divergence, or no recovery route. |
| Safety and boundaries | Read, write, command, network, and browser boundaries are explicit and enforceable. | Premature edits, unsafe approvals, secrets exposure, user-level configuration, or browser-profile mutation. |
| Recovery | Failure instructions diagnose, repair, verify, and return to the main flow. | Generic retry, destructive workaround, omitted success criterion, or dead end. |

## Finding Severity

| Severity | Use when |
| --- | --- |
| Critical | The workshop risks credentials, destructive changes, unsafe writes, or an uncontrolled security boundary. |
| High | A core exercise cannot complete, its central premise is false, or required validation can be bypassed. |
| Medium | A participant needs undocumented knowledge, encounters a contradictory instruction, or lacks a reliable recovery path. |
| Low | The issue causes localized friction or imprecision without changing the outcome. |

## Evidence Rules

For every finding, record:

1. Run ID and workshop step.
2. The exact instruction, prompt, command, or checkpoint.
3. Expected observable behavior.
4. Actual observable behavior and relevant output.
5. Origin: workshop defect, model variability, environment failure, or harness accommodation.
6. Impact on a first-time participant.
7. The smallest proposed correction, without applying it.

Do not treat a correct model guess as evidence that the workshop supplied enough
information. Do not treat an external outage as a workshop defect when the
prerequisite and recovery are accurate. Do report missing prerequisite guidance
or unusable recovery instructions as workshop defects.

## Reliability Comparison

Compare independent runs by checkpoint rather than exact wording. Materially
equivalent responses may use different prose. Record divergence when runs differ
in any of these outcomes:

- Tool or file boundary compliance.
- Number and coverage of clarification questions.
- Central assumption challenged.
- Planned files, security controls, tests, and validation commands.
- Project creation success and required command results.
- MCP server discovery and write-approval behavior.
- Review findings and final acceptance coverage.

Two passes provide evidence of repeatability, not a statistical guarantee. State
that limit in the report.