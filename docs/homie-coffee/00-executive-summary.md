# 00 — Executive summary (Commercial Feasibility Gate 0)

**Date:** 2026-08-21 · **Branch:** `claude/commercial-feasibility-gate-0` · **Decision-maker:** Ihor

---

## Verdict: **B2B INCOMPLETE — EVIDENCE REQUIRED. NO-GO** for paid-acquisition B2C.

Full reasoning and the ten required answers: [`18-commercial-feasibility-gate.md`](18-commercial-feasibility-gate.md).

## The three things that matter

**1. Paid-search B2C is arithmetically unavailable.** The median Polish Google Ads CPA is
**69.30 PLN** (PMax) / **86.46 PLN** (Search). The best B2C order shape contributes **15.99 PLN**
in the corrected base scenario. LTV/CAC peaks at **0.33**, and even the optimistic ceiling reaches
only **0.93**. For one order to cover a median cost per conversion, coffee would have to cost
**~50 PLN/kg** — under
half the only publicly quoted private-label price, and below green arabica plus roasting. This is
not a tuning problem.

**2. B2B is a live but unproven hypothesis.** The first VAT comparison mixed incompatible price
bases and is withdrawn. The corrected mechanism holds buyer-effective revenue constant and puts
the VAT effect on eligible input costs: registration makes their input VAT deductible. It does
**not** prove that B2B is viable. The only public private-label price and the B2B selling benchmark
both omit an explicit net/gross basis; three real quotes and an accountant are required before the
model may publish a B2B margin or payback.

**3. The opening is real, and it is the incumbents' own lock-in.** Polish B2B coffee is sold as a
machine on loan against a 2–4 kg/month purchase commitment, legally restricted so only the
supplier's coffee may be brewed in it, on 12–36 month contracts. A "free" machine is an implicit
**38–117 PLN/kg surcharge** buried in the bean price. A beans-only supplier with no machine, no
contract and no minimum sells against a hidden surcharge larger than a speciality roaster's entire
gross margin.

## What this changes about the plan

**The preferred hypothesis remains testable, not approved.** Beans-only, machine-owning businesses,
Kraków and no machine leasing are supported as a validation target. Paid-acquisition B2C fails,
but the evidence does not yet justify assuming B2B-first. D-017 stays open until supplier quotes
and accountant review close the economics.

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
| **D-016** | Ask the accountant whether Omnomnom should register voluntarily | **Required before decision** |
| **D-017** | Invert the launch order — B2B first, B2C organic second | **Hold — B2B economics unresolved** |
| **D-018** | Authorise **≤2,000 PLN** validation, **none on advertising** | **Yes** |
| **D-019** | Approve sending the drafted RFQ to 5 named roasters | **Yes** — require explicit net/gross basis |
| **D-021** | Trademark search on "Homie" class 30 before any brand spend | **Yes** — currently unverified |

No production vertical slice starts until ≥3 roaster quotes state net/gross explicitly, the VAT
position is accountant-reviewed, and D-003–D-005/D-008 are approved. The local prototype and
specification may continue; Slice A remains proposed, not approved.

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
