# 01 — Assumptions, Open Questions and Decisions

**Status:** Commercial Feasibility Gate 0 is **incomplete for B2B** after correction of the VAT
mechanism. Paid-acquisition B2C remains **NO-GO**; B2B is a live but unproven hypothesis — see
[`18-commercial-feasibility-gate.md`](18-commercial-feasibility-gate.md).

No market claim in this repository is a fact unless it appears in [`sources.md`](sources.md) with a
link, a publication date and an access date. 213 claims are recorded there.

**Owner of every decision below:** Ihor (product owner).
**Maintained by:** Claude Code. Codex must not resolve an open question by implementing one side
of it — see `AGENTS.md`.

**Last updated:** 2026-08-21, branch `codex/admin-dashboard-design-system`.

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
| **F12** | **That company is not a VAT payer from 1 January 2026.** The commercial magnitude of voluntary registration is unresolved: the first model mixed price bases. Registration mechanically makes eligible input VAT deductible, but B2B viability still depends on quote bases and accountant confirmation. See D-016 and OQ-3. | Ihor, 2026-08-20; model correction 2026-08-21 |
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
Superseded by D-025 on 2026-10-30: Codex handles research, specification, decision recording,
prototypes and approved development here. Claude review is optional, not a dependency.

---

## Decision register

| ID | Decision | Status | Owner | Notes |
|---|---|---|---|---|
| D-001 | Canonical location of all work | **DECIDED 2026-08-20** | Ihor | `github.com/ihorfroliak/homie-coffee` |
| D-002 | Claude Code ↔ Codex automatic interaction | **DECIDED 2026-08-20** | Ihor | Design in `17-agent-interop.md`. **Automation layer is NOT to be built yet** — see D-013. |
| D-003 | Positioning | ⚠ open | Ihor | Gate 0 tests accessible speciality; approval comes after Gate 0 |
| D-004 | Business model | ⚠ open | Ihor | Blocked on Gate 0 unit economics |
| D-005 | MVP scope | ⚠ open | Ihor | Blocked on D-003, D-004 |
| D-006 | Technology choice | **APPROVED 2026-08-21** | Ihor | Node 24 LTS; Next.js/TypeScript modular monolith; PostgreSQL 18 + Prisma; Better Auth core + mandatory owner TOTP; transactional append-only PostgreSQL audit; Vitest + Testcontainers + Playwright. Render Frankfurt is selected, **not provisioned**. Approval does not authorise cloud spend, external accounts, production database, secrets, CI, production implementation or deployment. |
| D-007 | Google Ads measurement model | ⚠ open | Ihor | Deferred out of Gate 0 |
| D-008 | Roadmap and phase gates | ⚠ open | Ihor | Deferred out of Gate 0 |
| D-009 | Native mobile application at launch | **Claude Code recommends: no** | Ihor | Argument deferred to the specification phase; recorded so it is not silently dropped |
| D-010 | Rename local folder to `homie-coffee` | ⚠ open, cosmetic | Ihor | F10 |
| **D-011** | **Repository setup, no-production-code rule, decision register, Claude ↔ Codex responsibility split** | **APPROVED 2026-08-20** | Ihor | |
| **D-012** | **Scope limited to Commercial Feasibility Gate 0** — no full research plan, no product spec, no technical architecture, no SEO roadmap, no ad implementation, no production code | **DECIDED 2026-08-20** | Ihor | |
| **D-013** | **No GitHub Actions, secrets, API keys, production infrastructure, application scaffolding or external accounts** | **DECIDED 2026-08-20** | Ihor | Gate 0 must prove the economics before any credential exists |
| **D-014** | **Work proceeds on branch `claude/commercial-feasibility-gate-0` via pull request. No direct commits to `main`. Claude Code must not merge.** | **DECIDED 2026-08-20** | Ihor | |
| **D-015** | **No supplier, roaster or business may be contacted without Ihor's explicit approval** | **DECIDED 2026-08-20** | Ihor | Outreach templates may be drafted, not sent |
| **D-016** | **Register Omnomnom sp. z o.o. for VAT voluntarily** | ⚠ **open — Claude Code recommends YES if B2B proceeds, subject to accountant** | Ihor | Registration makes eligible input VAT deductible; the magnitude and overall advisability are unproven until explicit net/gross quotes and accountant review. No claim that registration alone rescues B2B. |
| **D-017** | **Invert the launch order: B2B first, B2C second and organic** | ⚠ open | Ihor | Paid-search B2C is arithmetically unavailable. B2B remains unproven, so this order must not be assumed by Admin work. |
| **D-018** | **Authorise ≤2,000 PLN validation, none of it on advertising** | ⚠ open | Ihor | At a 69.30 PLN median CPA, 2,000 PLN buys ~29 acquisitions — useless for measuring repeat and loss-making per order. |
| **D-019** | **Approve sending the drafted RFQ to 5 named roasters** (partial lift of D-015) | ⚠ open | Ihor | Closes the single most critical gap only if every response states cost per kg **and whether it is net or gross**. No contact before explicit approval. |
| **D-020** | Approve the ~850 PLN private-label pilot batch | ⚠ open, after D-019 | Ihor | Real product for the field test. |
| **D-021** | **Trademark search on "Homie" in Nice class 30 before any brand spend** | ⚠ open | Ihor | Currently **unverified** — EUIPO returned 403, TMview reset (REG-27). A conflict affects the whole Homie ecosystem. |
| **D-022** | Confirm the accountant and lawyer to consult (VAT registration; HeyHomie cross-marketing lawful basis) | ⚠ open | Ihor | REG-10, REG-25/26. |
| **D-023** | **Create the Admin design system and first Dashboard as a local non-production prototype** | **APPROVED 2026-08-21** | Ihor | Selected visual direction: Option 1. Mock data only; no production backend, database, auth, external integrations, cloud spend or deploy. |
| **D-024** | **No production vertical slice before evidence gates close** | **DECIDED 2026-08-21** | Ihor | Requires ≥3 roaster quotes with explicit net/gross basis and an accountant-reviewed VAT position. D-003–D-005 and D-008 must also be approved. Prototype/specification work may continue; Slice A is proposed, not approved. |
| **D-025** | **One working conversation in Codex; no mandatory Claude participation** | **DECIDED 2026-10-30** | Ihor | User explicitly asked to continue research, decisions, prompts and development here. Codex may maintain research/specification on branches. Supersedes the mandatory role split in D-002/D-011 and A12; historical review requests are optional backlog. Repository records, owner decisions and owner-only merge remain. |
| **D-026** | **Preserve and integrate the supplied Shop/Admin designs in the local prototype** | **APPROVED 2026-10-30** | Ihor | User supplied ZIP and two HTML exports; permits local extraction, adaptation and continued design work, including pattern comparison with HeyHomie/Homies. No external outreach, spend, deployment, shared customer data or production launch is inferred. Source content is a proposal, not approval of subscriptions, a roastery, VAT, prices or claims. D-024 remains in force. |

---

## Open questions carried into Gate 0 — now answered

| # | Question | Gate 0 answer |
|---|---|---|
| OQ-1 | Contract roasting/private label, or resale — which is available to a business with no volume history? | **Private label, and cheaply.** Lafaye produces from 20 units per SKU, and from zero with client-supplied labels (SUP-01). Entry under ~850 PLN. **Resale is rejected** — no wholesale programme found permits relabelling (SUP-35). |
| OQ-2 | Is a beans-only B2B offer credible in Poland, or is free-machine-for-volume the default to beat? | **Free-machine-for-volume IS the default** — machines loaned against 2–4 kg/month, legally restricted to the supplier's coffee, on 12–36 month contracts (B2B-01/03/04/06). **That is the opening, not the obstacle:** the machine hides a 38–117 PLN/kg surcharge (B2B-34), and the beans-only segment is real (B2B-10/11/21). |
| OQ-3 | Consequences of **not** being a VAT payer when selling to businesses? | **Direction known, magnitude unresolved.** Voluntary registration makes eligible input VAT deductible. The previous comparison mixed price bases and is withdrawn. Requires explicit quote bases and accountant confirmation. → **D-016, D-022, D-024.** |
| OQ-4 | Is KSeF in scope for a non-VAT payer right now? | **Yes** (REG-02), from 2026-04-01 — but relief applies below 10,000 PLN/month until 2026-12-31 and penalties start 2027-01-01 (REG-03/04). **A Q4 2026 build item, not a launch blocker.** |
| OQ-5 | Who carries EUDR, sanepid and labelling responsibility under each supply model? | **Sanepid: registration only, free, 14 days' notice** (REG-12/13). **EUDR: downstream operator — no own filing, retain the supplier's DDS reference 5 years** from 2027-06-30 (REG-19/20). ⚠ Unresolved: whether in-house **repacking** triggers the approval regime — so have the roaster pack. |
| OQ-6 | What is the market's free-delivery threshold, and what AOV does it force? | **Median and modal 149 PLN**, band 129–159 (CMP-45). Forces the basket to ~1 kg or three bags. Best order shape is **3 × 250 g**, not 1 kg. |
| OQ-7 | Is "Homie" available as a trademark in class 30? | **STILL OPEN** — EUIPO 403, TMview reset (REG-27). Blocks brand spend. → **D-021.** |

### New open questions raised by Gate 0

| # | Question | Why it now matters |
|---|---|---|
| OQ-8 | What is the **real** private-label cost per kg at low volume, from ≥3 roasters, and is every quote net or gross? | Everything rests on one self-described-average public figure whose tax basis is unstated. D-019 requests permission to close it; D-024 blocks production until it is closed. |
| OQ-9 | Will Kraków machine-owning businesses actually switch supplier? | The whole B2B thesis. Only answerable by the field test. |
| OQ-10 | What B2B price is actually achievable? | 150 PLN/kg came from a trade price-ladder article, not a quote we hold; all Polish B2B pricing is gated (B2B-32). |
| OQ-11 | What is the coffee repeat-purchase rate? | Every B2C LTV figure rests on an invented 30%. **Cannot be closed without trading.** |
| OQ-12 | Should marketplaces (Allegro 5–10.5%, Amazon.pl 11%) be an acquisition channel? | Far cheaper than a 69 PLN CPA, but they cap price and take the customer relationship. Deferred to the next gate. |

## What has explicitly NOT been done

- No supplier, roaster or business has been contacted, and none will be without approval (D-015).
  The RFQ is drafted and unsent; **D-019 asks for permission to send it** to five named roasters.
- **No trademark search was completed** — EUIPO returned 403, TMview reset the connection (REG-27).
  "Homie" in Nice class 30 is **unverified**, and that blocks brand spend (D-021).
- No landing page, no waitlist, no advertising, no spend of any kind.
- No GitHub Actions, secrets, keys, infrastructure, external accounts or application scaffolding
  (D-013).
- No production application, database, authentication, cloud resources or external integrations.
- D-006 is approved. A separate local UI prototype may use dependencies, but production implementation
  remains gated by unresolved product/scope decisions and explicit implementation approval.
- The Vite prototype is deliberately throwaway and is not a code path or scaffold for the approved
  Next.js architecture. Its hosting/deploy adapter has been removed to enforce D-023.
- No landing page created.
- No merge to `main`, and none will be performed by Claude Code (D-014).
