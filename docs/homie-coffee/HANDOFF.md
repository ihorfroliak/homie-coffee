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

## 2026-08-22 — Codex resolves Claude review findings

- **Branch:** `codex/admin-dashboard-design-system`.
- **Implementation commit:** `68554f1` (`fix(review): resolve Claude Gate 0 and Admin findings`).
- **Review response:** `reviews/2026-08-22-codex-claude-review-fixes-response.md`.
- **Disposition:** all 2 P0, 4 P1, 14 P2 and 4 P3 findings accepted and addressed; ready for
  Claude Code re-review, not merge.
- **Commercial truth:** paid-acquisition B2C remains NO-GO; B2B and Gate 0 remain unresolved. The
  corrected VAT mechanism holds buyer-effective revenue constant and changes only deductible
  VAT-bearing input costs, while the permanent publication gate blocks all B2B results pending
  compatible quote bases and accountant review.
- **Production gate:** D-024 blocks any production vertical slice until ≥3 roaster quotes state
  net/gross explicitly, an accountant reviews the VAT position, and D-003–D-005/D-008 are approved.
- **Admin prototype:** unsupported Foundation KPI removed; all data explicitly demo; modal focus
  trap/Escape/focus restoration fixed; toast lifetime fixed; false menu roles removed; brand border
  token aligned. Sites/worker hosting capability was deleted and Vite binds to `127.0.0.1` only.
- **Verification:** `npm run check` — 5 tests passed, all B2B scenarios unresolved, Vite build
  passed; contradiction scans clean on live decision surfaces; `git diff --check` passed. Browser
  smoke passed modal/form, two-direction focus wrap, Escape restoration, filter/menu, replacement
  toast lifetime and 1280 px overflow checks; console warnings/errors 0/0.
- **Not done:** no supplier/trademark/accountant contact, spend, external account, production DB,
  secret, CI, deploy, merge or production implementation.
- **Next owner:** Claude Code independently re-reviews `68554f1` using the checklist in the review
  response. Claude must not restore B2B numbers, merge or start a production slice during review.

### Fresh-checkout follow-up

- **Commit:** `8523246` adds the Admin prototype as a root npm workspace, so root `npm ci` installs
  every dependency needed by `npm run check` on a fresh clone.
- **Claude prompt:** `reviews/2026-08-22-claude-rereview-request.uk.md`; review range is
  `28a0f81..HEAD` and therefore includes both the implementation and reproducibility follow-up.

## 2026-09-02 — Context separated from HeyHomie

- Homie Coffee work had been performed inside a Codex task belonging to the HeyHomie project.
- `CONTEXT-MIGRATION-2026-09-02.md` now records the boundary, chronological prompt index, exact Git
  lineage, canonical reading order, current blockers and verification entry point.
- A dedicated Codex task was created under the saved local project `Homie Coffee`, starting from
  `codex/admin-dashboard-design-system` with instructions to verify state before further work.
- The original HeyHomie task remains intact as the verbatim visible-conversation archive. Hidden
  chain-of-thought is not exportable and is not a project source of truth.
- **Verification:** `git diff --check` passed. `npm run check` was not rerun because this migration
  changes documentation only and no executable input.
- No product logic, model result, decision, external contact, merge or deployment changed during
  this migration.

## 2026-10-30 — Codex continuation baseline verification

- **Branch:** `codex/admin-dashboard-design-system`.
- **Verified source SHA:** `28f41a64b6053252df0739d73cbc7436861f4d6d`, identical locally and on
  `origin/codex/admin-dashboard-design-system` after `git fetch origin`.
- **Scope / acceptance:** read the owner's continuation request and canonical documents, verify
  the remote state and clean dependency installation, run the existing suite, report discrepancies
  and propose two possible next steps. This is not Claude's independent re-review.
- **Files changed:** only this append-only journal entry. The commit containing this entry is
  discoverable with `git log -1 --format=%H -- docs/homie-coffee/HANDOFF.md` at this handoff.
- **Repository result:** no branch, source or decision-state divergence from the supplied prompt.
  Before this entry, `git status --short --branch` printed only
  `## codex/admin-dashboard-design-system...origin/codex/admin-dashboard-design-system`;
  `git rev-list --left-right --count HEAD...origin/codex/admin-dashboard-design-system` printed
  `0 0`. The requested history inspection printed all 19 commits, ending at `28f41a6`.
- **Environment discrepancy:** the first sandboxed `git fetch origin` failed with
  `error: cannot open '.git/FETCH_HEAD': Permission denied`; its approved retry outside the
  sandbox exited 0 with no output. The first sandboxed npm install exited 1 with
  `npm error Exit handler never called!`; the approved retry below succeeded. The evidence does
  not establish the underlying npm failure cause. No project fix was required.
- **Environment:** `node --version` printed `v24.14.0`; `npm --version` printed `11.9.0`.
- **Commands / actual output:**
  - `npm ci --ignore-scripts --no-audit --no-fund` (approved retry): exit 0,
    `added 68 packages in 26s`.
  - `npm run check`: exit 0. Node test runner printed `tests 5`, `pass 5`, `fail 0`,
    `cancelled 0`, `skipped 0`, `todo 0`. All 18 B2B rows across six scenarios printed
    `unresolved` in every result column. Vite printed `vite v6.4.2 building for production...`,
    `4570 modules transformed.` and `built in 14.10s`. This is the local prototype bundle.
  - `git diff --check 28a0f81..HEAD` and `git diff --check` before this entry: exit 0, no output.
- **Source inspection:** row menu and filter remain inline in `App.jsx`; Escape closes them,
  but there are no outside-click handlers, popup focus management, arrow/Home/End handlers or
  viewport collision handling. Polish strings remain inline. CSS positions the row menu below
  its trigger inside the scrolling table. These match the prompt's known limitations; browser
  behavior was not re-tested in this task. The local `worker/` and `scripts/` folders are empty
  and were left untouched. No tracked hosting descriptor, worker, build adapter or CI file was
  found in the inspected paths; Vite remains bound to `127.0.0.1`.
- **Commercial / production state:** paid-acquisition B2C remains NO-GO under current
  assumptions; B2B and Gate 0 remain unresolved. D-024 requires at least three explicit-basis
  roaster quotes, accountant-reviewed VAT and approval of D-003–D-005/D-008 before production.
  Root `AGENTS.md` also requires approval of D-007. D-006/D-023 are approved; Slice A is proposed.
  The tracked review files still contain the re-review request, without a subsequent Claude
  re-review verdict.
- **Next-step proposals — neither started nor approved by this entry:**
  - **A — prototype polish:** first complete row menu/filter behavior with one declared widget
    pattern, focus restoration, outside-click and viewport handling; then add the PL/EN seam
    and decompose the UI in separate reviewable changes. Keep actions demonstrational. Verify
    keyboard/pointer flows, edge-of-table placement, translations and the existing root suite.
  - **B — Admin component/state specification (recommended):** prepare a review proposal covering
    component boundaries, state transitions, focus/keyboard behavior, popup placement, demo-action
    limits, PL/EN keys and acceptance checks. Mark unresolved domain decisions explicitly;
    Claude owns canonical specification review. It can guide subsequent prototype work.
- **Not done:** no prototype, model or canonical specification changes; no new implementation,
  browser smoke, production lint/typecheck, PostgreSQL integration or Playwright run. Those
  production tools are not part of the current suite. No supplier/accountant/lawyer contact,
  accounts, secrets, spend, infrastructure, CI, merge or deployment.
- **Next owner / action:** Ihor chooses A or B; Claude's independent re-review remains pending.
  Codex can perform the selected local prototype work or prepare the selected specification
  proposal while D-024 remains closed. The owner requested this journal-only commit to be
  pushed to the existing branch; no merge is authorised.
