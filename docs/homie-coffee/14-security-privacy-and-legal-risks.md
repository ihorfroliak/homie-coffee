# 14 — Regulatory, privacy and legal blockers (Gate 0 scope)

**This is a blocker assessment, not a legal opinion.** Its only job is to answer: *is there
anything here that stops Homie Coffee trading, or that changes the business model?* Items marked
**needs professional confirmation** must go to an accountant or lawyer before money is committed.

Sources: [`sources.md`](sources.md) `REG-01`…`REG-28`, gathered from gov.pl, biznes.gov.pl,
ksef.podatki.gov.pl, EUR-Lex and the European Commission on 2026-08-20/21.

---

## The answer first

**No hard legal blocker to trading was found.** But one *commercial* consequence of a tax status
is close to decisive, and it works in the opposite direction to intuition:

> **Not being a VAT payer does not save money — it destroys the B2B channel.** A non-VAT payer
> charges no VAT, so a VAT-registered business buyer has nothing to deduct. The same shelf price
> costs that buyer ~23% more in real terms than buying from a VAT-registered roaster.
> **Voluntary VAT registration is a business-model decision, not a tax optimisation.**

Quantified in [doc 05](05-business-model-and-unit-economics.md): at the verified 124 PLN/kg cost
with founder labour charged, a 10 kg/month B2B account is **−60.50 PLN/month and never pays back**
as a non-VAT payer, and **+220 PLN/month with 1.9-month payback** if VAT-registered. Same coffee,
same customer, same cost. One free, reversible decision.

---

## 1. KSeF — in scope, but not an immediate gate

| Question | Answer | Key |
|---|---|---|
| Is KSeF mandatory now? | Yes. 2026-02-01 for taxpayers above the 200,000,000 PLN threshold; **2026-04-01 for everyone else** | REG-01 |
| **Is a non-VAT payer in scope?** | **Yes.** ksef.podatki.gov.pl states explicitly that taxpayers exempt from VAT — both *przedmiotowo* and *podmiotowo* — must issue invoices through KSeF | **REG-02** |
| Any relief? | Yes, and it matters. Until **2026-12-31**, a taxpayer whose invoiced sales in a given month total **no more than 10,000 PLN gross** may still invoice outside KSeF | REG-03 |
| When do penalties start? | **2027-01-01** | REG-04 |

**Consequence:** KSeF is a **Q4 2026 build requirement**, not a launch blocker. A pilot invoicing
under 10,000 PLN/month can start immediately outside KSeF. This directly supports A10 —
**delegate invoicing to Fakturownia rather than building it** (F13); the integration burden then
belongs to the provider, not to us.

⚠ **Needs professional confirmation:** whether the 10,000 PLN carve-out applies per-entity in our
exact situation, and Fakturownia's current KSeF readiness.

## 2. VAT — the decisive commercial item

| Question | Answer | Key |
|---|---|---|
| Standard rate | 23% | REG-05 |
| Rate on roasted coffee | 23% — **INFERENCE**, not read off a rate table | REG-06 ⚠ |
| Small-business exemption threshold 2026 | **240,000 PLN/year**, raised from 200,000 | REG-07 |
| Does selling coffee force registration regardless of turnover? | **No.** Coffee does not appear on the art. 113 ust. 13 list | REG-11 |
| Can a non-VAT payer issue a valid invoice? | Yes — VAT rate field shows *"zw"*; buyer may request within 3 months | REG-09 |
| **B2B consequence** | **~23% effective cost disadvantage to a VAT-registered buyer** | **REG-10** |

**Recommendation to Ihor (requires your decision, D-016):** if B2B is in the plan at all, register
for VAT voluntarily. The exemption is worth having only for a pure-B2C business.

⚠ **Needs accountant confirmation:** the coffee VAT rate is an inference; the exemption's
interaction with voluntary registration; and whether registering affects other Omnomnom activity.

## 3. Food business registration — light-touch, not an approval

| Question | Answer | Key |
|---|---|---|
| What is required? | **Wpis do rejestru** only — registration, **not** *zatwierdzenie zakładu* (approval), for a business that only stores and ships sealed, microbiologically stable packaged food it did not produce and sells at a distance | REG-12, REG-15 |
| Deadline and cost | **At least 14 days before starting. 0 PLN.** | REG-13 |
| Inspection cost | 80 PLN minimum fee only if deficiencies are found | REG-14 |

**Consequence:** a genuine non-blocker — 14 days of lead time and no fee. **But it must be filed
before the first sale**, and it belongs in the pre-launch checklist, not the backlog.

⚠ **Open:** whether **repacking** (splitting bulk into our own bags ourselves) flips this into the
approval regime. Not resolved on any official page. This is a real argument for having the roaster
pack under private label rather than repacking in-house — which is also what A7 wants (no manual
work).

## 4. Labelling

12 mandatory particulars under Regulation (EU) 1169/2011, with a minimum x-height of **1.2 mm**
(0.9 mm on small packs) (REG-16, REG-17). Who is named as the food business operator differs
between private label and resale (REG-18, INFERENCE) — under private label it is likely us, which
is another reason the supplier's own template labels (SUP-06) are attractive at pilot scale.

⚠ **Needs confirmation** with the chosen roaster: who is named on the pack, and who signs off the
artwork's legal compliance.

## 5. EUDR — not a near-term obligation for this model

| Question | Answer | Key |
|---|---|---|
| Coffee in scope? | Yes | REG-21 |
| Current application dates | **2026-12-30** large/medium · **2027-06-30** micro/small, after Regulation (EU) 2025/2650 | REG-19 |
| Our position buying already-roasted PL coffee | **Downstream operator** — files **no due diligence statement of its own**; collects and retains the upstream DDS reference for **5 years** | **REG-20** |

**Consequence:** a record-keeping obligation from mid-2027, not a barrier. **But it must be in the
supplier contract from the first order** — ask every roaster in the RFQ whether they will provide
the DDS reference. That is a one-line addition to the outreach template, and far cheaper to secure
now than to retrofit.

## 6. GPSR — a trap for the catalogue, not the coffee

Applies from 2024-12-13; **food is excluded**, so the coffee itself is out of scope (REG-22).
It **does** catch non-food merchandise sold alongside — mugs, grinders, brewers, tote bags —
which then need a responsible economic operator in the EU (REG-23).

**Consequence:** the moment the catalogue adds a grinder or a mug, a new compliance obligation
appears. Worth knowing *before* someone adds accessories to widen the basket.

## 7. GDPR and marketing consent — the HeyHomie cross-sell is NOT safe

The governing statute is **Prawo komunikacji elektronicznej**, in force 2024-11-10 (Dz.U. 2024
poz. 1221) (REG-24). The exact text of art. 398 could not be opened on an official source.

**Assessment (REG-25, REG-26 — both INFERENCE):** consent collected for a *cleaning* brand very
likely does **not** extend to marketing a *coffee* product. The "market to our existing HeyHomie
list" idea is **unsafe until a lawyer confirms it**.

This vindicates A3 as Ihor wrote it. Note the practical consequence: **the warm B2B channel is a
channel of relationships, not of email addresses.** Approaching an existing HeyHomie *business*
client through the existing commercial relationship is a different act from importing a consumer
marketing list, and the two must not be conflated in any plan.

⚠ **Needs legal confirmation** before any message is sent to any HeyHomie contact.

## 8. Trademark — unverified, and this is a live risk

**Nothing was verified.** EUIPO returned 403 and TMview reset the connection (REG-27). A
near-match scan found no matching Polish coffee brand called "Homie" (REG-28) — but that is a
market scan, not a register search, and it is not evidence of availability.

**This remains exactly what doc 01 said it was: a check that must happen before any material brand
expenditure** (A6). It is cheap, it is fast, and discovering a conflict after packaging and label
artwork is a pure avoidable loss. Given the whole **Homie ecosystem** (F4) shares the name, a
conflict in class 30 would matter beyond this one product.

---

## 9. Risk register — Gate 0 view

| # | Risk | Severity | Status |
|---|---|---|---|
| L1 | Non-VAT status makes B2B structurally unprofitable | **High — model-changing** | Quantified; fix is voluntary registration (D-016) |
| L2 | Trademark conflict on "Homie" in class 30 | **High** | **Unverified.** Blocks brand spend |
| L3 | HeyHomie cross-marketing without a valid lawful basis | **High** | Assume unsafe until a lawyer says otherwise |
| L4 | KSeF integration required by 2027-01-01 | Medium | Delegate to Fakturownia; relief until 2026-12-31 |
| L5 | Repacking in-house triggers the sanepid approval regime | Medium | Avoid by having the roaster pack |
| L6 | EUDR DDS reference not secured from the supplier | Medium | Add to the RFQ now; costs nothing |
| L7 | Coffee VAT rate is an inference, not a read rate | Medium | Accountant |
| L8 | GPSR obligations appear when non-food accessories are added | Low, until the catalogue widens | Note in any future scope decision |
| L9 | Deferred B2B payment terms create credit risk | Medium | A10 already forbids them at launch — keep it that way |

**Not assessed at Gate 0** (deliberately out of scope, D-012): consumer-law obligations for the
webshop (regulamin, withdrawal rights, the 2026-06-19 returns changes flagged in COST-30),
information security, payment-provider compliance, insurance. These belong to the specification
phase, not to a feasibility gate.
