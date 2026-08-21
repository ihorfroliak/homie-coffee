# 00 — Executive summary (Commercial Feasibility Gate 0)

**Date:** 2026-08-21 · **Branch:** `claude/commercial-feasibility-gate-0` · **Decision-maker:** Ihor

---

## Verdict: **GO WITH CONDITIONS** — for a B2B-led business. **NO-GO** for paid-acquisition B2C.

Full reasoning and the ten required answers: [`18-commercial-feasibility-gate.md`](18-commercial-feasibility-gate.md).

## The three things that matter

**1. Paid-search B2C is arithmetically unavailable.** The median Polish Google Ads CPA is
**69.30 PLN** (PMax) / **86.46 PLN** (Search). The best B2C order shape contributes **20.31 PLN**
in the base scenario. LTV/CAC peaks at **0.43**, and even the optimistic ceiling reaches only
**1.03**. For one order to cover a median CPA, coffee would have to cost **~50 PLN/kg** — under
half the only publicly quoted private-label price, and below green arabica plus roasting. This is
not a tuning problem.

**2. B2B works — but only if the company registers for VAT.** A non-VAT payer gives a business
buyer nothing to deduct, so the price must be ~18.7% lower to cost that buyer the same. Same
coffee, same customer, same **verified worst-case** cost of 124 PLN/kg with founder labour charged:

| 10 kg/month B2B account | Monthly contribution | Payback |
|---|--:|--:|
| Non-VAT payer (current status) | **−60.50 PLN** | never |
| VAT-registered | **+220.00 PLN** | **1.9 months** |

A free, reversible administrative decision is the difference between a channel that works and one
that cannot.

**3. The opening is real, and it is the incumbents' own lock-in.** Polish B2B coffee is sold as a
machine on loan against a 2–4 kg/month purchase commitment, legally restricted so only the
supplier's coffee may be brewed in it, on 12–36 month contracts. A "free" machine is an implicit
**38–117 PLN/kg surcharge** buried in the bean price. A beans-only supplier with no machine, no
contract and no minimum sells against a hidden surcharge larger than a speciality roaster's entire
gross margin.

## What this changes about the plan

**The preferred hypothesis was half right.** Beans-only, machine-owning businesses, Kraków, no
machine leasing — all correct and better supported than expected. **"B2C validation first" is the
part that fails.** Recommendation: **invert the order — B2B first, B2C second and organic.**

Also supported by evidence: **A9 was right** to downgrade the subscription engine — only 2 of 5
Polish coffee subscriptions run true card-on-file billing; the rest are prepaid blocks or manual
arrangements. **A3 was right** to forbid reusing HeyHomie customer data — consent for a cleaning
brand very likely does not extend to a coffee product, and that needs a lawyer.

Abandon: **resale** (worse margin, and no wholesale programme permits relabelling — it builds
someone else's brand) and **dropshipping** (no Polish supplier publishes terms; unmodellable).

## The gamble, stated plainly

**Everything rests on one number with one public data point.** Private-label cost of 124 PLN/kg
comes from a single roaster's page that calls it an average. Zero of eight wholesalers publish a
price per kilogram. If real quotes come back above 124 PLN/kg, the B2C business is dead and B2B is
marginal.

The saving grace: **finding out costs under 850 PLN.** One Polish roaster produces private label
from 20 units — and from zero with client-supplied labels. The barrier in Poland is artwork, not
volume.

## What to approve

| ID | Decision | Recommendation |
|---|---|---|
| **D-016** | Register Omnomnom sp. z o.o. for VAT voluntarily | **Yes, if B2B proceeds** |
| **D-017** | Invert the launch order — B2B first, B2C organic second | **Yes** |
| **D-018** | Authorise **≤2,000 PLN** validation, **none on advertising** | **Yes** |
| **D-019** | Approve sending the drafted RFQ to 5 named roasters | **Yes** — free, closes the critical gap |
| **D-021** | Trademark search on "Homie" class 30 before any brand spend | **Yes** — currently unverified |

Nothing gets built until the field test returns. MVP scope, technology, advertising and roadmap
all remain deferred.

## The experiment

Eight weeks, ≤2,000 PLN, no store, no ads, no code: quote 5 roasters · search the trademark ·
ask an accountant about VAT · file the free sanepid registration · buy a ~850 PLN pilot batch ·
walk into **30 Kraków machine-owning businesses** with samples.

**Continue if:** ≥3 quotes ≤110 PLN/kg · ≥3 paying accounts at ≥5 kg/month from 30 approaches ·
achieved price ≥140 PLN/kg · no trademark conflict · VAT registration confirmed available.

**Stop if:** all quotes >130 PLN/kg (NO-GO entirely) · fewer than 1 account from 30 approaches ·
trademark conflict.

---

## Documents in this gate

| Doc | Contents |
|---|---|
| [01 — assumptions, questions, decisions](01-assumptions-questions-decisions.md) | facts vs assumptions; the rejected 40–60k PLN figure; decision register |
| [02 — market and competitors](02-market-and-competitors.md) | supply routes, price bands, the 149 PLN threshold, subscription mechanics |
| [05 — business model and unit economics](05-business-model-and-unit-economics.md) | the arithmetic, six scenarios, break-even solve |
| [14 — regulatory and legal blockers](14-security-privacy-and-legal-risks.md) | KSeF, VAT, sanepid, labelling, EUDR, GPSR, GDPR, trademark |
| [18 — the gate](18-commercial-feasibility-gate.md) | **the conclusion and the ten required answers** |
| [sources.md](sources.md) | 213 claims, each with link, date, tag and confidence |
| [model/](model/unit-economics.mjs) | the re-runnable model, its inputs, and the unsent supplier RFQ |

Re-run the arithmetic and disagree with it:

```bash
node docs/homie-coffee/model/unit-economics.mjs --all
```
