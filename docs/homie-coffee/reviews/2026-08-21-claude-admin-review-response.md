# Claude Code review — `codex/admin-dashboard-design-system`

**Date:** 2026-08-21 · **Base:** `claude/commercial-feasibility-gate-0` (`906ddeb`) · **Head:** `36a78b7`
**Mode:** review / reconciliation only. No merge, no deploy, no implementation.
**Reviewer:** Claude Code. Findings are for Ihor to accept or reject.

---

## Verdict

**Request changes. 2 × P0, 4 × P1.**

Codex's audit is correct on its central point and I accept it without reservation: my B2B/VAT
conclusion was not supported. The gate Codex added to the model is good engineering and should stay.

But the withdrawal is **incomplete in the documents** and the **arithmetic error is deeper than
Codex diagnosed** — and it runs in the opposite direction to what everyone has assumed. Both are P0.

Nothing in this branch touches Gitea pricing logic. Checked: no pricing source-of-truth from the
professional developer's lineage is read, copied or modified here. That constraint is clear.

---

# P0

## P0-1 — The withdrawn VAT conclusion is still the headline of five documents

**Files.** `00-executive-summary.md:21,26,27,29` · `01-…decisions.md:46,187` ·
`05-…unit-economics.md:223,224,228` · `14-…legal-risks.md:23,24,25` ·
`18-commercial-feasibility-gate.md:19,35,42,43,45` · `PULL_REQUEST.md:16,24,30,31,33`

**Evidence.** Codex's audit withdraws four claims; `HANDOFF.md:13` records the withdrawal;
`b2bAccount()` now refuses to compute. Yet `grep` finds `−60.50`, `+220`, `18.7%` and
"free, reversible" alive in every document above. `18-…gate.md:19` still states B2B is
"✅ **viable at the verified worst-case cost**", and `00-executive-summary.md` still opens with the
comparison table.

**Consequence.** The repository now asserts two contradictory things at once, and the contradiction
falls the wrong way: the model — which no decision-maker reads — is honest, while the executive
summary and the gate — which are the only documents a decision-maker reads — carry the unsupported
claim. `AGENTS.md` requires that every external claim be sourced and that unsourced claims be
labelled unverified. This currently fails that rule in the two most load-bearing files.

**Fix.** In each location, strike the number and the mechanism and replace with a withdrawal
notice pointing at `reviews/2026-08-21-codex-gate0-audit.md`. The B2B row in `18-…gate.md` becomes
**"unproven — price basis unverified"**, not "viable". `PULL_REQUEST.md` must be rewritten before
the PR is opened, or it publishes the withdrawn claim as the summary of the whole branch.

## P0-2 — The formula was wrong in both directions, and the published number is not what it was labelled

**File.** `docs/homie-coffee/model/unit-economics.mjs:151–154` (formula and its comment, still present).

**Evidence.** I re-derived the mechanism independently rather than accepting either side's account.

The withdrawn model applied an 18.7% **haircut to revenue** while leaving the coffee cost at its
**gross** 124 PLN/kg. That is a double penalty: it charges the non-VAT case for the missing
deduction twice, once on each side of the P&L.

The correct mechanism holds the **buyer-effective price** constant — what the business buyer
actually bears after their own deduction — and puts the entire effect of VAT registration on the
**cost** side, where input VAT becomes reclaimable. Revenue is unchanged, because a buyer
indifferent between two suppliers bears the same amount either way.

At *identical* inputs (10 kg/month, 150 PLN/kg buyer-effective, 124 PLN/kg gross cost,
15 PLN delivery, 0.5 h at 50 PLN/h):

| | non-VAT | VAT-registered |
|---|--:|--:|
| Withdrawn model | **−60.50** | **+220.00** |
| Correct mechanism | **+220.00** | **+454.67** |

The delta of **234.67** reconciles exactly to the reclaimable input VAT on coffee and delivery
(`124 × 10 × 0.23/1.23 + 15 × 0.23/1.23`), which is the arithmetic proof that this is the right
mechanism and the old one was not.

**Consequence — three parts, and the third is the dangerous one.**

1. **The published `+220` was mislabelled.** It is the **non-VAT baseline** under correct
   mechanics, not the VAT-registered upside.
2. **The `−60.50` endpoint never existed** under any single consistent basis.
3. **The error flattered the wrong conclusion.** It made non-VAT B2B look loss-making when, on the
   same unverified inputs, it is not. So the real headline was never "VAT registration rescues B2B";
   it was "B2B may already work, and VAT registration roughly doubles it". Both remain **unproven**,
   for the reason Codex correctly identified — but the story that was told was the wrong one.

And the reason this matters operationally: **the defective formula is still in the file.** Codex
gated the *output* but preserved the *mechanism*, together with a comment that still asserts the
incorrect rationale ("the list price must be cut to cost that buyer the same"). The moment someone
sets `taxModelStatus: "verified_v1"`, the same wrong arithmetic runs again — now with an official
"verified" label on it. Codex's third test proves only that `priceBasis` alone cannot unlock the
gate; it does not assert that what lies behind the gate is correct.

**Fix.** Do this *now*, while the gate is closed — not later, when it opens:

- delete `b2b.nonVatPayerPriceHandicap` from `params.json` entirely; it encodes the wrong model;
- add `vatRate` and `b2b.inputVatDeductible` (derived from `b2b.vatRegistered`);
- re-implement `b2bAccount()` as buyer-effective revenue with cost deductibility, per the table above;
- correct the comment at `:151–152`;
- add a test asserting `contribution(vatRegistered) − contribution(nonVat)` equals the reclaimable
  input VAT on the VAT-bearing cost lines, so the mechanism itself is pinned, not just the gate.

**I am not restoring the conclusion.** The gate stays closed until the price basis is verified. This
fixes *how* the model computes, not *whether* it may publish.

---

# P1

## P1-1 — Admin MVP is being specified for a channel whose economics are a coin flip

**Files.** `reviews/2026-08-21-admin-mvp-proposal.uk.md:245` (ADM-01) · `01-…decisions.md` D-006, D-023.

**Evidence.** ADM-01 correctly conditions the B2B pilot on "виправленого Gate 0". That correction
has not happened. Meanwhile D-006 and D-023 are approved and a Dashboard exists. The unresolved
variable is not marginal — it is binary:

| Is the 124 PLN/kg figure net or gross? | non-VAT | VAT-registered |
|---|--:|--:|
| **gross** (124.00/kg) | **+220.00** | +454.67 |
| **net** (→ 152.52/kg) | **−65.20** | +222.80 |

`SUP-05` does not say which, and Polish B2B quotes are conventionally *netto* — the less favourable
reading. One roaster quote resolves it. Note also that the *net* row lands at −65.20, within 5 PLN
of the withdrawn −60.50: the wrong formula accidentally approximated the right answer under a
different assumption, which is precisely why the error survived review the first time.

**Consequence.** The Admin is being designed for a channel that has a genuine chance of being
unprofitable. `D-019` (send the RFQ — free) and `D-018`/`D-020` (≤2,000 PLN field test) resolve it
in eight weeks.

**Fix.** Record in `01-…decisions.md` that **no production vertical slice starts until E1 returns
three roaster quotes stating net/gross explicitly.** Prototype and specification work may continue.

## P1-2 — The prototype carries a deploy path, contradicting "local, non-production"

**Files.** `prototypes/admin-dashboard/.openai/hosting.json` · `worker/index.js` ·
`scripts/prepare-sites-build.mjs` · `prototypes/admin-dashboard/AGENTS.md` (para. 4).

**Evidence.** `worker/index.js` is a Cloudflare-Workers-shaped asset handler (`env.ASSETS.fetch`).
`hosting.json` declares `{"d1": null, "r2": null}` — database and object-storage binding slots.
The prototype's own `AGENTS.md` instructs: *"Keep … intact so the same local prototype can be handed
to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`."*

D-023 approves a "local non-production prototype … no cloud spend or deploy". D-013 forbids
production infrastructure and external accounts.

**Consequence.** Nothing has been deployed and I make no accusation that it has. But the branch now
contains a build target, a hosting descriptor with datastore slots, and a written instruction to
prepare a hosting handoff — one command away from the thing D-023 excluded. Undeclared capability
is how scope decisions get overtaken by defaults.

**Fix.** Either (a) record an explicit decision permitting the Sites handoff path and stating who
may trigger it, or (b) remove `worker/`, `.openai/`, `scripts/prepare-sites-build.mjs` and the
handoff paragraph. Do not leave it undeclared. My recommendation is (b) for now — the prototype's
purpose is visual approval, which needs no hosting target.

## P1-3 — No single check command; the guard against the wrong number is unreachable

**Evidence.** No root `package.json` exists. `node --test tests/` **fails**; only the per-file form
`node --test tests/unit-economics.test.mjs` passes (verified: 3 pass, 0 fail). `npm run test:sites`
lives inside the prototype and covers only the worker.

`AGENTS.md` § "Build and test expectations" requires a single command that runs the full check suite
as part of the definition of done.

**Consequence.** The three tests that stop the withdrawn VAT conclusion from returning are not
reachable from any script. A guard nobody runs is a guard that expires quietly.

**Fix.** Add a root `package.json` with `"test": "node --test tests/unit-economics.test.mjs"`
(pin the form that works), and cite that command in `AGENTS.md`. Investigate the directory form
separately.

## P1-4 — Confirming Codex's own P1s

Both verified and both correct:

- **Parcel cost net → gross.** `params.json` 11.09 → 15.41 is right: a VAT-exempt company pays the
  gross invoice and reclaims nothing. Effect: base 1 kg contribution 14.57 → 10.25. This makes B2C
  **worse**, which strengthens rather than weakens the paid-acquisition NO-GO. Codex correctly kept
  the note that the source's own net/gross columns do not reconcile at 23% (11.09 × 1.23 = 13.64,
  not 15.41) — that discrepancy still needs an invoice to settle.
- **`HANDOFF.md` was missing.** `AGENTS.md` and `CLAUDE.md` both require it. My omission. Codex
  creating it as an append-only journal is the right fix.

---

# P2

| # | File · location | Finding | Fix |
|---|---|---|---|
| P2-1 | `01-…decisions.md` D-006 row | The row says approval "does not authorise cloud spend or production implementation". The source document (`d006-…:411`) is broader: it also excludes **external account provisioning** and **deployment**. The register is the canonical text and is narrower than its source. It also lists "Render Frankfurt" flatly, which reads as a provisioning decision. | Copy the full exclusion into the register, adding **external accounts, production database, secrets, CI, deploy**. Mark Render as *selected, not provisioned*. |
| P2-2 | `src/styles.css:19` | `--border: #e4e8ef`. The shared canon (`heyhomie-shared/BRAND.md`) is `#EDEEEF`; the prototype's **own** `AGENTS.md` also records `#EDEEEF`. Every other token matches exactly. | Set `#edeeef`, or record the deviation as a decision. Token drift inside the same branch that declares the token is the exact failure the shared brand file exists to prevent. |
| P2-3 | `src/App.jsx:151` (modal) | `role="dialog" aria-modal="true"` with **no focus trap, no Escape handler, no focus restoration**. Only `autoFocus`. Keyboard users tab straight into the page behind the modal. | Acceptable in a visual prototype **only if recorded**. Must be P0 for the production slice — add to the Admin non-functional requirements now, before it is forgotten. |
| P2-4 | `src/App.jsx:117,131` | Both menus use `role="menu"`/`role="menuitem"` with no arrow-key navigation, no Escape, no outside-click dismissal, and no `aria-haspopup`. A `role="menu"` that does not behave like a menu is worse than no role — it promises a widget contract to assistive technology and breaks it. | Drop the ARIA roles in the prototype, or implement the keyboard contract in the production component. Do not ship the half-implementation into the slice. |
| P2-5 | `src/App.jsx:48–51` | `notify()` calls `window.setTimeout` without clearing the previous timer. **Reproducible:** trigger two toasts 1 s apart — the second disappears after 2.2 s, not 3.2 s, because the first timer clears it. Also leaks on unmount. | Store the timer id and `clearTimeout` before setting a new one; clear on unmount. |
| P2-6 | `src/App.jsx:110` | The "Typ" column is an icon inside `<span title={meta.label}>`. `title` on a non-interactive span is not reliably announced; the column reads as empty to a screen reader. | Add visually-hidden text alongside the icon. Same for `<th aria-label="Akcje" />`. |
| P2-7 | `src/App.jsx:84,86,119` | Counts are invented and mutually inconsistent: the queue badge and "Zobacz wszystkie" both use `rows.length + 21` (21 phantom rows); the KPI strip says 7 orders to confirm while the table holds 4; "5 · 31 560 zł" is hardcoded in two places. | Prototype-acceptable, but derived numbers must be **computed** in the slice. Flagging because hardcoded aggregates are the classic source of production reporting bugs. |
| P2-8 | `src/App.jsx:57–60` | The prototype invents an order-reference format: `` `ZAM-B2B-2026-${String(820 + nextId).padStart(4,'0')}` ``. Reference generation is domain logic — uniqueness, sequence, year rollover, gaps after failure. | Delete or clearly comment as throwaway. Invented identifier schemes get copied into production verbatim. |
| P2-9 | `src/App.jsx:88` | The KPI strip contains "Składka na FUNDACJĘ · NIEOPŁACONA · Termin minął 07.08.2026". No foundation contribution appears in ADM-01–ADM-08, D-023, or any Gate 0 document. It appears to be carried over from the visual reference. | Justify against a decision or remove. Unexplained domain concepts in an approved mock become requirements by inertia. |
| P2-10 | `prototypes/admin-dashboard/package.json` | The prototype is a **Vite + React SPA**; D-006 approves a **Next.js modular monolith**. Legitimate for a visual prototype, but currently undeclared. | State in the prototype README/AGENTS that the stack is deliberately throwaway and shares no code path with D-006. |
| P2-11 | `src/App.jsx` throughout | All copy is Polish, hardcoded inline in JSX. A11 requires Polish primary **and** English. | Note as a known prototype limitation. Retrofitting i18n across inline JSX is expensive — the slice should start with the seam in place. |
| P2-12 | `vite.config.mjs:11` | `server.host: "0.0.0.0"` binds the dev server to every interface, exposing the prototype to the whole local network. | `127.0.0.1` unless remote preview is genuinely needed. |
| P2-13 | `unit-economics.mjs:191–192` | `CPA_PMAX = 69.30`, `CPA_SEARCH = 86.46` hardcoded, while the model claims every input carries `src`. **Codex's finding — confirmed.** | Move into `params.json` with `src: "BM-18"`. |
| P2-14 | `prototypes/admin-dashboard/AGENTS.md` | Instructs agents to record durable decisions in `AGENTS.md`. The repository protocol (`17-agent-interop.md` §2, root `AGENTS.md`) puts decisions in the register in `01-…decisions.md`, and makes root `AGENTS.md` Claude-owned. | Point the nested file at the decision register. Two decision homes means neither is authoritative. |

---

# P3

| # | Finding | Note |
|---|---|---|
| P3-1 | `sources.md` claims mechanical generation, but neither the raw research records nor the generator are in the branch. **Codex's finding — confirmed.** The records exist only in a session scratchpad. | Commit the raw records and the generator, or soften the claim. Currently unreproducible. Codex's manually added TECH-01…12 are well-sourced and correctly flagged as manual. |
| P3-2 | Mock companies ("Café Nova Sp. z o.o.", "Good Coffee Warszawa", "Bistro Poranek"…) read as invented, and the prototype makes **zero network calls** — verified clean, no production or customer data. | Worth one check that none matches a real business named in the B2B research, since real Kraków prospects were catalogued. |
| P3-3 | The whole UI is one 159-line `App.jsx` with two small components. Sidebar, topbar, KPI strip, table, rail, modal and toast are inline; UI-ephemeral state and domain `rows` share one component. | Fine for a visual prototype. Stated so nobody treats it as a head start on production components — it is not. |
| P3-4 | `node --test tests/` (directory form) fails while the per-file form passes. | Cosmetic, but pin the working form in the root script. |

---

## Confirmed · disputed · still open

**Confirmed — Codex was right.** Incompatible VAT bases (P0). Parcel cost must be gross. The
documents contradicted the model. `HANDOFF.md` was missing. CPA constants hardcoded. `sources.md`
generation unreproducible. Every one of these is a defect in my Gate 0 work, and the gate Codex
added to `b2bAccount()` should stay in place permanently.

**Disputed — two points, both narrow.**

1. Codex withdraws *"B2B is viable at the verified worst-case cost"* as unsupported. Correct to
   withdraw, but the reason matters: under correct mechanics that claim may well be **true**
   (+220 PLN/month if 124 is gross). It should be recorded as **unproven**, not as **false**.
   Filing it under "false" risks discarding a live hypothesis on the strength of a bad formula.
2. Codex withdraws *"VAT registration is free and reversible"*. Agreed on "free and reversible" —
   return to exemption is time-restricted and active status carries ongoing JPK_V7 and earlier KSeF
   obligations. But the **direction** survives untouched: registration converts input VAT into a
   deduction, which is mechanically certain and which Codex's own citations support. **D-016 should
   remain recommended**, with its justification and magnitude restated, not deleted.

**Still open.**

| | |
|---|---|
| Blocking the production slice | **D-003** positioning · **D-004** business model · **D-005** MVP scope · **D-008** roadmap — all Ihor, all still ⚠ open |
| Blocking the B2B economics | Net/gross basis of `SUP-05` (124 PLN/kg) and `B2B-14` (150 PLN/kg) — closed by **D-019**, free |
| Blocking brand spend | **D-021** trademark, still unverified (EUIPO 403, TMview reset) |
| Needs a professional | **D-016** VAT registration and **D-022** — accountant; HeyHomie cross-marketing basis — lawyer |
| Not yet decided | **D-017** (invert to B2B-first) is *not* recorded as approved — correct, and it must not drift into being assumed by the Admin work |

**One conclusion that survives everything and got stronger:** paid-acquisition B2C remains NO-GO.
It never depended on the VAT model, and the parcel-cost correction (14.57 → 10.25 on a 1 kg order)
widens the gap against a 69.30 PLN median CPA.

## Safe next step

1. Fix the formula while the gate is closed (P0-2) — the highest-value hour available.
2. Strike the withdrawn claims from the five documents and `PULL_REQUEST.md` (P0-1) before any PR opens.
3. Send the RFQ (**D-019**, free) — it resolves the binary in P1-1.
4. Trademark search (**D-021**, free).
5. Accountant on **D-016**.
6. **No production vertical slice until 3 and 5 return.**

---

## Proposed first production vertical slice — *for approval, not for implementation*

**Slice A — Product and batch registry with append-only audit.**

Chosen on one principle: **it is the only slice that is correct under both outcomes of the
unresolved economics.** It contains no price field and no VAT logic — precisely the areas that are
unverified — yet it is required regardless of channel, because packaged food needs lot traceability
(REG-16 labelling) and EUDR requires retaining the upstream DDS reference for five years (REG-20).
If B2B fails the field test, none of this work is wasted.

**Scope.** Owner authentication (single user, ADM-03) with mandatory TOTP · product CRUD · batch/lot
records with roast date and best-before (ADM-05) · stock movements · append-only audit trail.

**Explicitly excluded.** Any field that stores a price, in any entity. VAT of any kind. Customers,
leads, orders. Stripe and Fakturownia (ADM-07 already says no). Any deploy.

**Invariants** — each one a test, not a comment:

1. Stock is **derived** from the sum of movements; no mutable balance column exists.
2. Derived stock for a batch may never be negative.
3. `bestBefore > roastDate` on every batch.
4. Every mutation writes exactly **one** audit event **inside the same transaction** — a rolled-back
   mutation leaves no audit row, and an audit failure rolls back the mutation.
5. The audit table rejects `UPDATE` and `DELETE` at database level, not application level.
6. Product SKU is unique.
7. No authenticated session, no mutation — enforced server-side, not by hiding UI.

**Migrations.** `001_users_sessions` · `002_products` · `003_batches` · `004_stock_movements` ·
`005_audit_events` (with the append-only trigger and the revoke).

**Audit events.** `product.created` · `product.updated` · `batch.created` · `batch.adjusted` ·
`stock.movement.recorded` · `auth.login.succeeded` · `auth.login.failed` · `auth.totp.enrolled`.
Payload redacts secrets, session tokens and personal data (`d006-…:305`).

**Test matrix.**

| Layer | Tool | Must prove |
|---|---|---|
| Unit | Vitest | invariants 1–3, 6 |
| Integration | Testcontainers, **real** PostgreSQL | invariant 4 under rollback; invariant 5 by attempting an UPDATE and asserting rejection; concurrent movements under Serializable |
| E2E | Playwright | owner logs in with TOTP → creates product → creates batch → records movement → sees the audit entry |
| Negative | both | unauthenticated mutation rejected; audit tamper rejected; negative stock rejected; duplicate SKU rejected |

**Acceptance.** All of the above green, run by one root command; every invariant has a test that
fails when the invariant is removed; no price or VAT field appears anywhere in the schema; the
Playwright run leaves a complete audit trail of everything it did.

**Not started, and must not start** until D-003, D-004, D-005, D-008 close and Ihor gives explicit
implementation approval.
