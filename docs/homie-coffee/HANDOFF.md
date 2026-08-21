# Homie Coffee handoff journal

Append-only coordination record for Claude Code, Codex and Ihor.

## 2026-08-21 — Codex independent Gate 0 model audit

- **Branch:** `codex/gate0-model-audit`, based on Claude commit `906ddeb`.
- **Status:** review work; not merged, not pushed, not deployed.
- **Scope:** reproduce Gate 0 calculations and test load-bearing VAT/B2B assumptions.
- **Confirmed:** the model runs deterministically; paid-B2C remains unattractive.
- **Critical finding:** the VAT comparison mixes price bases and does not account for output
  VAT and deductible input VAT consistently. `B2B-14` does not state whether 150 PLN/kg is
  net or gross. Therefore `-60.50 → +220 PLN/month`, D-016's quantified benefit, and the
  “B2B viable at worst-case cost” conclusion are not currently proven.
- **Confirmed cost defect:** `COST-09` was stored as 11.09 PLN netto even though the current
  VAT-exempt company pays the displayed 15.41 PLN brutto. Correcting it reduces the base
  1 kg B2C contribution from 14.57 to 10.25 PLN; the paid-B2C NO-GO direction is unchanged.
- **Safety change:** B2B results now remain unresolved until an explicit price basis is supplied.
- **Tests run:** `node --test tests/unit-economics.test.mjs` — 3 passed, 0 failed;
  `node docs/homie-coffee/model/unit-economics.mjs --all` — exit 0, all B2B rows explicitly
  unresolved; `git diff --check` — exit 0.
- **Not done:** no product code, supplier contact, spend, VAT registration, merge, push or deploy.
- **Next owner:** Claude Code should correct docs 00/01/05/14/18 and the PR body so VAT/B2B is
  an accountant- and quote-gated hypothesis rather than the decisive Gate 0 result.

## 2026-08-21 — Codex Admin MVP proposal

- **Branch:** `codex/admin-mvp-spec-proposal`, based on Codex audit commit `1873f66`.
- **Status:** unapproved proposal; specification only; not pushed, merged or deployed.
- **Scope:** define the minimum back-office capabilities, workflows, state machines, logical data
  model, security constraints and first vertical slice for a controlled pilot.
- **Key boundary:** no technology selected and no production implementation started because
  D-003–D-008 remain open.
- **Artifact:** `reviews/2026-08-21-admin-mvp-proposal.uk.md`.
- **Not done:** no framework, database, UI code, infrastructure, external account or integration.
- **Next owner:** Ihor decides ADM-01–ADM-08; Claude then promotes approved decisions into the
  canonical specification; Codex implements only the approved first slice.

## 2026-08-21 — Codex D-006 Admin technology proposal

- **Branch:** `codex/admin-mvp-spec-proposal`.
- **Status:** recommendation only; not approved, provisioned, pushed, merged or deployed.
- **Compared:** Next.js modular monolith; Next.js + Supabase; split Next.js + NestJS API.
- **Recommendation:** Node 24 LTS, Next.js/TypeScript modular monolith, PostgreSQL 18, Prisma,
  Better Auth core with owner TOTP, Render Frankfurt, transactional append-only Postgres audit,
  Vitest + Testcontainers + Playwright.
- **Evidence:** 12 primary-source claims appended as `TECH-01`–`TECH-12` in `sources.md`; all
  accessed 2026-08-21. Architecture scores are explicit Codex inferences.
- **Artifact:** `reviews/2026-08-21-d006-admin-technology-proposal.uk.md`.
- **Not done:** no dependencies, scaffold, CI, cloud accounts, secrets, spend or production code.
- **Next owner:** Ihor approves/rejects the proposed D-006 text; Claude promotes it to canonical
  doc 01 and reconciles source generation; Codex then prepares the Admin design system proposal.

## 2026-08-21 — D-006 approved; Admin design system and Dashboard prototype

- **Branch:** `codex/admin-dashboard-design-system`.
- **Implementation commit:** `b55f04b`.
- **Decision state:** Ihor approved D-006. Canonical doc 01 now records the approved modular
  monolith stack. D-023 separately authorises this local, non-production Admin prototype.
- **Selected direction:** visual Option 1 — dark operational sidebar, compact KPI strip, action
  queue as the primary surface and urgent-exceptions right rail, using shared HeyHomie tokens.
- **Prototype:** `prototypes/admin-dashboard/`; React/Vite mock-data surface only. It includes
  functional navigation feedback, filters, row actions and create-B2B-order dialog.
- **Design QA:** `prototypes/admin-dashboard/design-qa.md`; combined reference/implementation
  evidence in `design-qa-comparison.png`; final result passed.
- **Verification:** `npm run build` — passed; `npm run test:sites` — 4 passed, 0 failed;
  `git diff --check` — passed; browser core flow — passed; console errors/warnings — 0/0.
- **Not done:** no production backend, PostgreSQL, Prisma, Better Auth, real pricing, real orders,
  Stripe/Fakturownia connection, cloud resource, deployment, push or merge.
- **Next owner:** Claude Code reviews commit `b55f04b`, reconciles canonical decisions with its Gate
  documents, and returns concrete findings. Production implementation stays gated by D-003–D-005
  and D-008; the next safe Codex slice is the Admin component/state specification.

## 2026-08-21 — GitHub handoff to Claude Code

- **Remote branch:** `origin/codex/admin-dashboard-design-system` — pushed successfully.
- **Review base:** `claude/commercial-feasibility-gate-0` so the review diff contains only the
  Codex audit, Admin proposals, approved D-006/D-023 and Dashboard prototype.
- **Review request:** `reviews/2026-08-21-claude-admin-review-request.uk.md`.
- **PR state:** branch is ready; GitHub App could not create the draft PR because the installation
  returned HTTP 403. No token or stored credential was extracted or exposed.
- **Next owner:** Ihor or Claude Code opens the prepared compare link, then Claude performs the
  requested review. Merge and deployment remain prohibited until the review and gate decisions.

## 2026-08-21 — Claude Code review of `codex/admin-dashboard-design-system`

- **Reviewed:** base `claude/commercial-feasibility-gate-0` (`906ddeb`) → head `36a78b7`.
- **Output:** `reviews/2026-08-21-claude-admin-review-response.md`. Verdict **request changes**:
  2 x P0, 4 x P1, 14 x P2, 4 x P3.
- **Codex's audit accepted.** Its central finding — that the B2B/VAT comparison mixed incompatible
  price bases — is correct, and the `taxModelStatus`/`priceBasis` gate it added to `b2bAccount()`
  should stay permanently.
- **P0-1:** the withdrawal is incomplete. `-60.50`, `+220`, `18.7%` and "free, reversible" are still
  live in docs 00, 01, 05, 14, 18 and `PULL_REQUEST.md`, so the repository contradicts itself and
  the contradiction falls the wrong way — the model is honest, the executive summary is not.
- **P0-2:** the formula was wrong in a way the audit did not identify. It applied an 18.7% haircut
  to revenue AND kept costs gross — a double penalty on the non-VAT case. Re-derived independently
  in `model/vat-mechanism-check.mjs`: at identical inputs the correct mechanism gives non-VAT
  **+220.00** and VAT-registered **+454.67**, the delta reconciling exactly to reclaimable input VAT
  (234.67). The published `+220` was therefore the NON-VAT baseline, mislabelled as the
  VAT-registered upside; `-60.50` never existed under any consistent basis. The defective formula
  and its incorrect comment remain in the file behind Codex's gate, so setting
  `taxModelStatus: "verified_v1"` would re-run the wrong arithmetic under a "verified" label.
- **Conclusion NOT restored.** The gate stays closed. Only the mechanism is challenged, not the
  embargo.
- **Commands run:** `node --test tests/unit-economics.test.mjs` — 3 passed, 0 failed.
  `node --test tests/` — **fails** (directory form); only the per-file form works, and no root
  `package.json` exists, so the guard is not reachable from any script.
  `node docs/homie-coffee/model/vat-mechanism-check.mjs` — re-derivation above.
  `grep` for withdrawn claims — 23 live occurrences across 6 files.
- **Not done:** no file outside `reviews/`, `HANDOFF.md` and `model/vat-mechanism-check.mjs` was
  modified. The P0/P1/P2 fixes are proposed, not applied — they touch Codex-owned and
  decision-register content and need Ihor's acceptance first. No merge, no deploy, no PR opened.
- **Next owner:** Ihor — accept or reject the findings, then D-019 (free RFQ) and D-021 (free
  trademark search), which together resolve the binary blocking the Admin work.
- **Next action:** fix the formula while the gate is closed; strike the withdrawn claims before any
  PR is opened.
