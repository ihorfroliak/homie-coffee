# Homie Coffee Admin Dashboard — Design QA

**Date:** 2026-08-21  
**Scope:** selected desktop-first Admin Dashboard visual, Option 1  
**Reference:** `reference/admin-dashboard-option-1.png` (1487 × 1058 original)  
**Normalized comparison source:** `reference/admin-dashboard-option-1-1440x1024.png`  
**Implementation capture:** `implementation-dashboard.png` (1440 × 1024)  
**Combined comparison input:** `design-qa-comparison.png`

## Result

The implementation preserves the selected hierarchy and visual language: 200 px dark operational
sidebar, large page title, mint B2B order CTA, compact five-part KPI strip, dense action queue and
three-card exceptions rail. Brand colors, Manrope typography, compact radii, thin borders and
Phosphor line icons are consistent across the visible screen.

## Findings and resolution

| Severity | Surface | Finding | Resolution |
|---|---|---|---|
| P1 | Asset fidelity | The first implementation pass flattened the official Homie logo to monochrome, while Option 1 uses the gradient outline. | Kept the official source SVG and created the dark-surface variant by changing only its wordmark fills to white; the original gradient path remains intact. |
| P2 | Comparison | The generated source was 1487 × 1058 while the browser capture was 1440 × 1024, preventing a direct pass. | Added a high-quality normalized 1440 × 1024 reference and regenerated a single side-by-side comparison input. |
| P2 | Content | A polished dashboard could be mistaken for a live system. | Added the visible `Dane demonstracyjne · brak połączenia z produkcją` label and an explicit non-persistence note in the create-order dialog. |
| P2 | Browser metadata | The starter title was `Prototype`. | Replaced it with `Homie Coffee · Centrum operacyjne`. |

No open P0, P1 or P2 fidelity finding remains in the selected desktop scope.

## Functional checks

- Primary CTA opens the labelled `Dodaj zamówienie B2B` dialog.
- Required company, weight and gross-value inputs accept data and submit.
- Submission inserts a new action-queue row and exposes a success status message.
- Type filter reduces the table to the selected operational category.
- Row overflow menu opens and the assignment action returns confirmation.
- Sidebar, notifications, help, profile, exception shortcuts, export and secondary links return
  prototype feedback instead of dead controls.
- Console: 0 errors and 0 warnings during the checked flow.
- Accessibility smoke: semantic navigation/main/region/table/dialog roles; labelled inputs and icon
  buttons; visible keyboard focus; no unlabelled form input.

## Viewport and resilience

- Visual fidelity was judged at the selected desktop state using the normalized 1440 × 1024 pair.
- The browser default 1280 × 720 smoke check showed no document-level horizontal overflow.
- CSS includes explicit 1180 px, 900 px and 640 px transitions for collapsed navigation, stacked
  right rail, single-column forms and mobile horizontal navigation. The production Admin remains
  desktop-first, as approved.

## Evidence

- `design-qa-comparison.png` contains reference and implementation in the same visual input.
- `npm run build` succeeds.
- `npm run test:sites` passes all 4 packaging/runtime tests.
- Main interaction flow and filter/menu flow pass in the in-app browser.

**final result: passed**
