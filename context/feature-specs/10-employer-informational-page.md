# Unit 10: Employer Informational Page

## Goal

Create a simple, static informational page at `/for-employers` that explains the value for employers and encourages them to view shared profiles.

## Design

- Follow `ui-context.md` strictly (professional, clean, teal accents)
- Same style as the main landing page
- Single scroll page, mobile-first
- No interactive functionality

## Implementation

### 1. Page Route
- Create `app/for-employers/page.tsx`

### 2. Content Sections
- Hero: "Find Verified Talent Faster in South Africa"
- Problem section (qualification fraud, slow verification)
- Benefits:
  - View real credentials with documents
  - Clean professional profiles
  - Easy shareable links
- How it works (3 simple steps)
- CTA: "Browse Public Profiles" (can link to a placeholder or main search later)
- Trust signals

### 3. Navigation
- Add link from main landing page to this page

## Dependencies

- None (uses existing components and design system)

## Verify when done

- [ ] Page loads at `/for-employers`
- [ ] Content is clear and benefit-focused
- [ ] Design matches ui-context.md (colors, cards, typography)
- [ ] Mobile responsive
- [ ] Link exists from main landing page
- [ ] `npm run build` succeeds
- Update `progress-tracker.md` and mark Unit 10 complete

**Important Constraints:**
- Keep it purely informational / marketing (no search, no real employer tools)
- Do not add any new backend logic
- Stay minimal