# Unit 04: Landing Page

## Goal

Create a clean, effective landing page (`/`) that clearly explains the value proposition and drives sign-ups with a prominent "Create Your Profile" CTA.

## Design

- Follow `ui-context.md` strictly: warm neutrals + teal accent, professional but approachable
- Single scroll page, mobile-first
- Strong hero section with clear headline and primary button
- Use shadcn/ui primitives (Button, Card, etc.) + cn() helper
- No auth logic or protected content on this page

## Implementation

### 1. Page Structure (`app/page.tsx`)
- **Hero Section**
  - Headline: "Your Digital Career Passport for South Africa"
  - Subheadline: "Store, organize, and share your qualifications and skills in one trusted place."
  - Primary CTA: "Create Your Profile" button → links to `/signup`
  - Secondary link: "For Employers" → `/for-employers`

- **Problem / Solution** section (2-3 short points)

- **How it Works** section (3 simple steps with Lucide icons)

- **Trust signals** section (NQF, institutions, secure)

- Clean footer

### 2. Styling
- Use Tailwind + design tokens from `ui-context.md`
- Make it responsive and fast-loading

## Dependencies

- None (uses existing design system and lucide-react)

## Verify when done

- [ ] Page loads at `/` with no errors
- "Create Your Profile" button correctly routes to signup
- Design matches `ui-context.md` (colors, typography, spacing, cards)
- Mobile responsive
- No console errors
- `npm run build` succeeds
- Update `progress-tracker.md`

**Important Constraints:**
- Keep it static / marketing only
- Do not add any new functionality (search, animations, etc.)
- Do not touch dashboard or other pages