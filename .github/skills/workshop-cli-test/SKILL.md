---
name: workshop-cli-test
description: >-
  Interactively execute this workshop from setup through completion using GitHub
  Copilot CLI, evaluating every instruction, checkpoint, and recovery path for
  functional correctness, clarity, hidden knowledge assumptions, and
  reliability. Use when testing, validating, auditing, or rehearsing the
  workshop or its Copilot CLI participant experience.
compatibility: >-
  Requires Git, Node.js 22+, an authenticated GitHub Copilot CLI, network access
  for remote MCP servers, and permission to create a temporary clone.
metadata:
  author: Daniel Scott-Raynsford
  version: "1.0"
---

# GitHub Copilot CLI Workshop Test

Run the workshop as a first-time participant in GitHub Copilot CLI. Produce an
evidence-based report that separates workshop defects, model variability,
environment failures, and test-harness limitations. Test the instructions as
written; do not silently improve a prompt or fill in missing knowledge.

## Boundaries

- Work in a fresh temporary clone. Never run the creation exercise in the source
  repository.
- Treat the workshop files in the tested snapshot as the contract. Do not use a
  completed sample, prior run, facilitator knowledge, or later step to help the
  participant early.
- Keep workshop sources read-only. Record defects and proposed corrections, but
  do not apply them.
- Use one persistent Copilot CLI conversation across Steps 2 through 4. The
  comparison between the weak request and grounded plan depends on continuity.
- Enforce every read, command, edit, and write-approval boundary. A premature
  tool call or edit is a test failure; do not approve it to keep the run moving.
- Do not modify browser profiles or automate browser import. Mark manual browser
  import as a manual checkpoint and validate only the generated file in the
  automated run.
- Redact tokens, account details, machine-specific home paths, and other secrets
  from saved evidence. Never open credential or environment-secret files.

## Select the Test Profile

Use the profile requested by the user. If none is specified, use `full`.

- `focused`: Run only named steps and their prerequisites. Use after a narrow
  documentation change.
- `full`: Run Steps 0 through 6 once, including every checkpoint. Exercise a
  recovery path when its failure occurs; otherwise inspect it and mark it `Not
  exercised`.
- `reliability`: Run two independent `full` passes from separate fresh clones.
  Compare outcomes and classify unexplained divergence as model variability or
  workshop ambiguity. Use this profile when the request mentions reliability,
  repeatability, release readiness, or facilitator readiness.

Ask before proceeding only when the requested profile, tested Git ref, report
location, or permission to incur Copilot usage cannot be derived. Default the
report root to `workshop-test-results/<UTC-run-id>/` in the source repository.

## Prepare the Run

1. Copy [assets/workshop-test-report.template.md](assets/workshop-test-report.template.md)
  and [assets/workshop-test-transcript.template.md](assets/workshop-test-transcript.template.md)
  into the report root.
2. Record the source repository, tested ref and commit, dirty-worktree state,
  profile, operating system, `copilot --version`, `git --version`, and
  `node --version`.
3. Stop with an environment finding if Git, Node.js 22+, Copilot CLI
  authentication, or required network access is unavailable. Do not report a
  workshop defect unless the workshop failed to explain that prerequisite.
4. Create each isolated clone with the platform script:

  ```powershell
  ./scripts/New-WorkshopTestEnvironment.ps1 -SourcePath <repository> -Ref <ref>
  ```

  ```bash
  ./scripts/new-workshop-test-environment.sh --source <repository> --ref <ref>
  ```

5. Record the returned clone path and commit. The scripts deliberately test a
  committed snapshot; if the source is dirty, state that uncommitted changes
  were excluded.
6. Inventory only the files and prerequisites explicitly exposed by Step 0.
  Record contradictions such as a supposedly absent target project already
  existing, but do not reveal hidden content to the participant session.

## Run the Workshop

Use [references/TEST-RUBRIC.md](references/TEST-RUBRIC.md) for every instruction,
prompt, checkpoint, and recovery path. Append evidence to the transcript as the
run proceeds; do not reconstruct it from memory at the end.

### Step 0: Test Setup and Prerequisites

1. Follow `workshop-step-0-setup-and-prerequisites.md` in order.
2. Verify each command exactly as shown and capture its actual output.
3. Assess whether a new participant is told what to install, where to run each
  command, how to authenticate, and how to recognize success.
4. Do not inspect the detailed product specification before the workshop permits
  it.

### Steps 1 Through 4: Preserve the Participant Conversation

1. Read Step 1 as participant-facing material and evaluate each learning claim
  against the later exercise. Do not use it to invent unstated commands.
2. Start Copilot CLI interactively from the clone root and confirm trust. Use the
  workshop's Plan-mode instruction. If the test terminal cannot transmit
  `Shift+Tab`, start with the currently supported `copilot --plan` option and
  record this as a test-harness accommodation; it does not validate the
  discoverability of the keyboard instruction.
3. Paste the Step 2 weak request verbatim. Do not add context, approve tools, or
  answer from repository knowledge. Capture the complete response and list its
  assumptions before reading Step 3.
4. Evaluate the Step 2 checkpoint. If Copilot attempts a tool call, deny it,
  preserve the attempt as evidence, and mark the boundary failed.
5. Follow Step 3 in the same conversation. Configure only the named repository
  MCP servers, approve only allowed read access, paste prompts verbatim, and
  answer clarification questions solely from decisions the workshop exposes.
  If a required answer is absent, record a hidden-knowledge finding instead of
  inventing it.
6. Confirm that Copilot asks exactly five questions, challenges one central
  assumption, returns a reviewable plan, and remains read-only. Run the built-in
  `/rubber-duck` command exactly as instructed.
7. Approve creation only after the Step 3 checkpoint passes. Leave Plan mode as
  instructed, paste the Step 4 creation request verbatim, inspect every tool
  request, and capture actual validation output.
8. When a check fails, use only the workshop's recovery prompt. Confirm Copilot
  repairs the same area and reruns the failed check before expanding scope.
9. Verify the created project against the specification and the Step 4
  checkpoint. Do not compare it with any pre-existing sample implementation.
10. Configure only the facilitator-assigned primary client's repository-scoped
  MCP configuration after all required checks pass. Verify that both local tools
  are discoverable.

### Step 5: Test Reuse, Tool Use, and Review Boundaries

1. Follow the workshop prompt to create the repository's
  `developer-workbench-validation` Skill. Confirm it is read-only, names the
  established checks, verifies the fixed output contract, reports actual results,
  and stops at the first discriminating failure. Invoke it and capture its report.
2. Follow the workshop prompt to create `learning-curator.agent.md`, reload
  customization, select it through `/agent`, and paste the curation prompt
  verbatim.
3. Confirm the curator inspects existing bookmarks, proposes no more than three
  grounded links, and waits for explicit approval before writing. Deny and record
  any premature write.
4. Review the candidate data, explicitly approve one valid write, and verify the
  resulting HTML without modifying a browser profile. Mark actual browser import
  `Manual verification required` unless a human performs it.
5. Run the built-in `/review` and `/security-review` commands without permitting
  edits. Use `/fleet` to create separate read-only correctness/protocol and
  security/input/file-handling tasks. Inspect their status with `/tasks`, then
  capture the parent conversation's synthesis of duplicate findings and
  disagreements.

### Step 6: Test Completion

1. Walk through every final checkpoint without crediting knowledge that appears
  only in the answer or in a later step.
2. Verify that each claimed learning outcome was practiced and evidenced.
3. Check every link and suggested extension for an explicit purpose and a safe
  transition out of the guided lab.

## Test Recovery Paths

- Exercise recovery instructions when their triggering condition occurs.
- In `reliability` profile, safely exercise at least one non-destructive recovery
  path per run when possible, such as a failed focused check in the temporary
  clone. Restore the expected state afterward.
- Review untriggered recovery text for prerequisites, exact actions, success
  criteria, and a route back to the main flow. Mark it `Not exercised`, not
  `Pass`.
- Never cause authentication, billing, credential, browser-profile, or remote
  service failures merely to test recovery.

## Classify Evidence

For each observation, record one origin and one status from the rubric:

- `Workshop defect`: The committed instructions, files, or expected behavior are
  contradictory, incomplete, unsafe, or non-functional.
- `Model variability`: The instructions are sufficient, but independent runs
  differ because the model response is non-deterministic.
- `Environment failure`: A documented external prerequisite is unavailable.
- `Harness accommodation`: The agent test tooling cannot reproduce a human UI
  action exactly.

Do not infer reliability from one successful run. In `full` profile, report
reliability as `Not established`; in `reliability` profile, compare both runs by
checkpoint and describe material differences.

## Complete the Report

1. Finish the report with per-step results, findings ordered by severity,
  recovery coverage, manual checkpoints, reliability comparison, and exact
  validation command outcomes.
2. Give every finding reproducible evidence: step, instruction or prompt,
  expected result, observed result, impact, and smallest proposed correction.
3. Confirm that no source files changed in the source repository. List changes
  inside temporary clones separately as expected workshop artifacts.
4. Retain the report and sanitized transcript. Offer to remove temporary clones,
  but do not delete evidence without approval.

## Completion Criteria

A run is complete only when:

- Every in-scope instruction and checkpoint has a recorded status.
- Every recovery path is either exercised or explicitly `Not exercised`.
- Required command output is captured rather than paraphrased as successful.
- Hidden assumptions and confusing transitions are reported even when the agent
  guessed correctly.
- Manual-only actions are visible and never represented as automated passes.
- Source workshop files remain unchanged.
- The report can distinguish workshop quality from model and environment noise.

## Example Requests

- "Run a full Copilot CLI test of the workshop at the current commit."
- "Reliability-test the workshop twice and compare checkpoint outcomes."
- "Re-test Steps 3 and 4 after the planning instructions changed."

