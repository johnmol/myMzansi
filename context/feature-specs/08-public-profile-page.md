# Unit 08: Public Profile Page

## Goal

Create a clean, public-facing profile page at `/profile/[slug]` that displays the user's information and credentials in a professional, read-only format.

## Design

- Strictly follow `ui-context.md`
- Vertical stack layout: Hero → About → Experience → Skills → Credentials (most prominent)
- Credential cards show title, institution, dates, Self-Reported badge, and "View Document" button
- Clean, scannable, mobile-first
- Professional appearance (like a digital CV)

## Implementation

### 1. Route
- Create `app/profile/[slug]/page.tsx`

### 2. Data Fetching
- Server component that fetches profile by slug using `profiles.service.ts`
- Fetch associated credentials
- Return 404 if profile not found or `is_public = false`

### 3. UI Components
- Create `src/components/profile/PublicProfile.tsx`
- Hero section (avatar, name, headline, location)
- About section (bio)
- Credentials section with clear cards
- Simple "Download CV" button (placeholder for now)

### 4. Service Updates
- Add `getPublicProfileBySlug()` to `profiles.service.ts` (or extend existing)

## Dependencies

- None new

## Verify when done

- [ ] Public profile loads correctly at `/profile/[slug]`
- [ ] Respects `is_public` flag (shows 404 if private)
- [ ] Displays all profile fields and credentials correctly
- [ ] "View Document" opens the certificate file
- [ ] Matches UI Context styling and layout priorities
- [ ] Mobile responsive
- [ ] `npm run build` succeeds
- Update `progress-tracker.md` and mark Unit 08 complete

**Important Constraints:**
- No editing functionality
- No authentication required for this page
- Keep it read-only and simple
- Do not implement CV PDF download yet