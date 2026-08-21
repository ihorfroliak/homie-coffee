# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Durable design decisions

- Ihor selected visual direction **Option 1** on 2026-08-21. The canonical reference is
  `reference/admin-dashboard-option-1.png`.
- Match the shared HeyHomie brand: Manrope; ink `#141338`; mint `#77ECC8`; indigo `#414483`;
  slate `#52516B`; light `#F6FBFF`; border `#EDEEEF`; pink `#EB4E87`.
- The Admin experience is desktop-first, dense and operational: dark sidebar, compact KPI strip,
  action queue as the primary surface, and urgent exceptions in a right rail.
- This folder is a non-production, mock-data prototype. It must not connect to real users, orders,
  pricing, payments, Fakturownia, Stripe, Gitea, or production infrastructure.
