# 01 — Assumptions, Open Questions and Decisions

**Status:** discovery. No research has been performed yet; no market claim in this repository
is sourced yet. Nothing here is a fact unless it carries a source in `sources.md`.

**Owner of every decision below:** Ihor (product owner).
**Maintained by:** Claude Code. Codex must not resolve an open question by implementing one
side of it — see `AGENTS.md`.

**Last updated:** 2026-08-20 · shared context: local repo initialised, remote
`github.com/ihorfroliak/homie-coffee` exists and is empty (0 refs, publicly readable).

---

## How to read this file

| Tag | Meaning |
|---|---|
| **FACT** | Verified in this repository, in a sibling repository, or against a cited source with a date. |
| **ASSUMPTION** | A working placeholder chosen by Claude Code so work can continue. Never becomes a fact by repetition. |
| **INFERENCE** | A conclusion drawn from facts/assumptions. Traceable to what it was drawn from. |
| **PRIOR** | A hypothesis from general knowledge, not yet sourced. Must be verified or dropped in the research phase. |
| **⚠ DECISION NEEDED** | Blocks work. Ihor resolves. |

---

## Verified facts about the starting position

| # | Fact | Evidence |
|---|---|---|
| F1 | Local project folder was empty — no files, no Git, no framework. | `ls -laR` on `C:\Users\ihorf\Projects\homies-coffee`, 2026-08-20 |
| F2 | Remote `github.com/ihorfroliak/homie-coffee` exists, is readable without auth, and has zero refs (empty repository). | `git ls-remote` exit 0, no output |
| F3 | No `gh` CLI on PATH and no Git credential helper configured — this environment cannot push to GitHub unattended. | `Get-Command gh`, `git config --global credential.helper` |
| F4 | Homie Coffee is already declared part of a brand family. `homie-english/README.md`: "Part of the **Homie** ecosystem (Coffee, HeyHomie, Homies, Homie English)." | file read, 2026-08-20 |
| F5 | Sibling folder `homie-sports` was created at the same time as this one and is also empty. | directory listing |
| F6 | The house stack in the most recent sibling product (`homie-english`) is Next.js 15 App Router + TypeScript strict + Tailwind + Prisma + Vitest, on Node 24 / npm 11. | `homie-english/package.json`, `node -v` |
| F7 | HeyHomie is a Polish cleaning marketplace (heyhomie.io), Kraków-first, local-SEO-driven, pay-after-service, competing with CleanWhale. It has B2C customers and an office-cleaning B2B angle. | `heyhomie-shared/PRODUCT.md` |
| F8 | The HeyHomie brand canon (colour, type, spacing, radii) is recorded and decided in `heyhomie-shared/BRAND.md`; heading/body font is Manrope, wordmark Montserrat. | `heyhomie-shared/BRAND.md` |
| F9 | A working multi-agent coordination protocol already exists in this ecosystem — `heyhomie-shared` (AGENTS.md, SYNC_PROTOCOL.md, HANDOFF.md, ADRs, executable contract fixtures). It is a proven template, not a theory. | `heyhomie-shared/` |
| F10 | Local folder name (`homies-coffee`) does not match the remote repository name (`homie-coffee`) or the sibling naming convention (`homie-english`, `homie-sports`). | directory listing vs remote |

---

## The 10 open questions (ranked by how much they change the plan)

Each question states what it unblocks and the assumption Claude Code will use if it is not
answered. **An unanswered question is not a blocked project — it is a labelled assumption
plus a risk.**

### Q1 — Supply model ⚠ DECISION NEEDED
Own roastery, contract/white-label roasting, wholesale purchase from an existing Polish
roaster, or dropshipping?

- **Unblocks:** COGS and therefore every margin, CAC ceiling and ROAS target in doc 05;
  minimum order quantities and working capital; lead time and the dispatch SLA shown on the
  product page; who carries EU food-labelling, EUDR and sanepid duty; how differentiated the
  product can be at all.
- **Why it is first:** no unit-economics model can be written without it, and the answer
  changes the legal chapter (doc 14) completely.
- **Fallback (A1):** contract roasting under our own label with an established Polish roaster,
  no own roastery, no green-coffee importing.

### Q2 — Capital and monthly budget ⚠ DECISION NEEDED
Total initial investment, monthly marketing budget, and runway in months.

- **Unblocks:** whether paid acquisition can be the primary channel at all, or whether the
  plan must be SEO/organic-first with paid used only for high-intent branded and bottom-funnel
  terms; the size and length of the 90-day advertising experiment; how much inventory can be
  bought; whether B2B field sales time is affordable.
- **Fallback (A2):** placeholder only — 40–60k PLN initial, 4–6k PLN/month marketing, 12-month
  runway. This is a *shape* for the model, not a recommendation, and every number derived from
  it is re-computed once the real figure is given.

### Q3 — Relationship to HeyHomie ⚠ DECISION NEEDED
Shared brand family, shared legal entity, shared customer data, or fully independent? Concretely:
may Homie Coffee market to existing HeyHomie customers and cleaning-service B2B clients?

- **Unblocks:** the only plausible zero-CAC acquisition channel in the whole plan; brand and
  domain architecture (`homiecoffee.pl` vs `heyhomie.io/coffee` vs subdomain); the GDPR lawful
  basis for contacting an existing customer base for a different product; invoicing entity.
- **Why it matters more than it looks:** in a market this crowded, a warm channel into offices
  that already buy a recurring service is a stronger differentiator than anything about the
  coffee itself.
- **Fallback (A3):** separate brand in the Homie family, separate invoicing entity, and **no**
  use of the HeyHomie customer list without fresh, product-specific consent.

### Q4 — B2B definition and priority ⚠ DECISION NEEDED
Is B2B in scope at launch? And is the B2B product *beans only*, or beans plus machine,
service and consumables?

- **Unblocks:** the entire doc 07, the B2B funnel, whether an equipment partner is needed, and
  whether the MVP contains a quotation engine at all.
- **The challenge behind the question:** office coffee is generally bought as a *service*
  (machine placement, maintenance, consumables, one invoice), not as beans. **PRIOR — to be
  verified in the research phase.** If true, a beans-only B2B offer competes at a structural
  disadvantage unless it enters through a warm channel (Q3) or targets buyers who already own
  machines (cafés, restaurants, hotels, coworking).
- **Fallback (A4):** B2C validates first; a B2B pilot runs in parallel but only through the
  warm HeyHomie channel and only as beans + optional partner machine. No quotation engine in the
  first release.

### Q5 — Geography at launch
Kraków only, Poland nationwide by courier, or EU from day one? Separate answer for B2B
(delivery radius / own drops).

- **Unblocks:** SEO architecture (city landing pages vs one national site — these are very
  different builds), Google Ads geo-targeting and budget concentration, fulfilment model,
  whether `hreflang` and a second currency are MVP or later.
- **Fallback (A5):** B2C nationwide in Poland via InPost lockers; B2B Kraków metropolitan area
  first, because that is where HeyHomie already operates.

### Q6 — Existing assets
Which of these already exist: company entity and VAT registration, sanepid food-business
registration, trademark search/registration for "Homie Coffee" in class 30, domain, roaster
relationship, packaging design and supplier, product photography?

- **Unblocks:** the length and content of Phase 0. A trademark or domain problem discovered
  after brand spend is expensive and entirely preventable.
- **Fallback (A6):** none of these exist except the GitHub repository; Phase 0 must include a
  trademark and domain availability check before any brand or advertising spend.

### Q7 — Launch date and human capacity
Target launch date, founder hours per week, and whether anyone else handles packing, support
or sales.

- **Unblocks:** MVP scope realism. Order fulfilment is manual labour with a hard ceiling; a
  campaign that works can break operations. Also determines whether B2B sales-assisted
  onboarding (which costs human hours per lead) is affordable.
- **Fallback (A7):** founder part-time, no employees, web MVP live ~10–12 weeks after scope
  approval, manual fulfilment capped at a volume to be stated explicitly in doc 05.

### Q8 — Price positioning and target AOV
Mass-market/value, accessible-specialty, or high-end specialty? And what average order value
are we designing the offer around?

- **Unblocks:** competitive set (a different set of competitors per tier), gross margin,
  whether paid acquisition can ever pay back, free-shipping threshold, and bundle design.
- **The arithmetic that makes this urgent (INFERENCE, to be modelled in doc 05):** a single
  250 g bag order cannot absorb Polish courier cost, payment fees and any paid-acquisition
  cost. The offer must be engineered for multi-bag orders or subscriptions from day one — this
  is an offer-design constraint, not a marketing tactic.
- **Fallback (A8):** accessible specialty; the offer is designed around a multi-bag basket with
  a free-shipping threshold above the single-bag price.

### Q9 — Subscription intent
Is a subscription a core bet (prepaid or committed, with real churn management) or a
convenience feature? Are you willing to accept a loss on the first order to acquire a
subscriber?

- **Unblocks:** MVP scope (recurring payments are a significant build, not a checkbox),
  payment-method constraints in Poland, the bidding model in Google Ads (value-based bidding
  needs a subscriber value, not an order value), and deferred-revenue accounting if prepaid.
- **Fallback (A9):** subscription is a core bet, validated by demand evidence *before* the
  recurring-billing machinery is built.

### Q10 — Invoicing, KSeF and B2B payment terms ⚠ DECISION NEEDED
Is there an existing accountant and invoicing system? Should the shop issue invoices itself or
delegate to that system by API? Are deferred B2B payment terms acceptable, and who carries the
credit risk?

- **Unblocks:** a genuine MVP blocker for B2B. **PRIOR — Poland's KSeF mandatory structured
  e-invoicing was legislated in phases with dates falling before the planning date of August
  2026.** If that is correct, any B2B invoice issued by this business is already in scope on
  day one, and the cheapest compliant path is almost certainly delegation to an existing
  invoicing provider rather than building it. This must be verified against the Ministry of
  Finance / KSeF official source before doc 13 is written; it is currently **not verified**.
- **Fallback (A10):** invoices are issued through an existing Polish invoicing SaaS via API,
  never built in-house; KSeF is assumed to be already mandatory until an official source proves
  otherwise; B2B launches on prepayment, with deferred terms as an explicit later decision.

---

## Assumption register

Every assumption is provisional and carries the ID used to trace derived numbers.

| ID | Assumption | From | Risk if wrong |
|---|---|---|---|
| A1 | Contract roasting under own label, no roastery, no green importing | Q1 | COGS and the whole legal chapter change |
| A2 | 40–60k PLN capital, 4–6k PLN/month marketing (placeholder) | Q2 | Advertising plan is unaffordable or over-cautious |
| A3 | Homie-family sibling brand, separate invoicing, no list reuse without consent | Q3 | Loses the strongest channel, or creates a GDPR exposure |
| A4 | B2C first; B2B pilot only through the warm channel | Q4 | Two funnels at once exceed founder capacity |
| A5 | PL nationwide B2C via InPost; B2B Kraków metro | Q5 | SEO architecture built wrong (city pages vs national) |
| A6 | No trademark/domain/packaging/roaster yet — Phase 0 required | Q6 | Brand spend before a blocking check |
| A7 | Founder part-time, no staff, ~10–12 weeks to web MVP | Q7 | Scope and fulfilment capacity misjudged |
| A8 | Accessible specialty, multi-bag basket design | Q8 | Wrong competitive set and unreachable margin |
| A9 | Subscription is a core bet, demand-validated before it is built | Q9 | Either wasted build or a missed core mechanic |
| A10 | Invoicing delegated to an existing provider; KSeF assumed in force | Q10 | B2B launch is legally blocked |
| A11 | Polish is the primary language, English second — matching HeyHomie's fixed `pl` default + `/en` architecture | F7 | i18n and URL architecture rework |
| A12 | Codex, not Claude Code, writes the production implementation; Claude Code writes specification and review | user brief §1 | Role confusion, duplicated or conflicting work |

---

## Decision register

| ID | Decision | Status | Owner | Notes |
|---|---|---|---|---|
| D-001 | Canonical location of all Homie Coffee work | **DECIDED 2026-08-20** | Ihor | `github.com/ihorfroliak/homie-coffee`. Everything lives there. |
| D-002 | Claude Code ↔ Codex must interact automatically; a change by one triggers a reaction from the other | **DECIDED 2026-08-20** | Ihor | Design in `17-agent-interop.md`. Automation layer needs credentials Ihor must provision. |
| D-003 | Positioning | ⚠ open | Ihor | Blocked on Q1, Q8 and research |
| D-004 | Business model (one-off / subscription / B2B mix) | ⚠ open | Ihor | Blocked on Q4, Q9 |
| D-005 | MVP scope | ⚠ open | Ihor | Blocked on D-003, D-004 |
| D-006 | Technology choice | ⚠ open | Ihor | Decision matrix in doc 13; must not be pre-empted by the house stack (F6) |
| D-007 | Google Ads measurement model | ⚠ open | Ihor | Blocked on doc 05 unit economics |
| D-008 | Roadmap and phase gates | ⚠ open | Ihor | Blocked on all of the above |
| D-009 | Native mobile application at launch | **Claude Code recommends: no** | Ihor | Argument and measurable reversal thresholds go in doc 06. Recorded here so the recommendation is not silently dropped. |
| D-010 | Local folder rename `homies-coffee` → `homie-coffee` to match the remote and the sibling convention | ⚠ open, cosmetic | Ihor | F10 |

---

## What has explicitly NOT been done

- No market research, no competitor analysis, no keyword data — nothing in this repository
  cites a source yet, because none has been gathered yet.
- No production code, no framework, no dependencies, no database, no scaffolding.
- No technology has been selected. The presence of a house stack (F6) is an input to the
  decision matrix, not the decision.
- No push to GitHub — this environment has no credentials (F3).
