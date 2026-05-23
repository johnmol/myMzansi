# Unit 05 Refinement: Polish Dashboard Layout

## Goal

Polish the existing DashboardLayout to improve usability, visual consistency, and mobile experience without adding new features.

## Design

- Strictly follow `ui-context.md` (colors, spacing, typography, cards)
- Add Lucide icons to navigation items
- Clear active route highlighting
- Better mobile bottom navigation
- Keep changes minimal and contained to the layout

## Implementation

### 1. Update DashboardLayout.tsx
- Add Lucide icons to all nav items (Overview, Profile, Credentials, Experience, Skills, Settings)
- Implement active link styling (use `usePathname()` from next/navigation)
- Improve mobile bottom nav:
  - Add icons
  - Better spacing and touch targets
  - Show only main items (Overview, Credentials, Profile) + Sign Out
- Extract navigation items into a config array to avoid duplication between sidebar and mobile nav

### 2. Minor Fixes
- Ensure consistent Card padding and styling
- Add proper hover states
- Fix any layout shift or responsiveness issues
- Make sure SignOutButton works reliably

## Dependencies

- lucide-react (handle React 19 conflict if it appears)

## Verify when done

- [ ] All nav items have appropriate Lucide icons
- [ ] Active route is clearly highlighted in both sidebar and mobile nav
- [ ] Mobile bottom nav is usable and looks good
- [ ] No layout issues on mobile or desktop
- [ ] `npm run build` succeeds with no errors
- [ ] Update `progress-tracker.md`

**Important Constraints:**
- Do not add new pages or functionality
- Keep changes only within DashboardLayout.tsx and related navigation logic
- Stay minimal — this is polish, not a redesign