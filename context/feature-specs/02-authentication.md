# Unit 02: Authentication Setup

## Goal

Implement a complete, secure authentication system using Supabase Auth with clean UI flows that match the design system.

## Design

- Use Supabase UI components **only** for auth pages (Sign up, Sign in, Forgot Password).
- All auth pages should follow the UI Context (colors, typography, spacing, rounded-lg cards).
- Landing page (`/`) already has "Create Your Profile" button that leads to sign-up.
- After successful sign-up or login → redirect to `/dashboard`.
- Responsive, mobile-first forms.
- Clean error messages using shadcn toast or form errors.

## Implementation

### 1. Supabase Setup
- Configure Supabase client in `src/lib/supabase.ts` (server + browser clients).
- Set up environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- Enable email/password auth in Supabase dashboard (assume done manually).

### 2. Auth Pages
- Create `/app/login/page.tsx`
- Create `/app/signup/page.tsx`
- Create `/app/forgot-password/page.tsx` (or handle via Supabase UI)
- Use Supabase Auth UI components where possible, with custom styling to match theme.

### 3. Protected Routes
- Create a middleware or server component wrapper for protected routes (`/dashboard`, etc.).
- Redirect unauthenticated users to `/login`.
- Redirect authenticated users away from auth pages.

### 4. Post-Auth Redirect
- After sign-up/login, create profile record if it doesn't exist, then redirect to `/dashboard`.

## Dependencies

- `@supabase/auth-ui-react` or Supabase UI library (install if needed)
- `@supabase/supabase-js`

## Verify when done

- [ ] User can sign up with email/password
- [ ] User can log in
- [ ] Password reset flow works
- [ ] Authenticated users are redirected to `/dashboard`
- [ ] Unauthenticated users cannot access protected pages
- [ ] No console errors, TypeScript clean, `npm run build` succeeds
- [ ] Auth pages match UI Context colors and styling
- [ ] Profile record is auto-created on first sign-up