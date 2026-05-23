# Unit 03: Database Schema & Types

## Goal

Set up the core database tables (`profiles` and `credentials`), create shared TypeScript types, and enable basic RLS policies so we have a solid data foundation.

## Design

- Follow the exact data model defined in `architecture.md`
- Keep schema minimal for v1
- No extra tables or fields

## Implementation

### 1. Database Migrations
- Create Supabase migration for `profiles` table (extends auth.users)
- Create Supabase migration for `credentials` table
- Add appropriate indexes (e.g. on `user_id`, `slug`)
- Set up basic RLS policies:
  - Users can only read/write their own profile and credentials
  - Public read access to profiles where `is_public = true` (for public profile page)

### 2. TypeScript Types
- Create `src/types/profile.ts` with `Profile` interface
- Create `src/types/credential.ts` with `Credential` interface
- Create `src/types/index.ts` to re-export all types

### 3. Service Layer Foundation (minimal)
- Create `src/services/profiles.service.ts` with:
  - `upsertProfile()` (called after sign-up)
  - `getProfileBySlug()`
- Create `src/services/credentials.service.ts` with basic stubs for now (full CRUD in next unit)

### 4. Profile Auto-creation
- Update auth flow (from Unit 02) to call profile upsert after successful sign-up

## Dependencies

- None (uses existing Supabase)

## Verify when done

- [ ] Tables exist in Supabase with correct columns
- [ ] RLS policies are active and working as defined
- [ ] TypeScript types are correctly defined and exported
- [ ] New user sign-up automatically creates a profile record
- [ ] `npm run build` succeeds with no errors
- [ ] No violations of architecture invariants
- [ ] Update `progress-tracker.md` after completion

**Important Constraints:**
- Do not add any UI changes in this unit
- Do not implement full credential CRUD yet
- Keep services thin and focused