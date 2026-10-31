# Supplied Homie Coffee designs — 2026-10-30

Provenance: Ihor's `Homie Coffee.zip` and separate `Homie Coffee - Sklep.dc.html` and
`Homie Coffee - Panel admina.dc.html` attachments. Both separate HTML files match their ZIP
entries byte for byte. Original hashes and tracked-copy hashes are recorded in `manifest.json`.
No attached instruction, including `github.md`, was adopted as project policy.

Byte-exact originals and all 37 archive entries are preserved locally in
`.local/design-imports/2026-10-30/` (ignored). This repository stores the two coffee designs and
their supplied rendering helpers. Customer-like author/profile names and the example delivery
address are replaced by explicit DEMO values in tracked HTML copies. The mixed-product archive
and its contact/address examples are not published. The full archive remains in Downloads too.

## Integration

`prototypes/admin-dashboard/scripts/prepare-designs.mjs` verifies checksums and generates the
ignored Shop/Admin HTML entry points before both dev and build. It removes remote font/runtime
loaders, supplies the installed React and Manrope, adds noindex and a persistent demo notice,
and restricts resource requests to local assets. The source runtime still evaluates its embedded
design logic: this adapter accepts only the reviewed, checksum-pinned files; it is not an upload
feature or a production rendering architecture. The unchanged helpers retain source attribution.

The adapter preserves the export's content, visual palette and in-memory interactions. The
browser frame fits the available viewport; `?reference=1` preserves its original fixed canvas
for source comparison. The source's Telefon toggle remains available. The three prototypes have
independent demo states; a Shop interaction does **not** update the Admin Lab's static counts.

## Design evidence, not commercial facts

- Shop: home, catalogue, product, five-question quiz, brewing guides/calculator, equipment,
  specialty education, roasting explanation, subscription concept, account, FAQ and packaging.
- Admin Lab: proposed events, lifecycle messages, roasting queue and sample taste profile.
- Palette in these exports: ink `#14133A`, mint `#36F0C7`, Manrope. Existing Option 1 uses
  `#141338` / `#77ECC8`; no global brand-token replacement is approved by this import.
- The ZIP contains **no product photos or image-slot state file**. Supplied placeholders remain.
  Inline illustrations already in the source are preserved; no new product imagery was invented.
- Origin/roast dates, prices, VAT labels, delivery/returns promises, freshness claims, recipes,
  statistics and testimonials are unverified proposal copy. They must be reviewed before public
  use. A persistent DEMO label does not make that copy suitable for launch.
- A self-operated roastery/green inventory contradicts current private-label MVP assumptions.
  Subscription billing, workshops, referral credits and equipment are ideas, not approved scope.
- Most exported click targets are `div`s. Import preserves them; full keyboard semantics,
  dialog focus, PL/EN and decomposition remain subsequent work, tracked in the working brief.

## Cross-product references inspected

The source list in the manifest identifies all archive reference files. Read-only inspection of
`uploads/+ System Spec.dc.html` finds separate state machines, permission, synchronization and
audit sections (318ff, 362ff, 384ff); `+ System Map.dc.html` describes client/worker/admin views
of a status transition. `HeyHomie Web - Client Account v3.dc.html` contains status,
timeline and billing surfaces (537ff, 640ff). These support candidate patterns: explicit states,
next action, timeline, consistent summary/detail, and documented role boundaries.

These are observations of supplied mockups, not proof of how a live HeyHomie service works.
No Homies-specific implementation has been independently verified. Reuse of its patterns remains
a research item. No shared users, credentials, customer lists, prices or service-specific rules
are copied into coffee. See the working brief for proposed adaptations.
