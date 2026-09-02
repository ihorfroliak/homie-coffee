# Homie Coffee context migration from the HeyHomie task

**Migration date:** 2026-09-02

## Purpose

Homie Coffee work was accidentally continued inside the Codex task titled
`🏢 HeyHomie — платформа та репозиторії`. This manifest separates the two products without making
chat memory the source of truth.

- The original task remains intact under HeyHomie and preserves the visible conversation.
- The Homie Coffee repository preserves exact code, documents, decisions, reviews and verification
  results in Git.
- A separate Codex task was created in the saved local project `Homie Coffee`, starting from
  `codex/admin-dashboard-design-system`.
- New HeyHomie work must not modify this repository unless the user explicitly reopens Homie Coffee
  scope.

## What can and cannot be archived

| Material | Preservation method |
|---|---|
| User prompts and visible assistant answers | Preserved verbatim in the original Codex task. This manifest provides a chronological index, not a lossy replacement. |
| Code and file changes | Preserved exactly by Git commits and the remote branch. |
| Decisions, assumptions, blockers and test evidence | Preserved in canonical repository documents listed below. |
| Claude/Codex review exchange | Preserved as dated files in `docs/homie-coffee/reviews/` and append-only `HANDOFF.md`. |
| Hidden model chain-of-thought | Not exportable and not treated as project evidence. Only conclusions, formulas, sources, commands and verification results belong in the repository. |
| Ephemeral terminal/browser output | Important results are recorded in `HANDOFF.md` and review responses; disposable runtime detail is not a project dependency. |

## Chronological prompt index

This is the boundary map for the mixed task. It intentionally summarises visible prompts; the
original task is retained for their full wording.

| Order | User intent | Product | Durable result |
|---:|---|---|---|
| 1 | Deeply inspect all supplied folders and learn the existing product before development | HeyHomie | HeyHomie analysis remained in the original task and `heyhomie-shared`; it is not copied into this repository. |
| 2 | Build a shared control plane for Codex and Claude; treat Gitea pricing as authoritative and fit GitHub work to it | HeyHomie | `heyhomie-shared` workflow; separate from Homie Coffee. |
| 3 | Prepare prompts and a Telegram explanation for the professional Gitea developer | HeyHomie | Communication material remained in the original task. |
| 4 | Continue Claude's `homie-coffee-gate0-research-v2` work after session limits | Homie Coffee | Claude Gate 0 branch ending at `906ddeb`; evidence, model and documents committed. |
| 5 | Start Codex work and decide what follows: frontend, design, products, database, Admin | Homie Coffee | Independent Gate 0 audit `1873f66`; Admin MVP and D-006 proposals `48b1406`, `53564fd`. |
| 6 | Start with Admin and compare three real technology architectures | Homie Coffee | D-006 architecture proposal and canonical approval. |
| 7 | Approve D-006, build the design system continuously, select design Option 1 | Homie Coffee | Local-only Admin prototype `b55f04b`; QA and handoff `e60b564`. |
| 8 | Hand branch `codex/admin-dashboard-design-system` to Claude Code | Homie Coffee | Review request `36a78b7`; Claude findings `28a0f81`. |
| 9 | Apply Claude's verdict: 2 P0, 4 P1, 14 P2, 4 P3 | Homie Coffee | Fixes `68554f1`; handoff `2f95272`; reproducible root workspace `8523246`; final handoff `d6e1789`. |
| 10 | Archive and move all Homie Coffee context out of HeyHomie | Both | This manifest plus the dedicated Homie Coffee Codex task. |

## Canonical reading order in the Homie Coffee task

1. `AGENTS.md`
2. `CLAUDE.md`
3. `docs/homie-coffee/HANDOFF.md`
4. `docs/homie-coffee/01-assumptions-questions-decisions.md`
5. `docs/homie-coffee/00-executive-summary.md`
6. `docs/homie-coffee/18-commercial-feasibility-gate.md`
7. `docs/homie-coffee/reviews/2026-08-21-claude-admin-review-response.md`
8. `docs/homie-coffee/reviews/2026-08-22-codex-claude-review-fixes-response.md`
9. `docs/homie-coffee/reviews/2026-08-22-claude-rereview-request.uk.md`
10. Git log from `cc82666` through current HEAD.

## Current truth at migration

- Remote branch: `origin/codex/admin-dashboard-design-system`.
- Remote head before this migration document: `d6e1789`.
- Paid-acquisition B2C: **NO-GO under current assumptions**.
- B2B and Gate 0: **UNRESOLVED**.
- D-024 blocks production until at least three roaster quotes state net/gross explicitly, an
  accountant reviews the VAT position, and D-003–D-005/D-008 are approved.
- D-006 is approved as a technology selection, but no production stack, account, database, secret,
  CI, infrastructure or deployment has been created.
- The Admin Dashboard is a local mock-data Vite/React visual prototype, deliberately throwaway.
- No supplier, accountant or trademark contact is authorised by this migration.

## Verification entry point

From a fresh checkout:

```text
npm ci --ignore-scripts --no-audit --no-fund
npm run check
```

Expected current suite: five unit-economics tests, all B2B model rows explicitly unresolved, and a
successful Admin prototype build.

## Separation rule from now on

- Continue Homie Coffee only in its dedicated Codex task and repository.
- Continue HeyHomie in the original task and use `heyhomie-shared` for GitHub ↔ Gitea / Codex ↔
  Claude coordination.
- Cross-product reuse must be an explicit proposal; do not silently copy pricing, customer data,
  authentication, business assumptions or deployment choices between HeyHomie and Homie Coffee.
