---
phase: 03-visual-overhaul-content-fixes
plan: "01"
subsystem: css
tags: [css, tailwind, design-system, border-radius, utility-classes]
dependency_graph:
  requires: []
  provides: [section-bg-dark, section-bg-dark-alt, editorial-card, editorial-outline, glass-card, section-kicker, glow-heading, text-shimmer]
  affects: [all section components, LoginPage, Footer, SplashAnimation]
tech_stack:
  added: []
  patterns: [tailwind @layer components, CSS utility class definitions]
key_files:
  created: []
  modified:
    - src/styles/tailwind.css
decisions:
  - "Used @layer components block appended after mobile media query for class definitions"
  - "Preserved arch-image decorative border-radius (12rem/8rem) as per D-07 exception for decorative shapes"
  - "Preserved barcode-bar 1px border-radius as a decorative element exception"
metrics:
  duration: "84s"
  completed: "2026-04-07T23:12:48Z"
  tasks_completed: 2
  files_modified: 1
requirements_fulfilled: [VIS-03, VIS-04]
---

# Phase 03 Plan 01: CSS Utility Classes & Border-Radius Patch Summary

**One-liner:** Defined all 8 missing CSS utility classes (editorial-card, glass-card, section-bg-dark, etc.) and patched 6 CSS-level border-radius values from rounded to sharp 2px corners.

## What Was Done

### Task 1: Define all missing CSS utility classes

Added a new `@layer components` block at the end of `src/styles/tailwind.css` with all 8 missing utility class definitions:

| Class | Purpose | Key Properties |
|-------|---------|----------------|
| `.section-bg-dark` | Base page background | `background-color: #0A0A0D` |
| `.section-bg-dark-alt` | Alternating section background | Subtle gradient `#0A0A0D → #0D0D12 → #0A0A0D` |
| `.editorial-card` | Warm parchment invitation card | Cream gradient, ink border, 2px radius |
| `.editorial-outline` | Dark card with outline | Dark bg + blur, subtle ivory border, 2px radius |
| `.glass-card` | Dark glass panel | Dark bg + blur, white border, 2px radius |
| `.section-kicker` | Uppercase eyebrow label | Gold `#c7ab78`, 0.2em tracking |
| `.glow-heading` | Subtle heading glow | Warm bloom text-shadow |
| `.text-shimmer` | Gold/pink gradient text | Gradient clip on text fill |

All card-type classes (editorial-card, editorial-outline, glass-card) include `border-radius: 2px` per D-07.

### Task 2: Patch all CSS-level border-radius to 2px

Updated 6 CSS class definitions that had rounded corners above 2px:

| Class | Before | After |
|-------|--------|-------|
| `.form-input` | `0.75rem` | `2px` |
| `.form-input-dark` | `0.75rem` | `2px` |
| `.btn-primary` | `9999px` | `2px` |
| `.btn-ghost` | `9999px` | `2px` |
| `.btn-ghost-dark` | `9999px` | `2px` |
| `.dots-card` | `2rem` | `2px` |

Preserved as exceptions per plan:
- `.arch-image`: `12rem 12rem 2rem 2rem` — decorative portrait arch shape
- `.barcode-bar`: `1px` — decorative barcode element

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1 | `8d612df` | feat(03-01): define all 8 missing CSS utility classes |
| Task 2 | `95a294a` | fix(03-01): patch all CSS border-radius values to 2px for sharp corners |

## Verification Results

- `grep -c "section-bg-dark|editorial-card|glass-card|section-kicker|glow-heading|text-shimmer|editorial-outline|section-bg-dark-alt"` → **8** (all classes defined)
- `grep -n "border-radius" | grep -v "2px|1px|12rem"` → only `8rem 8rem 1.5rem 1.5rem` (mobile arch-image, acceptable exception)
- No border-radius values of `0.75rem`, `9999px`, or `2rem` remain in CSS

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None - these are pure CSS definitions with no data dependencies or placeholder content.

## Self-Check: PASSED

- [x] `src/styles/tailwind.css` modified with all 8 utility classes defined
- [x] All 6 targeted border-radius values patched to 2px
- [x] Commit `8d612df` exists (Task 1)
- [x] Commit `95a294a` exists (Task 2)
- [x] arch-image and barcode-bar exceptions preserved
