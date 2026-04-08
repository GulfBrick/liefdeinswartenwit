# Roadmap: Liefde in Swart en Wit

**Milestone:** v1.1 — Wedding Page Polish & RSVP Admin
**Created:** 2026-04-07
**Phases:** 4 (Phase 3–6)
**Coverage:** 17/17 requirements mapped

---

## Phases

- [ ] **Phase 3: Visual Overhaul & Content Fixes** - Sharp corners, readable text, consistent design language, and accurate programme/dress code content
- [ ] **Phase 3.1: Premium Visual Redesign** - Rose + sage + mauve palette, hover glow effects, replace all gold accents
- [ ] **Phase 4: Animations Refresh** - Audit existing reveal animations and add new scroll-triggered effects
- [ ] **Phase 5: Gallery Enhancement** - New photos, grayscale-to-colour hover reveal, balanced masonry spacing
- [ ] **Phase 6: RSVP Admin Dashboard** - Protected admin page showing all guest responses

---

## Phase Details

### Phase 3: Visual Overhaul & Content Fixes
**Goal**: Every guest sees a visually striking page — readable text, sharp editorial corners, cohesive styling throughout, and accurate programme and dress code information
**Depends on**: Nothing
**Requirements**: VIS-01, VIS-02, VIS-03, VIS-04, CNT-01, CNT-02, CNT-03, BNK-01, BNK-02, BNK-03
**Success Criteria**:
  1. All body text, headings, and labels are clearly legible against dark backgrounds
  2. The invitation details section is visually prominent
  3. Every card, button, input uses near-90-degree sharp corners
  4. All sections share a consistent visual language
  5. Programme shows "Entrance" (not "Entrance and first dance"), omits "Bouquet toss"
  6. Banking section covers both accommodation and honeymoon gifts with invite code reference
**Plans**: 4 plans
Plans:
- [x] 03-01-PLAN.md — CSS foundation: define missing utility classes + patch all CSS border-radius to 2px
- [x] 03-02-PLAN.md — Content fixes + DetailsSection gradient pop (programme, dress code, visual treatment)
- [x] 03-03-PLAN.md — Sharp corners + contrast pass on all remaining components
- [x] 03-04-PLAN.md — Create BankingSection component and wire into page
**UI hint**: yes

### Phase 03.1: Premium Visual Redesign — Black + pastel colour theme, premium card effects, replace gold accents with soft pastels, glassmorphism/hover effects on all cards (INSERTED)

**Goal:** Transform the entire wedding page from warm gold editorial to romantic elegant black + pastel (rose + sage + mauve) aesthetic with premium hover glow effects on all cards
**Requirements**: D-01 through D-25 (from CONTEXT.md decisions)
**Depends on:** Phase 3
**Plans:** 3/3 plans complete

Plans:
- [x] 03.1-01-PLAN.md — Design system foundation: update Tailwind config tokens + CSS variables/utility classes to rose/sage/mauve palette
- [x] 03.1-02-PLAN.md — Component colour migration: replace all hardcoded gold hex values in 12 component files
- [x] 03.1-03-PLAN.md — Card hover glow effects + full visual verification checkpoint

### Phase 4: Animations Refresh
**Goal**: Every scroll-triggered animation fires reliably and the page feels alive with purposeful motion
**Depends on**: Phase 3
**Requirements**: ANI-01, ANI-02
**Plans**: TBD

### Phase 5: Gallery Enhancement
**Goal**: Gallery showcases photos with colour-reveal hover effect, balanced layout, and new wedding photos
**Depends on**: Phase 3
**Requirements**: GAL-01, GAL-02, GAL-03
**Plans**: TBD

### Phase 6: RSVP Admin Dashboard
**Goal**: Nikita and Daniel can view all guest RSVPs behind a code-protected gate
**Depends on**: Nothing
**Requirements**: ADM-01, ADM-02
**Plans**: TBD

---

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 3. Visual Overhaul & Content Fixes | 4/4 | Complete |  |
| 3.1. Premium Visual Redesign | 0/3 | Ready | - |
| 4. Animations Refresh | 0/? | Not started | - |
| 5. Gallery Enhancement | 0/? | Not started | - |
| 6. RSVP Admin Dashboard | 0/? | Not started | - |

---

## Coverage Map

| Requirement | Phase | Description |
|-------------|-------|-------------|
| VIS-01 | Phase 3 | Text contrast across all sections |
| VIS-02 | Phase 3 | Invitation details section visual pop |
| VIS-03 | Phase 3 | Sharp corners site-wide |
| VIS-04 | Phase 3 | Consistent design language |
| CNT-01 | Phase 3 | Programme entry renamed to "Entrance" |
| CNT-02 | Phase 3 | "Bouquet toss" removed from programme |
| CNT-03 | Phase 3 | Dress code wording corrected |
| BNK-01 | Phase 3 | Real banking details |
| BNK-02 | Phase 3 | Covers accommodation + honeymoon gifts |
| BNK-03 | Phase 3 | Invite code as payment reference |
| ANI-01 | Phase 4 | Existing animations audited |
| ANI-02 | Phase 4 | New scroll animations added |
| GAL-01 | Phase 5 | New photos added |
| GAL-02 | Phase 5 | Grayscale-to-colour hover effect |
| GAL-03 | Phase 5 | Smart masonry spacing |
| ADM-01 | Phase 6 | Admin dashboard with all RSVPs |
| ADM-02 | Phase 6 | Access protected with code 1234 |

**Total mapped: 17/17**
