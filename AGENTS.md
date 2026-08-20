# AGENTS.md — Homie Coffee

Shared operating rules for Claude Code, Codex and humans. Concise on purpose: the product
specification lives in `docs/homie-coffee/`, not here.

**Project phase: SPECIFICATION. Production implementation has not started and must not start
until Ihor approves positioning, business model, MVP scope, technology, the Google Ads
measurement model and the roadmap** (`docs/homie-coffee/01-assumptions-questions-decisions.md`,
decisions D-003 … D-008).

## Required reading before any task

1. `docs/homie-coffee/01-assumptions-questions-decisions.md` — what is fact, what is assumption, what is undecided.
2. `docs/homie-coffee/17-agent-interop.md` — who owns which directory and how the two agents react to each other.
3. `docs/homie-coffee/HANDOFF.md` — what happened last and what is owed next.
4. The specification document covering the task at hand.

Then inspect the repository and `git log`. Do not infer project state from a chat window.

## Roles

| Agent | Owns | Must not |
|---|---|---|
| **Claude Code** | `docs/homie-coffee/**`, `AGENTS.md`, `README.md` — research, specification, decisions, review | write the production implementation; choose a technology without a comparison; invent market data |
| **Codex** | application source, tests, CI, migrations, infrastructure | edit the specification directly on `main`; deviate from the approved architecture silently; resolve an open question by implementing one side of it |
| **Ihor** | every decision, and every merge to `main` | — |

## Non-negotiables

- **The repository is the only channel.** If it did not happen in a commit, it did not happen.
- **No silent architectural deviation.** A deviation from the approved specification is a PR
  comment or an issue *before* the code, never a surprise inside a diff.
- **Small vertical slices.** One purpose per branch. A slice is independently testable end to
  end, or it is not a slice.
- **No invented facts.** Every external claim carries a source link, a publication date, an
  access date, and a fact/estimate/inference tag in `docs/homie-coffee/sources.md`. Anything
  unsourced is labelled unverified.
- **No unresolved question gets implemented around.** Raise a `spec-gap` issue instead.
- **Never commit secrets** — no API keys, tokens, customer data, supplier pricing or production
  credentials, in any file, fixture, log or PR description.

## Definition of done

A change is done when all of the following are true, and the handoff says so with evidence:

1. It implements exactly one approved slice, with nothing extra.
2. Automated tests cover its acceptance criteria and pass; commands and their **actual output**
   are recorded.
3. Lint and type checks pass.
4. Analytics events specified for the slice fire with the specified payload.
5. SEO requirements specified for the slice (rendering, metadata, structured data) are met.
6. No secret, no customer data and no supplier pricing is present in the diff.
7. `docs/homie-coffee/HANDOFF.md` has a new entry: commit SHA, files changed, acceptance
   criteria, commands run and their results, what was **not** done and why, next owner, next
   action.
8. Ihor merges it. Agents propose; a human integrates.

Reporting a check as passing when it was not run is the most serious failure available to an
agent here. Say "not run", and why.

## Review priorities, in order

1. **Correctness against the approved specification** — including acceptance criteria and explicit exclusions.
2. **Money and data integrity** — price and discount calculation, VAT, B2B tier pricing, stock, payment state, invoices, refunds.
3. **Security and privacy** — authentication, authorisation, input validation, secret handling, personal data.
4. **Measurement** — analytics events and their payloads; a broken event silently corrupts every advertising decision downstream.
5. **SEO-critical rendering** — indexability, canonicals, structured data.
6. **Tests** — do they actually pin the behaviour, or only execute it?
7. **Accessibility and performance.**
8. **Simplification** — only after the above.

## Build and test expectations

**To be filled in once the technology decision (D-006) is approved.** It will define: the single
command that runs the full check suite, the required checks in CI, and the Node/package-manager
versions. Until then there is no build to run, because there is no application.

Known environment constraints: Node 24 / npm 11 locally; a sibling project recorded `tsx`
failing on Windows + Node 24 with `uv_os_get_passwd ENOMEM`, so CI must pin a tested LTS rather
than assume the local version works.
