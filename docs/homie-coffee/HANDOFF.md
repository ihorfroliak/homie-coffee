# Homie Coffee handoff journal

Append-only coordination record for Claude Code, Codex and Ihor.

## 2026-08-21 — Codex independent Gate 0 model audit

- **Branch:** `codex/gate0-model-audit`, based on Claude commit `906ddeb`.
- **Status:** review work; not merged, not pushed, not deployed.
- **Scope:** reproduce Gate 0 calculations and test load-bearing VAT/B2B assumptions.
- **Confirmed:** the model runs deterministically; paid-B2C remains unattractive.
- **Critical finding:** the VAT comparison mixes price bases and does not account for output
  VAT and deductible input VAT consistently. `B2B-14` does not state whether 150 PLN/kg is
  net or gross. Therefore `-60.50 → +220 PLN/month`, D-016's quantified benefit, and the
  “B2B viable at worst-case cost” conclusion are not currently proven.
- **Confirmed cost defect:** `COST-09` was stored as 11.09 PLN netto even though the current
  VAT-exempt company pays the displayed 15.41 PLN brutto. Correcting it reduces the base
  1 kg B2C contribution from 14.57 to 10.25 PLN; the paid-B2C NO-GO direction is unchanged.
- **Safety change:** B2B results now remain unresolved until an explicit price basis is supplied.
- **Tests run:** `node --test tests/unit-economics.test.mjs` — 3 passed, 0 failed;
  `node docs/homie-coffee/model/unit-economics.mjs --all` — exit 0, all B2B rows explicitly
  unresolved; `git diff --check` — exit 0.
- **Not done:** no product code, supplier contact, spend, VAT registration, merge, push or deploy.
- **Next owner:** Claude Code should correct docs 00/01/05/14/18 and the PR body so VAT/B2B is
  an accountant- and quote-gated hypothesis rather than the decisive Gate 0 result.
