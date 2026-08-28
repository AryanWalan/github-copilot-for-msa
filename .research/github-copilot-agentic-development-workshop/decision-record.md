# Workshop Research Decision Record

## Decision

**Decision: Rebuild this repository around a 60-minute, facilitated local TypeScript MCP workshop that exports categorized developer-learning bookmarks. Keep VS Code Insiders and Copilot CLI as equivalent documented tracks, assign one primary track per cohort, and have students create the target project once.**

Students use a GitHub Copilot coding agent in VS Code Insiders or Copilot CLI to create `samples/developer-workbench-mcp` during the lab. The resulting local, secret-free MCP server validates approved HTTPS learning links and writes a Netscape HTML bookmark export to a fixed repository path. The exercise demonstrates context, clarification, an assumption challenge, plan review, incremental creation, focused validation, explicit MCP write approval, and read-only quality review.

Students bring capable laptops with both clients installed and use personal forks or local clones. Students without working day-of access pair with an enabled student. Every shell command and file write is explicitly approved. Students create a scoped instruction, the `developer-workbench-validation` Skill, and the `learning-curator` custom agent; built-in `/rubber-duck`, `/review`, and `/security-review` remain general workflows. The skill and agent are intentionally absent from the starter. GitHub Copilot App is optional self-directed exploration and has no guided workshop track.

## Evidence-Based Shortlist

| Candidate | Decision | Score | Evidence | Material gap or risk |
| --- | --- | ---: | --- | --- |
| [Awesome Copilot VS Code workshop](https://awesome-copilot.github.com/learning-hub/copilot-workshops/vscode/) plus [Tailspin Toys](https://github.com/github-samples/tailspin-toys) | Ineligible for the current cohort | Disqualified | Current GitHub-maintained VS Code exercises cover repository instructions, agent mode, MCP, custom agents, monitoring, and iteration. Tailspin Toys is an MIT-licensed template with local SQLite seed data, unit tests, Playwright E2E tests, custom agents, and Agent Skills. | The workshop explicitly requires Copilot Student, Pro, Pro+, Business, or Enterprise and access to Codespaces. Copilot Free is not an accepted prerequisite; its IDE Chat Skills exclusion conflicts with the required hands-on Agent Skills practice. |
| Purpose-built local adaptation in this repository using current official patterns | Rebuild control | 72/100 | Would maximize control over timing, tool permissions, checkpoint snapshots, and a zero-secret local route. | Recreates an already-maintained scenario, working tests, Agent Skills, custom agents, MCP lesson patterns, and recovery material. More authoring and ongoing maintenance than adaptation. |
| [Microsoft CopilotAdventures](https://github.com/microsoft/CopilotAdventures) | Supplemental only | 52/100 | Active Microsoft MIT material for Agent Mode and MCP exploration. | Not a full, deterministic, skills-first workshop with a shared tested starter and all required practices. |
| Existing Microsoft Student Accelerator workshop | Reject as a foundation | 29/100 | Retains useful context-engineering concepts and a six-step navigation shell. | Steps 2-4 rely on retired chat modes and missing prompt assets; the open-ended app build is not deterministic; the provided samples are too broad for the core lab. |

## Scoring Method

The score is out of 100 using the agreed weights. A missing reuse license, retired product behavior, non-reproducible setup, or an entitlement mismatch disqualifies a candidate regardless of total score.

| Criterion | Weight | Awesome Copilot + Tailspin Toys | Notes |
| --- | ---: | ---: | --- |
| Required concept coverage | 25 | 19 | Instructions, agents, MCP, and iteration are explicit. Tailspin Toys supplies skills, but the VS Code workshop does not teach them. Plan-to-implementation must be added or folded into the implementation checkpoint. |
| Progressive scenario pedagogy | 20 | 17 | One application evolves through a coherent filtering, test, accessibility, and review journey. |
| Two-hour feasibility | 15 | 8 | The seven-exercise workshop plus environment provisioning is too long; a reduced local path is feasible only after a timed prototype. |
| Setup and recovery reliability | 10 | 6 | Local startup and tests are deterministic, but Node 22.13+, Playwright browser installation, Copilot entitlement, and MCP trust prompts need preflight and checkpoints. |
| Recency and maintenance | 10 | 10 | Workshop source and Tailspin Toys both show meaningful updates within the previous month at review time. |
| VS Code and CLI fit | 10 | 8 | VS Code is a strong core path; the CLI skill lesson can inform a concise parity appendix, not a second workshop. |
| License and reuse clarity | 5 | 5 | Tailspin Toys is MIT licensed. Verify and preserve all required notices for any copied `awesome-copilot` material before redistribution. |
| Extensibility | 5 | 3 | The scenario has multiple agents, skills, tests, and a visible application. Its TypeScript/Astro stack may be unfamiliar to some students. |
| **Original content score** | **100** | **76** | **Disqualified by cohort entitlement mismatch** |

## Reusable Assets

- [Tailspin Toys](https://github.com/github-samples/tailspin-toys): MIT-licensed Astro 7, Tailwind CSS, Drizzle ORM, Node SQLite application with deterministic `db/games.csv` seed data. Local commands include `npm ci`, `npm run dev`, `npm run test:unit`, `npm run test:e2e`, `npm run lint`, and `npm run typecheck:all`.
- [Tailspin Toys `quality-checks` skill](https://github.com/github-samples/tailspin-toys/tree/main/.github/skills/quality-checks): an authentic, project-specific skill for validation and troubleshooting. It is a better core skill exercise than a generic prompt-file replacement.
- [Tailspin Toys custom agents](https://github.com/github-samples/tailspin-toys/tree/main/.github/agents): accessibility, SEO, and PR-readiness examples. The accessibility agent is suitable for a constrained specialist-agent exercise.
- [Awesome Copilot VS Code custom-instructions exercise](https://awesome-copilot.github.com/learning-hub/copilot-workshops/vscode/1-custom-instructions/): a clear before/after comparison for repository instructions and scoped instruction files.
- [Awesome Copilot MCP exercise](https://awesome-copilot.github.com/learning-hub/copilot-workshops/vscode/3-mcp/): trustworthy-server, configuration, approval, and browser-validation teaching patterns. The core lab should use the existing zero-secret Microsoft Learn MCP configuration for grounding and only make Playwright MCP an optional validation extension until it is rehearsed locally.
- [Awesome Copilot Agent Skills exercise](https://awesome-copilot.github.com/learning-hub/copilot-workshops/cli/5-agent-skills/): source material to adapt into VS Code. It establishes the correct model: a skill is a folder with `SKILL.md`, clear `name` and `description` frontmatter, and optional scripts or references; it is distinct from persistent instructions and specialized custom agents.

## Why It Does Not Work As Written

1. The workshop prerequisite page names only Copilot Student, Pro, Pro+, Business, and Enterprise plans. Students without one of those plans do not meet the workshop's entry requirement.
2. The core exercises depend on Copilot Chat agent mode for multi-file implementation, MCP tool use, custom-agent sessions, and agent monitoring. Copilot Free has a limited AI-credit allowance, so a two-hour workshop cannot assume sufficient quota for every student.
3. GitHub's current plan matrix marks Copilot Chat skills in IDEs as unavailable on Copilot Free. This conflicts with the workshop redesign's requirement that students create and use an Agent Skill hands-on.
4. The workshop directs every student to create a template repository and GitHub Codespace, then uses GitHub issues and pull requests. These are separate access, cost, and classroom-admin dependencies even where Copilot Free is available.
5. The workshop directs participants to select Claude Sonnet 4.5. Copilot Free uses automatic model selection only, so this reproducibility control is unavailable.

## What Can Still Be Reused

- Read and discuss the published instruction, MCP safety, custom-agent, and review patterns without asking students to execute the unsupported Copilot features.
- Use Tailspin Toys as an independently runnable MIT-licensed local starter only after verifying Node, package installation, and its test path on student machines.
- Use the existing `.github/skills` and `.github/agents` files as artifacts for code-reading or a facilitator demonstration, not as a guaranteed Copilot Free IDE execution exercise.
- Use Copilot Free's supported repository instructions, agent mode, and MCP features only after a clean-account pilot proves that each student has credits remaining and the required tools are enabled.

## Required Adaptations If Entitlement Changes

1. Require local VS Code as the canonical route. Make Codespaces, GitHub issues, push, pull requests, and Copilot CLI optional follow-up material rather than live-session dependencies.
2. Preflight Node 22.13 or later, `npm ci`, a local app launch, baseline tests, GitHub Copilot entitlement, workspace trust, and Microsoft Learn MCP availability before class.
3. Create a short VS Code Agent Skills exercise using Tailspin Toys' existing `quality-checks` skill. Students must inspect it, improve or create one small skill with a clear trigger description, and use it on a second validation task.
4. Use an intentionally weak initial request, then repeat it after adding repository instructions and compare observable behavior. Preserve the existing instruction and custom-agent distinctions.
5. Add an explicit plan-review-implement-validate checkpoint. Do not restore obsolete prompt-file or custom-chat-mode material.
6. Teach MCP as grounding and capability risk: inspect server publisher and configuration, approve only understood capabilities, keep secrets out of prompts/configuration, and verify the output against an authoritative source.
7. Replace full GitHub lifecycle automation with local source-control review and a deterministic validation command. A pull-request demonstration can be facilitator-led or optional.

## Revised Decision Rationale

`awesome-copilot` remains strong reference material, but it is not a compatible student workshop under the stated account constraint. Its VS Code track explicitly requires a plan that the students do not hold, and its separate CLI Agent Skills lesson cannot repair the mismatch because GitHub documents IDE Chat Skills as unavailable on Copilot Free.

Tailspin Toys can still reduce scenario-authoring work, but using it does not grant the required Copilot entitlement. Any replacement workshop must either narrow its assessed skills to capabilities proven available on Copilot Free or arrange eligible Copilot Student or paid seats before the event.

## Preconditions Before Implementation

- Confirm each participant's Copilot plan and remaining AI-credit allowance in VS Code. Do not treat a GitHub sign-in as proof that the required capabilities are available.
- Validate the current workspace MCP configuration in a clean VS Code profile and student-like account, including trust/approval behavior and tool visibility.
- Run the chosen local Tailspin Toys slice from a clean clone on Windows, including `npm ci`, app launch, unit tests, and the selected MCP interaction, using a Copilot Free account.
- Verify the exact reuse licenses and attribution requirements for copied material from both source repositories.
- Time the full facilitator and student paths under the actual entitlement. Stop or reduce scope if the 95th-percentile path does not fit in 115 minutes or credits expire before the final checkpoint.

## Deferred Advanced Material

- [GitHub Spec Kit](https://github.com/github/spec-kit) is a credible specification-driven development reference for the next-step comparison, but its setup and full lifecycle should not be a core dependency.
- HV Core and Squad remain unverified as public, current workshop pathways. Do not present them as recommended options until their public documentation and maintenance status are validated.