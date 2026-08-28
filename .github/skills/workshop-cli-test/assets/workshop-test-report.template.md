# Workshop CLI Test Report

## Run Metadata

| Field | Value |
| --- | --- |
| Run ID | `<UTC-run-id>` |
| Date | `<UTC-date>` |
| Profile | `<focused, full, or reliability>` |
| Source | `<repository>` |
| Tested ref | `<ref>` |
| Tested commit | `<commit>` |
| Source dirty | `<yes or no; dirty content is excluded>` |
| Operating system | `<name and version>` |
| Copilot CLI | `<version>` |
| Node.js | `<version>` |
| Git | `<version>` |

## Executive Result

`<Pass, Pass with concerns, Fail, or Blocked>`

`<Brief evidence-based conclusion.>`

## Step Results

| Step | Functional | Clarity | Knowledge | Safety | Recovery | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | `<status>` | `<status>` | `<status>` | `<status>` | `<status>` | `<transcript anchors>` |
| 1 | `<status>` | `<status>` | `<status>` | `<status>` | `<status>` | `<transcript anchors>` |
| 2 | `<status>` | `<status>` | `<status>` | `<status>` | `<status>` | `<transcript anchors>` |
| 3 | `<status>` | `<status>` | `<status>` | `<status>` | `<status>` | `<transcript anchors>` |
| 4 | `<status>` | `<status>` | `<status>` | `<status>` | `<status>` | `<transcript anchors>` |
| 5 | `<status>` | `<status>` | `<status>` | `<status>` | `<status>` | `<transcript anchors>` |
| 6 | `<status>` | `<status>` | `<status>` | `<status>` | `<status>` | `<transcript anchors>` |

## Findings

### `<Severity>: <Finding title>`

- Origin: `<workshop defect, model variability, environment failure, or harness accommodation>`
- Step: `<step and instruction>`
- Expected: `<observable result>`
- Observed: `<observable result and evidence anchor>`
- Impact: `<first-time participant impact>`
- Proposed correction: `<smallest report-only correction>`

## Validation Commands

| Command | Run | Exit code | Result | Evidence |
| --- | --- | --- | --- | --- |
| `npm test` | `<run ID>` | `<code>` | `<status>` | `<transcript anchor>` |
| `npm run typecheck` | `<run ID>` | `<code>` | `<status>` | `<transcript anchor>` |
| `npm run lint` | `<run ID>` | `<code>` | `<status>` | `<transcript anchor>` |

## Recovery Coverage

| Recovery path | Status | Trigger or review evidence | Returned to main flow |
| --- | --- | --- | --- |
| `<step/path>` | `<status>` | `<evidence>` | `<yes, no, or not exercised>` |

## Manual Checkpoints

| Action | Status | Reason |
| --- | --- | --- |
| Browser bookmark import | `Manual verification required` | Browser profiles and browser automation are outside the workshop test boundary. |

## Reliability Comparison

`<Not established for one run, or checkpoint comparison for independent runs.>`

## Source Integrity

- Source workshop files changed: `<no or explain blocker>`
- Temporary clone artifacts: `<paths and summary>`
- Retained evidence: `<report and transcript paths>`