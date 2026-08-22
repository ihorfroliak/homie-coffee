# Gate 0 correction + reviewed Admin prototype — B2B unresolved / paid B2C NO-GO

This branch contains the corrected Gate 0 evidence/model, approved D-006 architecture decision and
a local throwaway Admin design prototype. It contains **no production application, infrastructure,
external account, production database, secret, CI or deployment**. Nothing was bought, nobody was
contacted and nothing was spent.

**Do not merge without reviewing the arithmetic.** Re-run it:

```bash
node docs/homie-coffee/model/unit-economics.mjs --all
```

## Conclusion

| | Verdict |
|---|---|
| B2B beans-only, Kraków, businesses that already own machines | **live but unproven** — supplier and selling benchmarks lack compatible net/gross bases; publication gate closed |
| B2C via paid search | **not viable at any obtainable supply price** — coffee would have to cost ~50 PLN/kg to cover a 69.30 PLN median CPA |
| B2C via organic / warm / marketplace | plausible, unproven — the repeat rate it depends on is invented |
| Resale of another roaster's brand | abandon — worse margin, and no wholesale programme permits relabelling |
| Dropshipping | unevidenced — no Polish supplier publishes terms |

## The finding that matters most

The first B2B/VAT comparison mixed incompatible price bases and is withdrawn. The corrected model
holds buyer-effective revenue constant and changes only eligible input-cost deductibility when VAT
status changes. A regression test pins that mechanism, but the model still emits no B2B result:
SUP-05 and B2B-14 omit compatible net/gross bases. Obtain ≥3 explicit-basis roaster quotes and an
accountant-reviewed VAT position before publishing any B2B contribution or payback.

## This contradicts the preferred hypothesis, deliberately

Beans-only, machine-owning businesses, Kraków and no machine leasing remain a sensible validation
target. Paid-acquisition B2C fails. D-017 remains open: this branch does not assume B2B-first.

## What is in this PR

| File | What |
|---|---|
| `docs/homie-coffee/00-executive-summary.md` | the verdict in one page |
| `docs/homie-coffee/01-assumptions-questions-decisions.md` | facts vs assumptions; the rejected 40–60k PLN figure; decision register through D-024 |
| `docs/homie-coffee/02-market-and-competitors.md` | supply routes, price bands, the 149 PLN threshold, subscription mechanics |
| `docs/homie-coffee/05-business-model-and-unit-economics.md` | the arithmetic, six scenarios, break-even solve |
| `docs/homie-coffee/14-security-privacy-and-legal-risks.md` | KSeF, VAT, sanepid, labelling, EUDR, GPSR, GDPR, trademark |
| `docs/homie-coffee/18-commercial-feasibility-gate.md` | **the gate — conclusion plus the ten required answers** |
| `docs/homie-coffee/sources.md` | 213 claims, each with link, publication date, access date, fact/estimate/inference tag, confidence |
| `docs/homie-coffee/model/` | the re-runnable model, its inputs, and the drafted-but-unsent supplier RFQ |
| `prototypes/admin-dashboard/` | local-only Vite/React visual prototype; mock data, no deploy path or production lineage |
| `docs/homie-coffee/reviews/2026-08-22-codex-claude-review-fixes-response.md` | disposition of Claude's 2 P0, 4 P1, 14 P2 and 4 P3 findings |

`sources.md` was assembled from research claim records during the evidence workflow. The raw records
and generator are not committed, so the generation process is not reproducible from this branch.

## Decisions requested

| ID | Decision | Recommendation |
|---|---|---|
| D-016 | Register Omnomnom sp. z o.o. for VAT voluntarily | **Accountant review required** |
| D-017 | Invert the launch order — B2B first, B2C organic second | **Hold — B2B unresolved** |
| D-018 | Authorise ≤2,000 PLN validation, none on advertising | **Yes** |
| D-019 | Approve sending the drafted RFQ to 5 named roasters | **Yes** — every quote must state net/gross basis |
| D-021 | Trademark search on "Homie" class 30 before any brand spend | **Yes** — currently unverified |

## Known weaknesses, stated in the documents themselves

- The whole model rests on **one** public cost figure (124 PLN/kg) that its own source calls an
  average. Zero of eight wholesalers publish a price per kilogram.
- The CPA benchmark is an all-category median cost per *conversion*, not a coffee CAC.
- The B2C repeat rate (30%) and every B2B sales assumption are invented and flagged as such.
- The trademark position is **unverified** — EUIPO returned 403, TMview reset the connection.
- Four competitors could not be verified (403/404/TLS failures); their pricing is absent, not zero.
