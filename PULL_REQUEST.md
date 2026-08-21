# Commercial Feasibility Gate 0 — GO WITH CONDITIONS (B2B-led) / NO-GO (paid B2C)

Gate 0 only. No product specification, no technical architecture, no SEO roadmap, no advertising
implementation, no production code. Nothing built, nothing bought, nobody contacted, nothing spent.

**Do not merge without reviewing the arithmetic.** Re-run it:

```bash
node docs/homie-coffee/model/unit-economics.mjs --all
```

## Conclusion

| | Verdict |
|---|---|
| B2B beans-only, Kraków, businesses that already own machines | **viable at the verified worst-case cost** — +220 PLN/month on a 10 kg account, 1.9-month payback, **if the company registers for VAT** |
| B2C via paid search | **not viable at any obtainable supply price** — coffee would have to cost ~50 PLN/kg to cover a 69.30 PLN median CPA |
| B2C via organic / warm / marketplace | plausible, unproven — the repeat rate it depends on is invented |
| Resale of another roaster's brand | abandon — worse margin, and no wholesale programme permits relabelling |
| Dropshipping | unevidenced — no Polish supplier publishes terms |

## The finding that matters most

A non-VAT payer gives a business buyer nothing to deduct, so the price must be ~18.7% lower to cost
that buyer the same. Same coffee, same customer, same **verified** 124 PLN/kg cost with founder
labour charged:

| 10 kg/month B2B account | Monthly contribution | Payback |
|---|--:|--:|
| Non-VAT payer (current status) | **−60.50 PLN** | never |
| VAT-registered | **+220.00 PLN** | **1.9 months** |

A free, reversible administrative decision is the difference between a channel that works and one
that cannot.

## This contradicts the preferred hypothesis, deliberately

Beans-only, machine-owning businesses, Kraków, no machine leasing — all correct and better
supported than expected. **"B2C validation first" is the half that fails.** Recommendation: invert
the order, B2B first.

## What is in this PR

| File | What |
|---|---|
| `docs/homie-coffee/00-executive-summary.md` | the verdict in one page |
| `docs/homie-coffee/01-assumptions-questions-decisions.md` | facts vs assumptions; the rejected 40–60k PLN figure; decision register D-001…D-022 |
| `docs/homie-coffee/02-market-and-competitors.md` | supply routes, price bands, the 149 PLN threshold, subscription mechanics |
| `docs/homie-coffee/05-business-model-and-unit-economics.md` | the arithmetic, six scenarios, break-even solve |
| `docs/homie-coffee/14-security-privacy-and-legal-risks.md` | KSeF, VAT, sanepid, labelling, EUDR, GPSR, GDPR, trademark |
| `docs/homie-coffee/18-commercial-feasibility-gate.md` | **the gate — conclusion plus the ten required answers** |
| `docs/homie-coffee/sources.md` | 213 claims, each with link, publication date, access date, fact/estimate/inference tag, confidence |
| `docs/homie-coffee/model/` | the re-runnable model, its inputs, and the drafted-but-unsent supplier RFQ |

`sources.md` is generated mechanically from the research records, so a citation cannot drift from
the claim it supports.

## Decisions requested

| ID | Decision | Recommendation |
|---|---|---|
| D-016 | Register Omnomnom sp. z o.o. for VAT voluntarily | **Yes, if B2B proceeds** |
| D-017 | Invert the launch order — B2B first, B2C organic second | **Yes** |
| D-018 | Authorise ≤2,000 PLN validation, none on advertising | **Yes** |
| D-019 | Approve sending the drafted RFQ to 5 named roasters | **Yes** — free, closes the critical gap |
| D-021 | Trademark search on "Homie" class 30 before any brand spend | **Yes** — currently unverified |

## Known weaknesses, stated in the documents themselves

- The whole model rests on **one** public cost figure (124 PLN/kg) that its own source calls an
  average. Zero of eight wholesalers publish a price per kilogram.
- The CPA benchmark is an all-category median cost per *conversion*, not a coffee CAC.
- The B2C repeat rate (30%) and every B2B sales assumption are invented and flagged as such.
- The trademark position is **unverified** — EUIPO returned 403, TMview reset the connection.
- Four competitors could not be verified (403/404/TLS failures); their pricing is absent, not zero.
