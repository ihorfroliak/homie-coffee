# Homie Coffee

Coffee commerce for Poland, explored for B2C and B2B within the Homie ecosystem.

**Current phase: commercial validation, specification and local prototypes.** Technology is
approved (D-006); production implementation and launch remain gated (D-024). This repository
contains research and a working economics model, not a live shop.

Research, decisions, prompts and development now continue together in Codex. Claude review is
optional (D-025). Ihor makes business decisions and merges changes.

## Start here

- [Working brief in Ukrainian](docs/homie-coffee/WORKING-BRIEF.uk.md): business flows, decision
  status, ideas, next actions and a reusable development prompt.
- [Decision register](docs/homie-coffee/01-assumptions-questions-decisions.md): facts, hypotheses,
  approvals and unresolved questions.
- [Latest handoff](docs/homie-coffee/HANDOFF.md): actual verification and next owner.
- [Gate 0](docs/homie-coffee/18-commercial-feasibility-gate.md) and
  [source register](docs/homie-coffee/sources.md): research provenance and economic limitations.
- [Design import](design/sources/2026-10-30/README.md): supplied exports, provenance and limitations.
- [Operating rules](AGENTS.md) and [workflow](docs/homie-coffee/17-agent-interop.md).

## Local workspace

From the repository root, `npm ci`, then `npm --prefix prototypes/admin-dashboard run dev`.
Vite binds only to `127.0.0.1`. The workspace links to:

- `/shop.html`: supplied Shop design, with local demo interactions.
- `/admin-lab.html`: supplied event/email/roast/profile concepts.
- `/?view=operations`: the existing Option 1 operational dashboard.

`npm run check` runs economics and design-import regression tests, all six model scenarios and the full local
prototype build. B2B outputs remain `unresolved` until explicit-basis quotes and accountant review.
Production lint/typecheck, database integration and Playwright suites do not exist yet.

The prototype is disposable Vite/React; it is not the approved Next.js production scaffold.
Refresh resets demo state. No real payments, orders, customer records, integrations or deployment.
