# 18 — Commercial Feasibility Gate 0

**Question:** can Homie Coffee produce viable unit economics?
**Evidence:** 213 sourced claims across six research streams, 2026-08-20/21 — [`sources.md`](sources.md).
**Arithmetic:** [`model/unit-economics.mjs`](model/unit-economics.mjs), re-runnable, six scenarios.
**Author:** Claude Code. **Decision-maker:** Ihor.

---

# CONCLUSION: **B2B GATE INCOMPLETE · PAID B2C NO-GO**

**B2B remains a live hypothesis pending explicit-basis quotes and accountant review. The
paid-acquisition-led B2C store is NO-GO.**

The first B2B/VAT model did not separate the channels cleanly: it mixed price bases. That comparison
is withdrawn. The B2C conclusion does not depend on it and survives with a wider negative gap after
the parcel-cost correction.

| | Verdict | Why, in one line |
|---|---|---|
| **B2B beans-only, Kraków, businesses that already own machines** | 🟡 **unproven; publication gate closed** | SUP-05 and B2B-14 lack compatible net/gross bases. Obtain ≥3 explicit-basis quotes and accountant review before any contribution/payback claim |
| **B2C via Google Ads / paid search** | ❌ **not viable at any obtainable supply price** | Coffee would have to cost **~50 PLN/kg** to cover a median Polish 69.30 PLN CPA on one order. Green arabica alone is ~26.70 PLN/kg before roasting |
| **B2C via organic / warm / marketplace** | 🟡 **plausible, unproven** | Contribution is positive (6–20 PLN/order) but the repeat rate it depends on is invented |
| **Resale of another roaster's brand** | ❌ **abandon** | Worse margin *and* no wholesale programme found permits relabelling — it builds nothing |
| **Dropshipping** | ❌ **unevidenced** | No Polish coffee supplier publishes terms. Cannot be modelled; must not be assumed |

The evidence rejects paid-acquisition B2C and supports beans-only, machine-owning Kraków businesses
as a validation target. It does **not** yet approve B2B-first or resolve D-017. Admin work must not
turn that open launch-order decision into an assumption.

---

## The VAT mechanism — corrected, but not publishable yet

The withdrawn model cut non-VAT revenue and kept gross input costs, charging the missing deduction
twice. The corrected mechanism holds buyer-effective revenue constant. Registration then affects
eligible input costs: their VAT becomes deductible. A regression test proves that the contribution
difference equals the reclaimable input VAT on the modelled coffee and delivery lines.

That establishes direction, not magnitude or viability. The model continues to output `unresolved`
for B2B until the selling benchmark and supplier quotes carry explicit compatible bases and an
accountant confirms treatment. No B2B contribution, payback or lifetime value from the withdrawn
comparison may be used in a decision.

---

## 1. The strongest reason to proceed

**The cost of testing supply can be kept under 850 PLN, and the B2B hypothesis can be resolved
without production software.**

Two facts combine unusually well:

- **Entry is trivially cheap.** Lafaye produces private label from **20 units per SKU — and from
  zero with client-supplied labels** (SUP-01). Twenty 250 g units plus a 150 PLN label is **under
  ~850 PLN** (SUP-34). The private-label barrier in Poland is artwork, not volume.
- **The B2B economics are cheap to test, not proven.** The only public cost (124 PLN/kg) omits its
  tax basis. D-019 can replace it with three comparable quotes before software or material spend.

Add the structural opening: the incumbent Polish B2B model is a machine on loan against a
**2–4 kg/month** purchase commitment (B2B-01, B2B-02, B2B-03), legally locked so that **only the
supplier's coffee may be brewed in the loaned machine** (tax ruling 0111-KDIB1-1.4010.187.2021.3.MF,
B2B-04), on **12–36 month contracts** with exit penalties (B2B-06, B2B-19). A "free" machine worth
115–650 PLN/month of rental at a 3 kg/month threshold is an **implicit 38–117 PLN/kg surcharge
buried in the bean price** (B2B-34).

**That gap is the entire opportunity.** A beans-only supplier with no machine, no contract and no
minimum sells against a hidden surcharge larger than a speciality roaster's whole gross margin.
The incumbents know it — Tchibo publicly invites machine owners to a coffee-only subscription
(B2B-10), and Kocham Kawę differentiates explicitly on *"brak obowiązku zakupu kawy u dostawcy
ekspresu"* (B2B-11). Coffeedesk's B2B arm reports **8,235 B2B clients and 67 m PLN/year** (B2B-21),
so the beans-buying segment is not hypothetical.

Kraków is a real target: **206 hotels / 24,820 beds** (B2B-24), **1.84 m m² of office stock**
(B2B-26), **~70,000 m² of flex/coworking — the largest regional market** (B2B-27). A hotel alone
consumes **~17.6 kg/month** (B2B-22).

## 2. The strongest reason not to proceed

**The one number the entire business rests on has exactly one public data point, and it sits
inside the price band it would have to be sold above.**

124 PLN/kg (SUP-05) is Palarnia Meksyk's indicative private-label price — and that page calls it
*"uśrednione kwoty"*, averaged amounts. **Zero of eight wholesalers publish a price per kilogram**
(SUP-32). Meanwhile verified accessible-speciality retail is 120–190 PLN/kg (CMP-46), Allegro
sells 1 kg "specialty" at **59.98–119.99 PLN/kg** (BM-21), and Polish roasters sell direct at
125–175 PLN/kg (BM-25).

**B2C is already unattractive at the published 124 PLN/kg input. B2B cannot be classified from
that number until its net/gross basis and the achievable selling-price basis are explicit.**

Secondary, and serious:

- **The repeat rate is invented.** `repeatRateOrder2 = 0.30` has no source; no Polish coffee
  repeat benchmark exists. Only **~11% of Polish consumers are genuinely loyal and 34% buy a brand
  only on promotion** (BM-16), so 30% may be generous. Every LTV figure inherits this.
- **The B2B sales assumptions are all invented** — 6 hours per won account, 5 prospects per win,
  25 PLN samples, 5% monthly churn. And beans-only carries **no contractual lock-in**, unlike the
  12–36 month incumbent contracts, so churn should be assumed *higher*, not lower.
- **The market grows on price, not volume** — value +13% while volume **−2%** (BM-03) — and
  speciality is **~140 m PLN, about 2% of a 7.7 bn PLN market** (BM-09), contested against another
  source at ~260 m PLN.
- **The trademark is unverified.** EUIPO 403, TMview connection reset (REG-27).

## 3. Critical missing evidence

Ranked by how much each changes the decision.

| # | Missing | Why it decides things | How to close it | Cost |
|---|---|---|---|---|
| **E1** | **Real private-label cost per kg at low volume**, from ≥3 roasters | Everything. Gross margin, both channels, the whole gate | Send the [drafted RFQ](model/supplier-outreach-template.md) to Lafaye, Palarnia Meksyk, Roastains, Coffee Hunter, Ascafe | free |
| **E2** | **Trademark position on "Homie" in class 30** | Blocks all brand spend; a conflict affects the whole Homie ecosystem | EUIPO eSearch / TMview / UPRP from a normal browser | free |
| **E3** | **Accountant's answer on voluntary VAT registration** | The single largest lever found (§ above) | One call | ~200 PLN |
| **E4** | **Whether Kraków machine-owning businesses will actually switch** | The entire B2B thesis | Field test — §9 | ~300 PLN |
| **E5** | **Real B2B price achievable**, not a price-ladder article | B2B margin. All Polish B2B pricing is gated (B2B-32) | Falls out of E4 | — |
| **E6** | Coffee repeat rate | All B2C LTV | Only measurable by trading. **Cannot be closed at this gate** | — |
| **E7** | Whether repacking triggers sanepid approval | Changes operations | biznes.gov.pl enquiry, or avoid by having the roaster pack | free |
| **E8** | B2B payment terms and search demand | Sales process design | Could not be established publicly (B2B gaps) | — |

**E1, E2 and E3 are free or near-free, and together they resolve the gate.** That is the single
most important sentence in this document.

## 4. Maximum rational validation budget

> **2,000 PLN — the lean ceiling (A2). Do not authorise more.**

| Item | Cost |
|---|---|
| Private-label pilot batch, 20 units + label (SUP-01, SUP-02) | ~850 PLN |
| Samples for ~30 Kraków prospects | ~300 PLN |
| Accountant consultation on VAT registration | ~200 PLN |
| Trademark search | 0 |
| RFQs to 5 roasters | 0 |
| Contingency | ~650 PLN |

**Spending 5,000 or 10,000 PLN would buy nothing extra**, because the binding constraint is
founder hours and supplier quotes, not cash. And it must not go to advertising: at a median 69.30
PLN CPA, 2,000 PLN buys ~29 acquisitions — statistically useless for measuring repeat, and
loss-making per order. **Ad spend at this stage purchases a known-negative result.**

## 5. Recommended first customer segment

> **Kraków businesses that already own their espresso equipment, starting with independent cafés,
> boutique hotels and coworking operators — the ones a loaned-machine contract cannot hold.**

Prioritised by volume per sales hour:

| Segment | Monthly kg | Why them |
|---|--:|---|
| **Boutique hotels** | **~17.6** (B2B-22) | Best volume per account; 206 hotels in Kraków (B2B-24); own their equipment |
| **Coworking / flex** | 5–8 per 40–50 people (B2B-16) | 70,000 m² in Kraków, largest regional market (B2B-27) |
| **Independent speciality cafés** | varies | Own their machines by definition; but the most price- and quality-critical buyers |
| **Offices 20+ staff** | 3–4 per 20 (B2B-16) | Large in number — but most are exactly who the free-machine contracts capture |

**Explicitly not now:** machine rental, installation or maintenance (A4 — correct, and the
evidence supports it: incumbents own that game and it needs capital, a service technician and
36-month contracts). **B2C is a second phase, and an organic one.**

**On the HeyHomie warm channel:** approach existing HeyHomie *business* clients through the
existing commercial relationship — not by importing a marketing list. Consent given to a cleaning
brand very likely does not extend to a coffee product (REG-25/26), and this needs a lawyer before
any message is sent. It is a relationship channel, not an email list.

## 6. Recommended supply model

> **Contract roasting / private label. Start at micro-MOQ, quote three roasters, never repack
> in-house.**

- **Route A — private label ✅.** The only route that builds a brand, and entry is under 850 PLN.
- **Route B — wholesale resale ❌.** Worse margin (positive contribution only 0.25–8.49 PLN/order,
  one modelled shape negative, break-even ROAS up to 580.7×) *and* **no wholesale programme found
  permits relabelling** (SUP-35). It builds
  someone else's brand.
- **Route C — dropshipping ❌.** No primary source publishes terms (SUP-33). Not modellable.

Two operational riders, both from the evidence: have the **roaster pack and label** — it avoids
the sanepid repacking question (REG-12/15), removes packaging COGS (SUP-06) and satisfies A7's
demand to minimise manual work. And **put the EUDR due-diligence-statement reference in the
supplier agreement from the first order** (REG-20) — free now, expensive to retrofit in 2027.

## 7. Minimum viable AOV

> **~120 PLN to be worth fulfilling. 149 PLN to be worth acquiring.**

- **Below ~100 PLN an order is not worth the founder's time.** In the conservative scenario every
  order shape is negative once labour is charged.
- **149 PLN is the market's own answer** — the median and modal Polish free-delivery threshold
  across 11 verified stores (CMP-45). Competitors have already engineered baskets away from the
  single bag.
- **The best order shape is 3 × 250 g, not 1 kg.** Counter-intuitive and worth stating: at base,
  the bundle contributes **15.99 PLN** versus **10.25 PLN** for a 1 kg order at higher revenue,
  because coffee cost scales with weight while price per kg falls. Bundles of small bags beat big
  bags on margin.
- Shipping costs **44.36 PLN per kg moved** on a single 250 g order versus **11.09 PLN/kg** on a
  1 kg order (COST-32). Basket size is the largest lever in B2C, not carrier choice.

## 8. Maximum break-even CAC

| Channel | Max CAC (first order) | Max CAC (modelled lifetime) | Polish market cost | Verdict |
|---|--:|--:|--:|---|
| **B2C paid** | **15.99 PLN** | **23.19 PLN** | **69.30 PLN** median PMax · 86.46 Search (BM-18) | ❌ **over 4× short** |
| **B2B** | **unresolved** | **unresolved** | sales cost assumptions remain illustrative | 🟡 **publication gate closed** |

Break-even ROAS for B2C is **7.6×–27.4×** in the base scenario. **LTV/CAC peaks at 0.33** — 33
groszy back for every złoty spent. Even the optimistic scenario reaches only **0.93**.

**Solving backwards: coffee must cost ~50 PLN/kg for one 1 kg order to cover a median CPA.** Green
arabica at the C-market is ~26.70 PLN/kg *before* differential, freight, duty, 15–18% roasting
weight loss and roaster margin (BM-28). **That route is closed.** Paid-search-led B2C is not a
tuning problem; it is arithmetically unavailable.

## 9. Proposed validation experiment

**Eight weeks. ≤2,000 PLN. No landing page, no store, no ads, no code.**

| Wk | Action | Output |
|---|---|---|
| 1 | Send the drafted RFQ to 5 roasters (E1). Run the trademark search (E2). Book the accountant (E3). | Real cost/kg. Brand risk resolved. VAT decision. |
| 1 | File the sanepid *wpis do rejestru* — free, 14 days' lead time (REG-13) | Legally able to sell |
| 2–3 | Order the micro pilot batch — 20 units, own label (~850 PLN) | Real product in hand |
| 3–6 | Visit **30 Kraków machine-owning businesses** in person with samples: boutique hotels, coworking, independent cafés. Ask price, current supplier, contract end date, what would make them switch. | Real prices, real objections, real demand |
| 6–8 | Convert. Prepayment only (A10). Invoice via Fakturownia, under 10,000 PLN/month so KSeF does not yet bite (REG-03). | Paying accounts, or a clear no |

**Continue if ALL of these hold:**

1. ≥3 quotes at **≤110 PLN/kg** at a volume we can actually buy;
2. **≥3 paying accounts at ≥5 kg/month** from 30 approaches (a 10% close rate);
3. achieved price **≥140 PLN/kg**;
4. no trademark conflict in class 30;
5. accountant confirms voluntary VAT registration is available and sensible.

**Stopping rules — stop, do not iterate:**

- All quotes **>130 PLN/kg** → **NO-GO on the whole business.** There is no margin at any channel.
- **<1 paying account from 30 approaches** → NO-GO on B2B-led. Reconsider from scratch.
- Trademark conflict found → halt all brand spend until renamed.
- Any spend above 2,000 PLN before these answers → the gate has failed as a control.

**Deliberately excluded:** ads, a landing page, a webshop, a subscription engine, a mobile app,
SEO content. Not one of them is needed to answer the question, and the evidence says a subscription
engine is not even market-normal — only **2 of 5** Polish coffee subscriptions run true card-on-file
billing; the rest are prepaid blocks or manual arrangements (CMP-47). **A9 was right.**

## 10. Decisions Ihor must approve next

| ID | Decision | Recommendation | Blocks |
|---|---|---|---|
| **D-016** | **Register Omnomnom sp. z o.o. for VAT voluntarily** | Accountant review required; direction of input-VAT benefit is known, magnitude is not | B2B tax treatment |
| **D-017** | **Invert the launch order: B2B first, B2C second and organic** | Hold; B2B economics unresolved | Everything downstream |
| **D-018** | **Authorise ≤2,000 PLN validation, none of it on advertising** | Yes | The experiment |
| **D-019** | **Approve sending the RFQ to 5 named roasters** (lifts D-015 for these only) | Yes — free, and closes E1 | E1 |
| **D-020** | Approve the ~850 PLN private-label pilot batch | Yes, **after** D-019 returns quotes | Field test |
| **D-021** | Confirm "Homie Coffee" as the name, subject to the class 30 search | Hold until E2 | All brand spend |
| **D-022** | Confirm the accountant and lawyer to consult (VAT; HeyHomie cross-marketing) | Yes | E3, L3 |
| **D-003** | Positioning — accessible speciality, beans-only, no machines | Recommend approving as tested | Specification phase |
| **D-004** | Business model — B2B-led, prepayment, no subscription engine | Hold until quote bases and accountant review close B2B economics | Specification phase |

Technology D-006 and local prototype D-023 are approved, but no production implementation is.
D-003–D-005 and D-008 remain open. **D-024 blocks every production vertical slice until ≥3
explicit-basis roaster quotes and accountant review return.**

---

## What would change this conclusion

Stated in advance so the gate cannot be quietly re-interpreted later:

- **Three comparable gross-basis quotes above the viable threshold after accountant-reviewed tax
  treatment** → downgrade B2B; do not infer the threshold from the withdrawn model.
- **Quotes ≤90 PLN/kg** → B2C organic becomes genuinely interesting; paid still does not.
- **Zero conversions from 30 field approaches** → NO-GO regardless of cost.
- **Accountant says voluntary VAT registration is unavailable or harmful** → re-run the corrected
  model under the confirmed non-VAT cost structure; no withdrawn row may be reused.

## Honest limits of this assessment

1. **CPA is not CAC.** BM-18 is an all-category median cost per *conversion*, which may include
   non-purchase actions. A blended CAC including organic and repeat traffic is lower. The finding
   is that paid acquisition cannot fund the business *in isolation* — not that no customer can be
   acquired profitably.
2. **The AOV/conversion benchmark contains no food category** (BM-12, BM-13). Food typically
   converts better than fashion, so 1.4% may understate coffee.
3. **The B2B price of 150 PLN/kg comes from a trade price-ladder article, not from a quote we
   hold.** All Polish B2B pricing is gated (B2B-32).
4. **Four competitors could not be verified** — Hard Beans, Story Coffee, Audun, Coffee
   Proficiency (403/404/TLS failures). Their pricing is absent, not zero.
5. **Marketplace economics are not modelled.** Allegro at 5–10.5% and Amazon.pl at 11% (BM-19,
   BM-22) are far cheaper than a 69 PLN CPA and deserve their own assessment at the next gate.
6. **The B2B block rests on invented sales assumptions.** They are flagged in `params.json` and are
   exactly what the field test replaces.
