# Codex review — Commercial Feasibility Gate 0

## Verdict

**Request changes.** The paid-acquisition B2C conclusion is directionally robust, but the
load-bearing B2B/VAT conclusion is not supported by the current model.

## P0 — VAT comparison uses incompatible bases

`b2bAccount()` increases revenue from 121.95 to 150 PLN/kg when `vatRegistered` becomes true,
but leaves the 124 PLN/kg gross coffee cost unchanged. A correct comparison must explicitly
define whether 150 PLN is net, gross, or buyer-effective cost, apply output VAT consistently,
and convert VAT-bearing inputs to deductible net costs only where legally deductible.

`B2B-14` supplies an indicative price band but does not identify a net/gross basis. `REG-10`
is a repository inference with no direct source. Consequently these claims must be withdrawn
until verified:

- VAT registration alone changes a 10 kg account from -60.50 to +220 PLN/month;
- non-VAT status creates an automatic 18.7% B2B price handicap;
- B2B is viable at the verified worst-case cost;
- VAT registration is free and reversible.

Official Polish guidance supports only the general mechanics: a VAT-exempt taxpayer does not
deduct input VAT; an active VAT taxpayer may deduct input VAT to the extent purchases support
taxable activity; returning to the exemption is time-restricted. Those facts do not select the
commercial price basis used in this model.

Primary references checked on 2026-08-21:

- Polish Ministry of Finance — [input VAT deduction and refund](https://www.podatki.gov.pl/podatki-firmowe/vat/poradniki-i-informatory/odliczenie-i-zwrot-podatku-vat/)
- Polish Ministry of Finance — [subjective VAT exemption](https://www.podatki.gov.pl/podatki-firmowe/vat/poradniki-i-informatory/zwolnienie-podmiotowe-od-podatku-vat/)
- `B2B-14` market-band page — [Kawa do restauracji](https://zwiadowca.pl/informacje/kawa-do-restauracji)

## P1 — parcel cost uses net instead of cash cost

The model says the company is VAT-exempt and works in gross cash costs, but `COST-09` supplied
11.09 PLN netto to `b2cParcelCost`. The same source row records 15.41 PLN brutto. The input is
now 15.41 PLN, reducing base 1 kg contribution from 14.57 to 10.25 PLN.

## P1 — model warning contradicts the documents

Every printed B2B table says its inputs are placeholders and no conclusion may be drawn, while
docs 00/01/05/18 and `PULL_REQUEST.md` make B2B/VAT the decisive conclusion. The documents must
follow the model's evidence boundary.

## P1 — required handoff was missing

`AGENTS.md` and `CLAUDE.md` require `docs/homie-coffee/HANDOFF.md`, but the file did not exist.
It has been created as an append-only journal.

## Required evidence before recalculation

1. A real B2B offer stating whether the price is net or gross and whether delivery/service is included.
2. A supplier invoice/quote stating gross price, net price, VAT rate, packaging and delivery.
3. Accountant confirmation of deductible inputs and the operational cost of active VAT status.
4. A scenario matrix comparing VAT/non-VAT at the same buyer-effective price, not different prices.
5. Automated assertions pinning each scenario and preventing mixed price bases.

## Secondary reproducibility gaps

- CPA constants are hard-coded in the script rather than loaded from a sourced parameter,
  despite the model's claim that every input carries `src` metadata.
- `sources.md` says its 213 claims were generated mechanically, but the raw research records
  and generator are not present in this branch, so that generation cannot be reproduced.
- The B2B market-band source does not label its displayed amounts net or gross and is an
  intermediary marketplace article, not a held supplier quotation.
