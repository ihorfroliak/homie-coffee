# 01 — Assumptions, Open Questions and Decisions

**Status:** Commercial Feasibility Gate 0 in progress. Market research is running; no market claim
is a fact until it appears in `sources.md` with a link, a publication date and an access date.

**Owner of every decision below:** Ihor (product owner).
**Maintained by:** Claude Code. Codex must not resolve an open question by implementing one side
of it — see `AGENTS.md`.

**Last updated:** 2026-08-20, branch `claude/commercial-feasibility-gate-0`.

---

## How to read this file

| Tag | Meaning |
|---|---|
| **FACT** | Verified in this repository, in a sibling repository, or against a cited source with a date. |
| **ASSUMPTION** | A working placeholder so work can continue. Never becomes a fact by repetition. Carries an ID. |
| **INFERENCE** | A conclusion drawn from facts/assumptions. Traceable to what it came from. |
| **PRIOR** | A hypothesis from general knowledge, not yet sourced. Verify or drop. |
| **⚠ DECISION NEEDED** | Blocks work. Ihor resolves. |
| **REJECTED** | An assumption that was proposed and explicitly struck out. Kept visible so it cannot creep back. |

---

## Verified facts about the starting position

| # | Fact | Evidence |
|---|---|---|
| F1 | Local project folder was empty — no files, no Git, no framework. | `ls -laR`, 2026-08-20 |
| F2 | Remote `github.com/ihorfroliak/homie-coffee` existed and was empty (0 refs, publicly readable). | `git ls-remote` exit 0, no output |
| F3 | No `gh` CLI on PATH, but the system Git config carries the `manager` credential helper with working GitHub credentials — this environment can push to `origin`. It has **no** GitHub API token, so it cannot open a pull request programmatically. | `git config --show-origin --get-all credential.helper`; `git push` exit 0; `gh` not found |
| F4 | Homie Coffee is already declared part of a brand family. `homie-english/README.md`: "Part of the **Homie** ecosystem (Coffee, HeyHomie, Homies, Homie English)." | file read, 2026-08-20 |
| F5 | Sibling folder `homie-sports` was created at the same time as this one and is also empty. | directory listing |
| F6 | The house stack in the most recent sibling product (`homie-english`) is Next.js 15 App Router + TypeScript strict + Tailwind + Prisma + Vitest, on Node 24 / npm 11. | `homie-english/package.json`, `node -v` |
| F7 | HeyHomie is a Polish cleaning marketplace (heyhomie.io), Kraków-first, local-SEO-driven, pay-after-service, competing with CleanWhale. It has B2C customers and an office-cleaning B2B angle. | `heyhomie-shared/PRODUCT.md` |
| F8 | The HeyHomie brand canon (colour, type, spacing, radii) is recorded and decided in `heyhomie-shared/BRAND.md`. | `heyhomie-shared/BRAND.md` |
| F9 | A working multi-agent coordination protocol already exists in this ecosystem — `heyhomie-shared`. Proven template, not a theory. | `heyhomie-shared/` |
| F10 | Local folder name (`homies-coffee`) does not match the remote repository name (`homie-coffee`) or the sibling convention (`homie-english`, `homie-sports`). | directory listing vs remote |
| **F11** | **Potential operating company: Omnomnom sp. z o.o.** | Ihor, 2026-08-20 |
| **F12** | **That company is not a VAT payer from 1 January 2026.** Consequences for B2B selling are a Gate 0 research item, not yet resolved. | Ihor, 2026-08-20 |
| **F13** | **Existing tooling in the owner's hands: Fakturownia (invoicing) and Stripe (payments).** Inputs to the technology decision, not automatically the chosen stack. | Ihor, 2026-08-20 |

---

## Working directions set by the product owner (2026-08-20)

These supersede the first-pass assumptions. They are **directions for modelling**, not committed
decisions, except where marked.

### A1 — Supply model *(revised)*
- No own roastery at MVP. No importing green coffee at MVP.
- **Compare** Polish contract roasting / private label **against** resale of an existing roaster's product.
- Prefer: low MOQ, low inventory risk, ability to use Homie Coffee packaging.
- Dropshipping may be evaluated but is **not** assumed preferred.
- Find real Polish suppliers and publicly available commercial conditions. Where price or MOQ is not
  public, record it as **missing evidence** and prepare an outreach template.
- **No supplier may be contacted without Ihor's approval.** Not in this phase.

### A2 — Capital and advertising budget *(REJECTED and replaced)*
- ~~40–60k PLN capital, 4–6k PLN/month marketing~~ — **REJECTED 2026-08-20. No such investment has
  been approved and the figure had no basis. It must not reappear in any document or calculation.**
- Feasibility modelling uses three **explicitly hypothetical** launch budgets, which are **scenario
  ceilings, not committed budgets**:

  | Scenario | Ceiling |
  |---|---|
  | Lean validation | **2,000 PLN** |
  | Controlled pilot | **5,000 PLN** |
  | Expanded pilot | **10,000 PLN** |

- **No significant advertising expenditure may be recommended** until product margin, delivery cost,
  repeat-purchase assumptions and break-even CAC are calculated.

### A3 — Relationship with HeyHomie *(revised)*
- Homie Coffee is part of the Homie brand family.
- Potential operating company: **Omnomnom sp. z o.o.** (F11).
- Homie Coffee must have **separate positioning, domain, analytics and financial reporting**.
- **HeyHomie customer data must not be reused for coffee marketing** until the legal basis and
  consent requirements are verified.
- Existing HeyHomie business relationships may be evaluated as a warm B2B channel **only where
  legally permitted**.
- **Correction accepted:** the phrase "zero CAC" for the warm channel was wrong and is withdrawn. A
  warm channel still costs sales labour, samples, discounts, delivery and account management. Every
  model must cost those explicitly. See `05-business-model-and-unit-economics.md`.

### A4 — Launch model *(revised — no B2C-first assumption)*
Five paths to be compared on merit, not assumed:

1. B2C web store first.
2. Warm B2B pilot first.
3. B2C validation plus a small B2B pilot.
4. B2B service including machines and maintenance.
5. Beans-only supply to businesses that already own equipment.

**Ihor's current preferred hypothesis** — B2C validation + small Kraków B2B pilot, beans-only,
targeting businesses that already own machines, no machine leasing/installation/maintenance at MVP.
**Claude Code's instruction is to challenge this hypothesis, not to confirm it.**

### A5 — Geography
- B2C: delivery across Poland.
- B2B pilot: Kraków and nearby municipalities.
- EU expansion: **not** part of MVP.

### A6 — Existing assets
Until verified, assume **none** of these is secured: Homie Coffee trademark · suitable domain ·
supplier · packaging · product photography · food-business registrations · fulfilment process.
**Trademark, domain and regulatory verification must precede material brand expenditure.**

### A7 — Founder capacity
Part-time founder, limited operational capacity. The model must minimise: manual packing ·
customer support load · individual B2C exceptions · complicated inventory · separate mobile
releases · manual invoice reconciliation. Any design requiring a full-time founder must say so
explicitly and loudly.

### A8 — Positioning
Test **accessible speciality** as the initial positioning.
**Do not assume that selling single 250 g bags through paid acquisition is viable.**
Model these order shapes: 250 g · 500 g · 1 kg · two-bag bundle · three-bag bundle ·
sample/discovery set · typical B2B monthly order. Derive the **minimum viable AOV** and the
**free-delivery threshold** rather than picking them.

### A9 — Subscription *(downgraded from "core bet")*
A technically automated subscription is **not** an MVP requirement. Validate first: reorder
frequency · subscription interest · preferred interval · willingness to prepay · cancellation
expectations. MVP may carry a **waitlist, a reorder reminder, or a manually managed pilot**. A full
recurring-payment engine is a later phase unless evidence justifies it.

### A10 — Company, invoicing and payments
- Potential operator: Omnomnom sp. z o.o.
- **Not a VAT payer from 1 January 2026** (F12).
- Existing tools: Fakturownia, Stripe (F13) — inputs, not the decided stack.
- **B2B initially on prepayment.** No deferred payment terms before credit risk and collection
  processes are defined.
- KSeF, VAT, food-sales and invoicing implications to be verified against authoritative Polish
  sources, separating verified fact from matters needing an accountant or lawyer.

### A11 — Language
Polish primary, English second.

### A12 — Roles
Codex implements; Claude Code specifies and reviews. Unchanged.

---

## Decision register

| ID | Decision | Status | Owner | Notes |
|---|---|---|---|---|
| D-001 | Canonical location of all work | **DECIDED 2026-08-20** | Ihor | `github.com/ihorfroliak/homie-coffee` |
| D-002 | Claude Code ↔ Codex automatic interaction | **DECIDED 2026-08-20** | Ihor | Design in `17-agent-interop.md`. **Automation layer is NOT to be built yet** — see D-013. |
| D-003 | Positioning | ⚠ open | Ihor | Gate 0 tests accessible speciality; approval comes after Gate 0 |
| D-004 | Business model | ⚠ open | Ihor | Blocked on Gate 0 unit economics |
| D-005 | MVP scope | ⚠ open | Ihor | Blocked on D-003, D-004 |
| D-006 | Technology choice | ⚠ open | Ihor | **Deferred out of Gate 0.** Not to be decided or designed now. |
| D-007 | Google Ads measurement model | ⚠ open | Ihor | Deferred out of Gate 0 |
| D-008 | Roadmap and phase gates | ⚠ open | Ihor | Deferred out of Gate 0 |
| D-009 | Native mobile application at launch | **Claude Code recommends: no** | Ihor | Argument deferred to the specification phase; recorded so it is not silently dropped |
| D-010 | Rename local folder to `homie-coffee` | ⚠ open, cosmetic | Ihor | F10 |
| **D-011** | **Repository setup, no-production-code rule, decision register, Claude ↔ Codex responsibility split** | **APPROVED 2026-08-20** | Ihor | |
| **D-012** | **Scope limited to Commercial Feasibility Gate 0** — no full research plan, no product spec, no technical architecture, no SEO roadmap, no ad implementation, no production code | **DECIDED 2026-08-20** | Ihor | |
| **D-013** | **No GitHub Actions, secrets, API keys, production infrastructure, application scaffolding or external accounts** | **DECIDED 2026-08-20** | Ihor | Gate 0 must prove the economics before any credential exists |
| **D-014** | **Work proceeds on branch `claude/commercial-feasibility-gate-0` via pull request. No direct commits to `main`. Claude Code must not merge.** | **DECIDED 2026-08-20** | Ihor | |
| **D-015** | **No supplier, roaster or business may be contacted without Ihor's explicit approval** | **DECIDED 2026-08-20** | Ihor | Outreach templates may be drafted, not sent |

---

## Open questions carried into Gate 0

Ihor's directions answered most of the original ten. What remains genuinely open, and what Gate 0
is trying to answer with evidence rather than opinion:

| # | Question | Why it is still open |
|---|---|---|
| OQ-1 | Contract roasting/private label, or resale — which is actually available to a business with no volume history? | Depends on real Polish supplier MOQs, most of which are not published |
| OQ-2 | Is a beans-only B2B offer credible in Poland, or is free-machine-for-volume the default that must be beaten? | The central B2B question; being researched now |
| OQ-3 | What are the consequences of **not** being a VAT payer when selling to businesses? | Potentially decisive for the whole B2B path (F12) |
| OQ-4 | Is KSeF in scope for a non-VAT-payer right now? | Potential hard blocker for B2B invoicing |
| OQ-5 | Who carries EUDR, sanepid and labelling responsibility under each supply model? | Changes which supply model is even legal for a part-time founder |
| OQ-6 | What is the market's actual free-delivery threshold, and what AOV does it force? | Determines whether any paid acquisition can work |
| OQ-7 | Is "Homie" available as a trademark in class 30? | Must be answered before brand spend |

---

## What has explicitly NOT been done

- No supplier, roaster or business has been contacted, and none will be without approval (D-015).
- No GitHub Actions, secrets, keys, infrastructure, external accounts or application scaffolding
  (D-013).
- No production code, no framework, no dependencies, no database.
- No technology chosen; the technology decision is deferred out of Gate 0 entirely.
- No landing page created.
- No merge to `main`, and none will be performed by Claude Code (D-014).
