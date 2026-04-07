---
phase: 03-visual-overhaul-content-fixes
plan: 02
subsystem: ui
tags: [nextjs, react, tailwind, typography, design-system]

# Dependency graph
requires:
  - phase: 03-01
    provides: CSS utility tokens (text-ivory-deep, text-muted-light, editorial-card, section-bg-dark, etc.)
provides:
  - Corrected programme array (Entrance at 19:30, Bouquet toss removed)
  - "Colourful Semi-Formal" dress code wording across all surfaces
  - Gradient-tinted column backgrounds in DetailsSection (bloom/sky/sunflower palette)
  - Sharp corners on HeroSection badge and CTA button (rounded-sm)
affects: [03-03, 03-04, gallery, rsvp-admin]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Gradient column tinting using inline style with low-opacity rgba values (0.07-0.10)"
    - "rounded-sm for all interactive elements and containers - no rounded-full except circular spinners"

key-files:
  created: []
  modified:
    - src/app/wedding/components/ProgrammeSection.tsx
    - src/app/wedding/components/DetailsSection.tsx
    - src/app/wedding/components/HeroSection.tsx

key-decisions:
  - "Gradient tints applied as inline styles (not Tailwind classes) to preserve exact palette rgba values"
  - "rounded-full retained only on circular spinner - all other pill/badge shapes converted to rounded-sm"

patterns-established:
  - "Column gradient pattern: linear-gradient(180deg, rgba(R,G,B,0.07-0.10) 0%, transparent 100%) with p-6 -m-2 rounded-sm"

requirements-completed: [CNT-01, CNT-02, CNT-03, VIS-02, VIS-01, VIS-03]

# Metrics
duration: 5min
completed: 2026-04-07
---

# Phase 03 Plan 02: Programme Content + Dress Code + Gradient Cards + Sharp Corners Summary

**Programme corrected to Entrance at 19:30 (Bouquet toss removed), dress code updated to "Colourful Semi-Formal" in three surfaces, DetailsSection columns tinted with bloom/sky/sunflower gradients, HeroSection badge and CTA converted to sharp corners**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-04-07T23:13:17Z
- **Completed:** 2026-04-07T23:15:39Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Fixed programme: "Entrance and first dance" at 19:30 replaced with "Entrance / We enter together as husband and wife", and "Bouquet toss" at 22:00 fully removed
- Fixed dress code: "Colourful formal" replaced by "Colourful Semi-Formal" in DetailsSection (dressLines array + h3 heading) and HeroSection (invitationMeta array + editorial-outline card)
- Added warm gradient tint backgrounds to all three detail columns: ceremony (bloom #C97B86 at 10%), celebration (sky #718E84 at 7%), dress (sunflower #B79251 at 7%)
- Changed HeroSection badge span and CTA button from rounded-full to rounded-sm, aligning with D-08/D-09 sharp-corner design language

## Task Commits

Each task was committed atomically:

1. **Task 1: Programme content fixes** - `1fecb69` (feat)
2. **Task 2: Dress code + gradient cards + sharp corners** - `1b2c24f` (feat)

## Files Created/Modified
- `src/app/wedding/components/ProgrammeSection.tsx` - Programme array updated: Entrance entry and Bouquet toss removed
- `src/app/wedding/components/DetailsSection.tsx` - Dress code fixed in array and h3; gradient inline styles added to three column divs
- `src/app/wedding/components/HeroSection.tsx` - Dress code fixed in meta array and card paragraph; rounded-full changed to rounded-sm on badge and CTA

## Decisions Made
- Gradient tints applied via inline `style` prop rather than Tailwind arbitrary values to preserve exact rgba channel values from the palette specification
- rounded-full was left intact only on circular loading spinners (page.tsx) — all other uses converted

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All three files now carry correct content and visual treatment
- Phase 03-03 (RSVPSection, AccommodationSection, etc.) can proceed without conflict
- No stubs — all changes are complete and render immediately

---
*Phase: 03-visual-overhaul-content-fixes*
*Completed: 2026-04-07*
