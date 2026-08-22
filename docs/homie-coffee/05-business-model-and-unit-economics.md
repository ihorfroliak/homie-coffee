# 05 — Business model and unit economics (Gate 0)

**Everything here is computed, not asserted.** The model is
[`model/unit-economics.mjs`](model/unit-economics.mjs) with inputs in
[`params.json`](model/params.json) and [`scenarios.json`](model/scenarios.json). Zero
dependencies. Re-run it and disagree with it:

```bash
node docs/homie-coffee/model/unit-economics.mjs --all
```

Every input carries a `src` — a [`sources.md`](sources.md) key, an assumption ID from doc 01, or
`ASSUMPTION(...)` where no public figure exists. **The model refuses to run while any input is
unresolved**, so it cannot quietly substitute a flattering number for a missing one.

---

## The answer first

**At the only verified Polish private-label cost, and at Polish median advertising cost, this
business does not pay for a customer out of the first order — in any scenario, at any order
shape.** Even the optimistic scenario remains below break-even across three orders
(LTV/CAC peaks at 0.93), and that ceiling rests on a supply price nobody has quoted us.

Solving backwards: for a single 1 kg order to cover the median Polish Performance Max CPA of
69.30 PLN, **coffee would have to cost about 50 PLN/kg** — under half the one publicly quoted
private-label price (124 PLN/kg), and below the ~26.70 PLN/kg green C-market price once roasting,
weight loss and a roaster's margin are added. That route is effectively closed.

**This is not a NO-GO on the business. It is a NO-GO on paid-acquisition-led DTC.** The gate
conclusion is in [doc 18](18-commercial-feasibility-gate.md).

---

## 1. The cost stack on one order

Modelled for a non-VAT payer (F12): no output VAT is charged, so the shelf price **is** net
revenue; input VAT is not reclaimable, so every cost below is the **gross** price paid.

| Line | Value | Source |
|---|---|---|
| Coffee | **124.00 PLN/kg** (only verified private-label quote) | SUP-05 |
| Packaging + label | **0** under private label — Meksyk supplies doypack with valve and free template label edits | SUP-06 |
| — if buying packaging separately | 1.52 PLN / 250 g pouch, 2.22 PLN / 1 kg pouch, 1.00 PLN label @1,000 szt | COST-24/25/27 |
| Outer carton + filler | 1.50 PLN | ⚠ **ASSUMPTION** — excluded from every cost page found |
| Shipping | **15.41 PLN gross** paid by the current non-VAT company; page also displays 11.09 PLN net and the two columns do not reconcile at 23% | COST-09 |
| COD surcharge | 2.49 PLN × 10% of orders | COST-11 + ⚠ assumption on share |
| Payments | 1.6% + 1.00 PLN (Stripe BLIK, 72% of orders) / 1.5% + 1.00 PLN card | COST-16/17/20 |
| Refunds + damage | 3% of revenue | ⚠ **ASSUMPTION** below the 5–7% all-category figure |
| Discounts | 5% blended | ⚠ **ASSUMPTION** |
| Founder labour | 8 min/order — charged only in the conservative scenario | A7 |

**The structural fact that drives everything:** the displayed gross parcel cost is **61.64 PLN per
kg of coffee moved** on a single 250 g order, versus **15.41 PLN/kg** on a 1 kg order (COST-09;
derived). Basket weight, not
carrier choice, is the largest lever in the whole model — and the market's 149 PLN free-delivery
norm (CMP-45) already forces baskets towards 1 kg or three bags.

---

## 2. Results — three scenarios plus a resale sanity check

Prices in all scenarios sit inside the **verified** Polish accessible-speciality band of
120–190 PLN/kg (CMP-46).

### Conservative — 124 PLN/kg published indicative cost, founder labour charged at 50 PLN/h

| Order | Revenue | COGS | Gross % | Contribution | Contr. % |
|---|--:|--:|--:|--:|--:|
| 1 × 250 g | 48.09 | 34.00 | 29.3% | **−12.40** | −25.8% |
| 3 × 250 g bundle | 110.19 | 96.00 | 12.9% | **−16.38** | −14.9% |
| 1 × 1 kg | 129.09 | 127.00 | 1.6% | **−29.72** | −23.0% |

**Every order shape loses money before a single złoty of advertising.** At the one price anybody
publishes, and with the founder's time valued at all, the business is underwater on arrival. The
1 kg order — the shape the market's shipping threshold pushes customers towards — is the *worst*,
at 1.6% gross margin, because coffee cost scales with weight while price per kg falls.

### Base — 110 PLN/kg (⚠ assumed, ~11% better than the only quote), labour not charged

| Order | Revenue | Gross % | Contribution | After 69.30 CPA | LTV/CAC |
|---|--:|--:|--:|--:|--:|
| 1 × 250 g | 52.89 | 45.2% | 4.81 | **−64.49** | 0.10 |
| 3 × 250 g bundle | 122.24 | 31.3% | **15.99** | **−53.31** | 0.33 |
| 1 × 1 kg | 145.04 | 23.1% | 10.25 | −59.05 | 0.21 |

Positive contribution — roughly 2 to 16 PLN per order — and it is **nowhere near** a 69.30 PLN
all-category cost per conversion. Break-even ROAS is 7.6×–27.4×. Across three orders, LTV/CAC
peaks at **0.33**: for every złoty spent acquiring a customer, 33 groszy comes back over their
modelled lifetime.

### Optimistic — 95 PLN/kg (⚠ assumed volume terms a startup cannot justify)

| Order | Revenue | Gross % | Contribution | After 69.30 CPA | Payback | LTV/CAC |
|---|--:|--:|--:|--:|--:|--:|
| 3 × 250 g bundle | 133.27 | 45.4% | **39.10** | −30.20 | never | **0.93** |
| 1 × 1 kg | 157.52 | 38.7% | 38.73 | −30.57 | never | 0.92 |

**Even the optimistic case does not cover the benchmark on the first order or across the three
modelled orders.** LTV/CAC remains below 1.0. That is the *ceiling*, built on an unquoted supply
price and generous repeat assumptions.

### Resale sanity check — Route B, someone else's brand

Positive contribution is only 0.25–8.49 PLN per order, with one shape already negative;
break-even ROAS reaches **580.7×** on the 1 kg order.
Combined with the finding that **no wholesale programme permits relabelling** (SUP-35), Route B is
both economically worse and strategically empty. Its cost input is derived rather than public, so
this is illustrative — but nothing about it invites further investigation.

---

## 3. The break-even solve — the most useful table in this document

At base pricing (139 PLN for 1 kg), what would coffee have to cost for **one** order to pay a
median Polish PMax CPA?

| Cost PLN/kg | 1 kg contribution | Covers 69.30 CPA? |
|--:|--:|---|
| 124 (published indicative) | −3.75 | no |
| 110 | 10.25 | no |
| 100 | 20.25 | no |
| 80 | 40.25 | no |
| 60 | 60.25 | no |
| **50** | **70.25** | **yes** |

**~50 PLN/kg is the requirement, and it is not reachable.** Green arabica at the C-market is
~26.70 PLN/kg (BM-28) *before* origin differential, freight, duty, ~15–18% roasting weight loss
and any roaster margin. A contract roaster selling finished coffee at 50 PLN/kg would be working
for nothing.

**Therefore: paid search/PMax acquisition at Polish median cost cannot fund this business at any
supply price a small brand can obtain.** This is the single most important calculation in Gate 0.

---

## 4. What this does *not* prove — the honest limits of my own analysis

I am attacking my own conclusion here, because it is a strong one and it should be tested.

1. **The CPA benchmark is not coffee-specific and may not be purchases.** BM-18 is a median
   "cost per conversion" across 4,976 Polish campaigns in all categories. A "conversion" may
   include non-purchase actions, which would *understate* true CPA — or coffee may convert better
   than average, which would overstate it. Either way it is not a coffee CAC. ⚠ **This is the
   weakest link in the argument for NO-GO on paid.**
2. **CPA is not CAC.** A shop with organic, direct, email and repeat traffic has a blended CAC far
   below its paid CPA. The calculation above says paid acquisition cannot pay for itself in
   isolation — not that no customer can be acquired profitably.
3. **The repeat rate is invented.** `repeatRateOrder2 = 0.30` has no source. No Polish coffee
   repeat benchmark was found. The entire LTV column rests on it, and BM-16 (only ~11% of Polish
   consumers genuinely loyal, 34% buy only on promotion) suggests 30% may be generous. This is the
   most consequential unsourced number in the file and it is flagged as such in `params.json`.
4. **124 PLN/kg is one quote, from one roaster, self-described as an average.** A real RFQ could
   land materially lower. It could also land higher.
5. **Marketplace economics are not modelled here.** Allegro at 5–10.5% commission and Amazon.pl at
   11% (BM-19/22) are dramatically cheaper than a 69 PLN CPA, and doc 02 §5 flags them as a real
   option. They are excluded from this model because they change the business, not just a number.
6. **Founder labour is charged in only one scenario.** Comparing the conservative and base rows is
   the clearest illustration of what part-time capacity really costs (A7).

---

## 5. What would have to be true for this to work

Ranked by how much each moves the outcome:

1. **Acquisition must not be paid search.** Organic, warm/referral, marketplace, or B2B. This is
   forced by §3, not a preference.
2. **Cost per kg must be verified by real quotation.** Everything turns on it and it is one
   number. The RFQ is written and unsent (D-015).
3. **The basket must be ≥ 1 kg equivalent, and preferably a bundle.** The 3 × 250 g bundle is the
   best shape in every scenario. The single 250 g order is the worst use of a parcel.
4. **Repeat must be measured before any scale-up.** It is currently invented.
5. **Founder time must be treated as a cost.** The conservative scenario is the only one that does,
   and it is the only one that is negative.

---

## 6. Validation budget check (A2)

| Ceiling | What it buys at a 69.30 PLN median CPA |
|---|---|
| Lean 2,000 PLN | ~29 acquisitions — statistically useless for measuring repeat, and loss-making per order |
| Controlled pilot 5,000 PLN | ~72 acquisitions |
| Expanded pilot 10,000 PLN | ~144 acquisitions |

**None of these budgets can prove or disprove the repeat rate**, which is the one number that
decides the business. Spending them on paid acquisition would buy a known-negative result. The
cheapest credible validation is therefore *not* an ad test — it is designed in
[doc 18](18-commercial-feasibility-gate.md).

Encouraging counterweight: **entry to supply costs under ~850 PLN** (SUP-34) — 20 units at Lafaye
plus a 150 PLN label. Physical validation with real product is affordable inside even the lean
ceiling. The expensive thing here was never the coffee; it is the customer.

---

## 7. B2B — the channel that works, and the one decision that makes it work

The B2B research landed after the first draft of this document. It changes the conclusion.

**Polish B2B coffee is sold as a service, not as beans.** The default offer is a machine on loan
against a **2-4 kg/month** purchase commitment (B2B-01/02/03), legally restricted so that **only
the supplier's coffee may be brewed in the loaned machine** (tax ruling
0111-KDIB1-1.4010.187.2021.3.MF, B2B-04), on **12-36 month contracts** with exit penalties
(B2B-06, B2B-19). Rental is publicly priced at **115-650 PLN net/month** (B2B-05).

**INFERENCE, and it is the opening:** a "free" machine worth 115-650 PLN/month against a 3 kg/month
threshold is an implicit **38-117 PLN/kg surcharge buried in the bean price** (B2B-34) — larger
than a speciality roaster's entire gross margin. A beans-only supplier sells against that hidden
surcharge, not against the machine.

The beans-only segment is real: Tchibo publicly invites machine owners to a coffee-only
subscription (B2B-10), Kocham Kawe differentiates on having no purchase obligation (B2B-11), and
Coffeedesk's B2B arm reports **8,235 B2B clients / 67 m PLN a year** (B2B-21).

### B2B arithmetic — publication gate closed

The first comparison mixed incompatible price bases and is withdrawn. `b2bAccount()` now keeps its
publication gate closed until `taxModelStatus` and an explicit `priceBasis` are verified. Behind
that gate, the corrected mechanism holds buyer-effective revenue constant and treats registration
on the cost side: eligible gross coffee and delivery inputs are divided by `1 + vatRate` only when
input VAT is deductible. A regression test pins the contribution difference to exactly the
reclaimable input VAT on those lines.

This mechanism proves only the **direction** of the VAT effect. It does not publish a contribution,
payback or lifetime value because SUP-05's public 124 PLN/kg figure and B2B-14's 150 PLN/kg selling
benchmark do not state compatible net/gross bases. B2B remains a live hypothesis, not a proven or
disproven channel. Three explicit-basis supplier quotes and accountant review are required before
the gate may open.

### What is still invented here

Every B2B *sales* input remains an assumption: 6 hours per won account, 5 prospects per win, 25 PLN
samples, 0.5 h/month account management, 5% monthly churn, 15 PLN per local delivery. And the
150 PLN/kg price comes from a trade price-ladder article, not from a quote we hold — all Polish B2B
pricing is gated behind a login or a form (B2B-32). Beans-only also carries **no contractual
lock-in**, unlike the incumbents' 12-36 month contracts, so churn should be assumed **higher**, not
lower. These are exactly what the field test in [doc 18](18-commercial-feasibility-gate.md) §9
replaces with real numbers.
