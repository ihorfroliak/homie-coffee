# 17 — Claude Code ↔ Codex interoperability

**Decision D-002 (Ihor, 2026-08-20):** everything lives in
`github.com/ihorfroliak/homie-coffee`, and the two agents must interact automatically — when
one produces a change, the other reacts.

This document is the design. It is written before the product specification on purpose: the
coordination layer has to exist before there is anything to coordinate, and the same pattern
already works in the sibling project `heyhomie-shared` (F9).

**Status:** Layer 1 is implementable immediately and needs nothing from anyone. Layers 2 and 3
need credentials and app installations only Ihor can provision — listed in
[§6 What Ihor must provision](#6-what-ihor-must-provision).

---

## 1. The rule that makes automation possible

> **The repository is the only channel. If it did not happen in a commit, it did not happen.**

Neither agent may hold state in a chat window, a local scratch folder, or an unpushed branch.
Every fact, decision, question, review finding and piece of code is a file in this repository,
on GitHub. This is what makes "the other one reacts" mechanically possible rather than a matter
of somebody remembering to paste something.

The same rule with the same wording is enforced in `heyhomie-shared/AGENTS.md`, where it has
already survived a multi-repository, multi-agent, several-month project.

## 2. Ownership — who may write what

Automatic reaction only works if the two agents cannot silently overwrite each other. Ownership
is by directory, and it is strict.

| Path | Owner | The other agent may… |
|---|---|---|
| `docs/homie-coffee/**` | **Claude Code** — specification, research, decisions, reviews | …open a PR proposing a change, and raise an issue when the spec is ambiguous, contradictory or unimplementable. Never edit directly on `main`. |
| `AGENTS.md`, `README.md` | **Claude Code** | …propose via PR |
| application source, tests, CI, migrations, infrastructure | **Codex** — implementation | Claude Code reviews and comments; it does **not** rewrite Codex's implementation unless explicitly asked |
| `docs/homie-coffee/HANDOFF.md` | **both — append only** | append a dated entry; never edit or delete another agent's entry |

Rationale: the user brief (§1) assigns implementation to Codex and specification/review to
Claude Code. Directory ownership turns that division into something a CI job can check, instead
of a convention that erodes.

## 3. The reaction matrix

This is the actual answer to "when changes appear, the other reacts". Six triggers, each with a
defined reactor and a defined output.

| # | Trigger | Reactor | Required reaction | Output |
|---|---|---|---|---|
| T1 | Codex opens a PR touching implementation | Claude Code | Review the diff against the approved specification: does it implement the slice as specified, are the acceptance criteria met, are the analytics events and SEO requirements present, are there silent architectural deviations? | Review comment on the PR + a `HANDOFF.md` entry |
| T2 | Claude Code merges a change under `docs/homie-coffee/**` | Codex | Read the diff. If it changes a slice that is already implemented, open an issue or PR bringing the code back in line. If it changes an unimplemented slice, acknowledge in the tracking issue. | Issue or PR, labelled `spec-change` |
| T3 | Codex finds the specification ambiguous, contradictory or unimplementable | Claude Code | Do **not** guess. Raise it as an issue labelled `spec-gap`; Claude Code either resolves it in the spec or escalates it to Ihor as a `⚠ DECISION NEEDED` entry in doc 01. | Spec update or a new open question |
| T4 | CI fails on `main` | whichever agent owns the failing path | Fix forward or revert; never leave `main` red | Commit + `HANDOFF.md` entry |
| T5 | Ihor answers an open question or takes a decision | Claude Code | Update doc 01 (assumption → fact, decision status), then propagate to every document that derived a number from that assumption | Spec commit listing the affected documents |
| T6 | A review finding is raised on a PR | Codex | Fix valid findings; for a finding it disagrees with, reply with the reason instead of silently ignoring it | Commit or a reasoned reply |

**Anti-loop guardrails.** T1 and T2 can ping-pong. Three limits:
1. Automation ignores events whose actor is a bot, so a bot commit cannot trigger the bot again.
2. Maximum two automated review rounds per PR; the third round requires a human.
3. Only Ihor merges to `main`. Agents propose; a human integrates. This mirrors the
   `heyhomie-shared` rule that only the owner decides integration.

## 4. Three layers, deployable independently

### Layer 1 — conventions in the repository (works today, zero infrastructure)

- `AGENTS.md` at the root: both agents read it at task start. Codex reads `AGENTS.md` natively;
  Claude Code is pointed at it by `CLAUDE.md`, which just says "follow `AGENTS.md`".
- `docs/homie-coffee/HANDOFF.md`: an append-only ledger. Every substantial task ends with an
  entry — commit SHA, files changed, commands run **with their actual output**, what was not
  done and why, next owner, next action. Copied from the template that already works in
  `heyhomie-shared/docs/templates/HANDOFF_ENTRY.md`.
- `docs/homie-coffee/01-assumptions-questions-decisions.md`: the single decision register.
- Conventional commits with a slice tag, e.g. `feat(slice-03-basket): …`, so a reader can map
  any commit to the specification.

This layer already gives "the other reacts": an agent that starts a task reads `HANDOFF.md` and
the last commits and sees exactly what changed and what it owes.

### Layer 2 — GitHub automation (the actual "automatic")

Two independent halves; either can be installed without the other.

**Half A — Claude reacts to Codex.** The Claude GitHub App plus a workflow in
`.github/workflows/` that runs on `pull_request` and on `issue_comment` containing `@claude`.
On a PR it posts a specification-conformance review. Needs `ANTHROPIC_API_KEY` as a repository
secret.

**Half B — Codex reacts to Claude.** Codex's GitHub integration connected to this repository, so
it can be assigned issues and can review PRs. A workflow triggered by `push` to `main` with
`paths: ['docs/homie-coffee/**']` opens or updates an issue labelled `spec-change` listing the
changed documents and the affected slices — the queue Codex picks work from.

Plus a cheap, provider-independent guard that costs nothing to run:

**Half C — an ownership check.** A workflow on every PR that fails if a PR authored by the
implementation side modifies `docs/homie-coffee/**`, or vice versa, without the label
`cross-boundary-approved`. This enforces §2 mechanically rather than by trust.

> The exact action names, versions and trigger syntax will be verified against current official
> GitHub and Anthropic documentation before any workflow file is written. Nothing in this
> section is implemented yet, and none of it should be transcribed from memory.

### Layer 3 — scheduled reconciliation (optional, later)

A scheduled job that answers one question: *does the implementation still match the
specification?* It re-reads the acceptance criteria of every implemented slice, checks them
against the code and the tests, and opens an issue when they have drifted. Worth adding only
once there are enough slices for drift to be plausible.

## 5. Where this repository's structure comes from

`heyhomie-shared` is the proof that this pattern holds up: authority documents, executable
contract fixtures, ADRs, a handoff ledger, and `npm test` as the single command that says
whether the coordination layer is still true. Homie Coffee reuses the shape, with one
improvement — here the specification and the implementation live in the *same* repository, so
the cross-repository drift that `heyhomie-shared` exists to manage cannot arise in the first
place.

The one mechanism worth copying exactly: **executable contracts.** In `heyhomie-shared` the
pricing rules are not only prose — they are JSON fixtures with a test that fails when code and
document disagree. Homie Coffee should do the same for the things that will actually hurt if
they drift: price and discount calculation, B2B tier pricing, shipping thresholds, VAT, and the
analytics event taxonomy. A specification that can fail a test is worth more than a
specification that can only be read.

## 6. What Ihor must provision

Claude Code cannot do any of these; each needs an account, a credential or an installation.

| # | Item | Needed for | Notes |
|---|---|---|---|
| P1 | ~~Push access from this environment~~ | — | **Resolved 2026-08-20.** The system Git credential manager already holds working GitHub credentials; `git push -u origin main` succeeded. No `gh` CLI, so issue/PR automation still needs either `gh` installed or the GitHub API via token. |
| P2 | Claude GitHub App installed on the repository | Layer 2, Half A | |
| P3 | `ANTHROPIC_API_KEY` repository secret | Layer 2, Half A | Never committed to the repository, in any form. |
| P4 | Codex connected to the repository | Layer 2, Half B | |
| P5 | Branch protection on `main` | the anti-loop guardrail and "only a human merges" | Require PR, require the ownership check to pass. |
| P6 | Decision on billing exposure | both halves | Automated review on every PR consumes API credit on every push. Set a cap deliberately rather than discovering it. |

## 7. Open questions on this document

- **AI-1** — Should Codex work on branches in this repository, or in forks? Branches are simpler;
  forks are safer if the automation ever runs untrusted code. Recommendation: branches, given a
  single trusted operator.
- **AI-2** — Automated review on *every* PR, or only when a PR carries a label? Every PR gives
  tighter control and higher cost. Recommendation: every PR while the codebase is small, revisit
  at ~50 PRs.
- **AI-3** — Should the specification be frozen per-slice (each slice's acceptance criteria
  immutable once Codex starts on it) or live? Recommendation: frozen per-slice, because a
  specification that shifts under an in-flight implementation destroys the meaning of a review.
