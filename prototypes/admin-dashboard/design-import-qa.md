# Design import QA — 2026-10-31

Scope: D-026, local integration of the supplied coffee exports and preservation of Option 1.
This is not production acceptance or an accessibility certification.

## Result

**Import/build and tested desktop demo flows pass. Full product QA remains incomplete.**
The exported designs still have inherited non-semantic controls and unverified business copy.
The next component/state slice must address them before a production implementation can use the
design. Source files remain pinned; the adapter does not silently change business rules.

## Visual comparison

Compared at 1480 × 1060, the source's declared preview size. Reference captures render the
sanitized source template with its original fixed ChromeWindow using the local dependency
bridge; they are not independent captures from the original design authoring tool.

- [Shop reference](reference/import-2026-10-30/shop-reference.png) and
  [integrated Shop](reference/import-2026-10-30/shop-integrated.png).
- [Admin reference](reference/import-2026-10-30/admin-reference.png) and
  [integrated Admin](reference/import-2026-10-30/admin-integrated.png).
- [Workspace](reference/import-2026-10-30/workspace.png),
  [phone workspace](reference/import-2026-10-30/workspace-phone.png),
  [phone Shop](reference/import-2026-10-30/shop-phone.png),
  [tablet Shop](reference/import-2026-10-30/shop-tablet.png).

Typography (Manrope 500–800), hierarchy, source palette, radii, spacing, source icons, browser
frame and content order match in the inspected desktop states. The integrated page adds a
42px demo/navigation strip above the canvas. No photos were supplied; the original image-slot
placeholders remain. The independent archive thumbnail also depicts the same Admin event layout.
New workspace uses the existing Option 1 palette and Phosphor icons; it is a new index, not a
claimed replica of a supplied screenshot.

At 768 × 1024 the Shop frame fits the viewport and the hero stacks. At 390 × 844, Telefon mode
fits without page-level horizontal overflow. Initial inspection found the cart clipped by the
brand/header width; the adapter now shows the HC brand mark, reduces header gaps, and releases
the source's 320px minimum content width. The final phone capture shows both menu and cart.
Telefon remains a manual source-preview toggle; resizing is not a complete automatic device-mode
system. Not every exported screen or Admin mobile state was checked.

## Browser checks actually performed

Using the in-app browser on local Vite `127.0.0.1:5174`:

1. Workspace links open Shop, Admin Lab and the original operational dashboard.
2. Shop home → catalogue shows six lots. `kwiatowa` filter shows `1 z 6 lotów`.
3. Open Yirgacheffe product → add to existing demo basket: Guji 52.00 + Yirgacheffe 56.00 =
   108.00 PLN products; InPost 12.99; total 120.99. These are source demo prices only.
4. `Przejdź do płatności` → `Zapłać 120,99 zł — BLIK` → `Zamówienie przyjęte`.
   This source handler only changes local state; no real transaction is configured.
5. Close basket → quiz question 1 → `Czarna` → question 2 with brewing-method options.
   Quiz completion/recommendation quality was not tested.
6. Admin events view renders 13 source event names and fictional KPI counts. Email cycle D3
   expands to its recipe copy and condition. Profile recommendation changes button text to
   `Wpisana w subskrypcję`. Queue view renders six lots, 134kg and its shortage warning.
   Queue editing/locking was not exercised.
7. Original Option 1 route renders its sidebar, operational heading and action controls.
   Its prior focus/menu limitations were not re-tested or changed.

The three surfaces remain independent in-memory demos. No claim is made of live analytics,
email delivery, shared orders or synchronized state. A Shop console error/warning inspection
returned `[]` during the initial desktop smoke; this is not a full network/security audit.

## Automated checks and remaining work

- `npm run check`: final run exit 0; **8 tests, 8 pass, 0 fail**, 18 B2B rows across six scenarios
  remain unresolved; Vite **4588 modules transformed**, **built in 25.32s**.
- New import tests check all six pinned source hashes, preservation of embedded demo logic,
  removal of remote bootstrap/font loaders, local entry module, noindex/demo/form boundaries.
- An initial build failed because top-level await exceeded Vite's default target. The bootstrap
  now uses an async function with a visible failure message; the final build above passes.
- No new dependencies. React checklist: stable keys in the new workspace; scoped styles; native
  links, headings and focus-visible; errors handled in the export bootstrap; source pages load
  separately. Source helpers are isolated legacy imports, not endorsed production React patterns.
- Full keyboard/focus accessibility remains open: source click targets are mostly `div`s, menu
  and cart lack a complete focus contract. Product photos, accurate commercial copy, PL/EN,
  robust money logic, shared demo events and native component decomposition remain future work.
- Production lint, typecheck, PostgreSQL and Playwright suite: **not run / not present**. No
  production analytics or SEO acceptance was claimed; local pages explicitly use noindex.
