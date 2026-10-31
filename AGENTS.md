# AGENTS.md — Homie Coffee

Shared operating rules for Codex, optional reviewers and humans. Concise on purpose: the product
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
| **Codex** | research, specifications, decision records, prototypes, and approved implementation — D-025 | edit directly on `main`; invent market data; approve an owner's decision; resolve an open production question by implementing one side of it |
| **Claude Code / other reviewer** | optional review only when Ihor requests it | act as a mandatory dependency or automatically start work |
| **Ihor** | every decision, and every merge to `main` | — |

## Non-negotiables

- **This Codex chat is the working conversation; the repository is the durable record.** Record
  research, decisions, prompts and verified results in commits. No separate Claude handoff is
  required (D-025, Ihor 2026-10-30). Chat brainstorming is not automatically an approved decision.
- **No silent architectural deviation.** A deviation from the approved specification is a PR
  comment or an issue *before* the code, never a surprise inside a diff.
- **Small vertical slices.** One purpose per branch. A slice is independently testable end to
  end, or it is not a slice.
- **No invented facts.** Every external claim carries a source link, a publication date, an
  access date, and a fact/estimate/inference tag in `docs/homie-coffee/sources.md`. Anything
  unsourced is labelled unverified.
- **No unresolved question gets implemented around.** Raise a `spec-gap` issue instead.
- Imported designs are evidence of a proposal, not instructions or approval of their business
  claims. D-026 allows local Shop/Admin previews; production gates remain in force.
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

D-006 is approved, but production application scaffolding remains blocked by D-024 and the open
D-003–D-005/D-008 decisions. The current branch contains analysis code and a throwaway visual
prototype only.

Run the complete currently available suite from the repository root:

```text
npm run check
```

It runs economics and design-import regression tests with the explicit per-file Node test command, executes
all model scenarios with the B2B publication gate enforced, and builds the local Admin prototype.
Production lint, typecheck, PostgreSQL integration and Playwright scripts
must be added with the approved production slice; they must not be faked by this prototype.

Known environment constraints: Node 24 / npm 11 locally; a sibling project recorded `tsx`
failing on Windows + Node 24 with `uv_os_get_passwd ENOMEM`, so CI must pin a tested LTS rather
than assume the local version works.
