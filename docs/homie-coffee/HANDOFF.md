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
