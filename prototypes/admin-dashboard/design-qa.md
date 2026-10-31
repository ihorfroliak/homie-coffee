# Homie Coffee Admin Dashboard — Design QA

The separate 2026-10-30 Shop/Admin export import is covered in
[design-import-qa.md](design-import-qa.md). This historical Option 1 review remains unchanged below.

**Date:** 2026-08-22
**Scope:** selected desktop-first Admin Dashboard visual, Option 1
**Reference:** `reference/admin-dashboard-option-1.png` (1487 × 1058 original)
**Normalized comparison source:** `reference/admin-dashboard-option-1-1440x1024.png`
**Historical implementation capture:** `implementation-dashboard.png` (1440 × 1024)
**Historical comparison input:** `design-qa-comparison.png`

## Result

The reviewed implementation preserves the selected hierarchy and visual language: 200 px dark operational
sidebar, large page title, mint B2B order CTA, compact five-part KPI strip, dense action queue and
three-card exceptions rail. Brand colors, Manrope typography, compact radii, thin borders and
Phosphor line icons are consistent across the visible screen.

The reference's unsupported “Składka na FUNDACJĘ” card was intentionally replaced by the real
`D-024` pilot-readiness gate. The committed PNGs remain evidence of the selected visual direction,
not byte-current screenshots after this domain correction.

## Findings and resolution

| Severity | Surface | Finding | Resolution |
|---|---|---|---|
| P1 | Asset fidelity | The first implementation pass flattened the official Homie logo to monochrome, while Option 1 uses the gradient outline. | Kept the official source SVG and created the dark-surface variant by changing only its wordmark fills to white; the original gradient path remains intact. |
| P2 | Comparison | The generated source was 1487 × 1058 while the browser capture was 1440 × 1024, preventing a direct pass. | Added a high-quality normalized 1440 × 1024 reference and regenerated a single side-by-side comparison input. |
| P2 | Content | A polished dashboard could be mistaken for a live system. | Added the visible `Dane demonstracyjne · brak połączenia z produkcją` label and an explicit non-persistence note in the create-order dialog. |
| P2 | Browser metadata | The starter title was `Prototype`. | Replaced it with `Homie Coffee · Centrum operacyjne`. |
| P1 | Domain truth | The reference introduced an unsupported foundation contribution and production-looking company/order identifiers. | Replaced the KPI with the D-024 evidence gate and renamed all entities, lots, deliveries and references with an explicit `Demo`/`DEMO-` prefix. |
| P1 | Accessibility | The modal did not trap focus, close via Escape or restore focus; menu roles promised unsupported behavior. | Added focus trapping, Escape dismissal and trigger restoration; removed invalid menu roles and added accessible labels for icon-only table cells. |
| P2 | Runtime scope | A Sites/worker deploy path contradicted D-023's local-only prototype boundary. | Removed `.openai/`, worker, packaging script and deployment tests; Vite binds to `127.0.0.1` only. |
| P2 | Data semantics | Demo counts were duplicated or derived from phantom rows. | Centralised explicit demo summary values and labelled the aggregates as demonstrative; production derived-metric logic remains out of scope. |

No open P0, P1 or P2 fidelity finding remains in the selected desktop scope.

## Functional checks

- Primary CTA opens the labelled `Dodaj zamówienie B2B` dialog.
- Required company, weight and gross-value inputs accept data and submit.
- Submission inserts a new action-queue row and exposes a success status message.
- Repeated notifications each retain their own full 3.2 s duration; the prior timer is cancelled.
- Type filter reduces the table to the selected operational category.
- Row overflow menu opens, closes with Escape and the assignment action returns confirmation.
- Sidebar, notifications, help, profile, exception shortcuts, export and secondary links return
  prototype feedback instead of dead controls.
- Console: 0 errors and 0 warnings during the checked flow.
- Accessibility smoke: semantic navigation/main/region/table/dialog roles; labelled inputs and icon
  buttons; focus wraps inside the dialog in both directions; Escape closes it and returns focus to
  `Nowe zamówienie B2B`; screen-reader text names type icons and the actions header.

## Viewport and resilience

- Visual fidelity was judged at the selected desktop state using the normalized 1440 × 1024 pair.
- The browser default 1280 × 720 smoke check showed no document-level horizontal overflow.
- CSS includes explicit 1180 px, 900 px and 640 px transitions for collapsed navigation, stacked
  right rail, single-column forms and mobile horizontal navigation. The production Admin remains
  desktop-first, as approved.

## Evidence

- `design-qa-comparison.png` preserves the originally selected visual direction; the intentional
  D-024 KPI substitution is documented above.
- Root `npm run check` runs 5 unit-economics tests, the gated model, and the Vite build.
- Main modal/form, focus trap, Escape restoration, filter/menu and repeated-toast flows pass in the
  in-app browser at 1280 px with no document-level horizontal overflow.
- Browser console: 0 warnings and 0 errors.

**final result: passed**
