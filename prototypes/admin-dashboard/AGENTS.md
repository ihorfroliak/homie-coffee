# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when
the visual source is unclear or no longer matches the current goal. Durable product or architecture
decisions belong in `docs/homie-coffee/01-assumptions-questions-decisions.md`; this file records only
local implementation constraints for the throwaway prototype.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. D-023 is local-only: no hosting descriptor, worker adapter, datastore binding,
deployment command or external account belongs in this folder.

## Durable design decisions

- D-026 (2026-10-30): preserve supplied Shop/Admin designs as separate local preview pages.
  Their source ink/mint may differ from Option 1; do not replace shared brand tokens silently.
  See `design-import-qa.md` and the source manifest. The workspace index connects these previews
  with the existing operations view; their demo data is not synchronized.

- Ihor selected visual direction **Option 1** on 2026-08-21. The canonical reference is
  `reference/admin-dashboard-option-1.png`.
- Match the shared HeyHomie brand: Manrope; ink `#141338`; mint `#77ECC8`; indigo `#414483`;
  slate `#52516B`; light `#F6FBFF`; border `#EDEEEF`; pink `#EB4E87`.
- The Admin experience is desktop-first, dense and operational: dark sidebar, compact KPI strip,
  action queue as the primary surface, and urgent exceptions in a right rail.
- This folder is a non-production, mock-data prototype. It must not connect to real users, orders,
  pricing, payments, Fakturownia, Stripe, Gitea, or production infrastructure.
- Vite/React is deliberately throwaway for visual approval and shares no code path with D-006's
  approved Next.js modular monolith. Do not migrate prototype components into production by default.
- Hardcoded Polish copy is a known prototype limitation. The production slice starts with a Polish
  primary / English secondary translation seam; it must not retrofit i18n after components ship.
- Production dialogs require focus trapping, Escape dismissal and focus restoration. Popover/menu
  widgets require their full keyboard contract. Prototype behavior must not weaken those NFRs.
