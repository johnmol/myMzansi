# Unit 06: Profile Management

## Goal

Allow users to edit their basic profile information (name, headline, bio, location, phone, avatar) in the dashboard.

## Design

- Follow `ui-context.md` strictly
- Clean form layout using shadcn primitives (Input, Textarea, Button, Card, etc.)
- Avatar upload with preview
- Use existing DashboardLayout
- Good empty states / loading states
- Save button with clear feedback

## Implementation

### 1. Profile Form Component
- Create `src/components/profile/ProfileForm.tsx`
- Fields (based on data model):
  - Full Name
  - Headline
  - Location
  - Phone
  - Bio (Textarea)
  - Avatar upload (with preview)

### 2. Dashboard Profile Page
- Create `app/dashboard/profile/page.tsx`
- Use the form component
- Load current profile data on mount
- Save changes via service

### 3. Service Layer
- Add to `src/services/profiles.service.ts`:
  - `updateProfile()`
  - `getProfile()`

### 4. Integration
- Add "Profile" navigation item (if not already working)
- After save, show success message and refresh data

## Dependencies

- shadcn Input, Textarea (if not already added)
- Upload handling (use existing Supabase storage pattern)

## Verify when done

- [ ] User can edit and save all profile fields
- [ ] Avatar upload works and updates preview
- [ ] Changes are persisted and visible on reload
- [ ] Form matches UI Context styling
- [ ] Works within DashboardLayout
- [ ] `npm run build` succeeds
- Update `progress-tracker.md` and mark Unit 06 complete

**Important Constraints:**
- Do not implement Credentials, Experience, or Skills yet
- Keep form simple (no advanced validation beyond Zod)
- No public profile preview in this unit