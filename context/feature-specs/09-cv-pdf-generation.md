# Unit 09: CV PDF Generation

## Goal

Add a "Download CV" button that generates and downloads a clean, professional one-page (or max two-page) PDF of the user's profile and credentials.

## Design

- Simple "Download CV" button on:
  - Dashboard (Profile page)
  - Public Profile page
- PDF should look professional and match the site's clean aesthetic (use similar fonts, teal accents, layout)
- Focus on readability over fancy design

## Implementation

### 1. Service
- Add to `src/services/profiles.service.ts` or create `cv.service.ts`:
  - `generateCV(userId: string)` → returns PDF buffer or storage path

### 2. PDF Generation
- Use `@react-pdf/renderer` (server-side)
- Create a React PDF template in `src/components/cv/CVDocument.tsx`
  - Include: Hero (name, headline), About, Experience, Skills, Credentials list
  - Show credential details (no full document links in PDF)

### 3. Integration
- Add button on public profile and dashboard profile page
- On click: Generate PDF and trigger download (or save to storage and serve link)

### 4. Route (optional)
- Simple API route if needed for generation (`/api/cv/generate`)

## Dependencies

- `@react-pdf/renderer` (install if not present)

## Verify when done

- [ ] "Download CV" button works on dashboard and public profile
- [ ] Generated PDF is clean, readable, and contains key information
- [ ] PDF looks professional
- [ ] Works for users with and without credentials
- [ ] No performance issues on generation
- [ ] `npm run build` succeeds
- Update `progress-tracker.md` and mark Unit 09 complete

**Important Constraints:**
- Keep PDF simple — no advanced templating or customization in v1
- Generate on-demand (don't pre-generate unless necessary)
- Do not store every CV permanently unless needed for tracking