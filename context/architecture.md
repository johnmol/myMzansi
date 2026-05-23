# Architecture Context

## Stack

| Layer          | Technology                          | Role |
|----------------|-------------------------------------|------|
| Framework      | Next.js 14 (App Router) + TypeScript | Fullstack framework, server components, API routes, SSR |
| UI             | TailwindCSS + shadcn/ui + Supabase UI (auth only) | Styling, accessible components, fast auth forms |
| Auth           | Supabase Auth                       | Email/password + phone signup, sessions, RLS |
| Database       | Supabase (PostgreSQL)               | All structured data — profiles, credentials |
| Storage        | Supabase Storage                    | Certificate files, avatars, CV PDFs |
| PDF Generation | `@react-pdf/renderer` (server-side) | CV export |
| Hosting        | Vercel                              | Deployment, preview environments |
| Validation     | Zod + React Hook Form               | Form & API input validation |
| Icons          | Lucide React                        | Consistent iconography |

---

## System Boundaries

- `src/app/` — Next.js app router pages, layouts, and public routes.
- `src/app/api/` — Server-side API routes. Thin handlers only (validation + service call).
- `src/services/` — All business logic. One file per domain (e.g. `profile.service.ts`, `credential.service.ts`).
- `src/components/` — Reusable UI components. No business logic or data fetching.
- `src/components/ui/` — shadcn/ui base components. Never modify directly.
- `src/lib/` — Supabase client helpers, Zod schemas, utilities.
- `src/types/` — Shared TypeScript types.
- `src/hooks/` — Client-side hooks for UI logic only.
- `src/config/` — Constants and environment config.
- `supabase/` — Migrations, RLS policies, seed data.

---

## Data Model (v1)

### `profiles`
Extends Supabase Auth users.

| Column          | Type        | Notes |
|-----------------|-------------|-------|
| `id`            | `uuid`      | References `auth.users.id` |
| `full_name`     | `text`      | |
| `headline`      | `text`      | e.g. "Junior Developer, Johannesburg" |
| `bio`           | `text`      | Optional |
| `avatar_url`    | `text`      | Supabase Storage path |
| `phone`         | `text`      | |
| `location`      | `text`      | |
| `is_public`     | `boolean`   | Default: false |
| `slug`          | `text`      | Auto-generated unique profile slug |
| `created_at`    | `timestamp` | |

### `credentials`
User-uploaded qualifications (self-reported in v1).

| Column              | Type        | Notes |
|---------------------|-------------|-------|
| `id`                | `uuid`      | |
| `user_id`           | `uuid`      | FK → `profiles.id` |
| `title`             | `text`      | Required |
| `institution_name`  | `text`      | Required |
| `nqf_level`         | `integer`   | Optional (1-10) |
| `issue_date`        | `date`      | Required |
| `expiry_date`       | `date`      | Optional |
| `file_path`         | `text`      | Supabase Storage path |
| `is_verified`       | `boolean`   | Always false for v1 (self-reported) |
| `created_at`        | `timestamp` | |

### `cv_exports` (optional for tracking)
| Column       | Type        | Notes |
|--------------|-------------|-------|
| `id`         | `uuid`      | |
| `user_id`    | `uuid`      | FK → `profiles.id` |
| `file_path`  | `text`      | Supabase Storage path |
| `created_at` | `timestamp` | |

**Note**: `institutions`, `institution_users` tables are **out of scope** for v1.

---

## Storage Model

- **PostgreSQL** — all metadata (profiles, credentials)
- **Supabase Storage** — binary files only (certificates, avatars, CVs)
- Database stores only paths/URLs, never file content
- Buckets: `avatars` (public), `certificates` (private — owner only), `cv-exports` (private — owner only)

---

## Auth and Access Model

- Supabase Auth for all authentication.
- Every user gets a profile record on first sign-up.
- RLS enabled on all tables.
- Users can only read/write their own data.
- Public profile pages (`/profile/[slug]`) are readable without auth if `is_public = true`.
- All mutations require authenticated session + ownership check.

---

## API Route Conventions

Thin route handlers only:
- Zod validation
- Auth + ownership checks
- Call service function
- Return `{ data }` or `{ error }`

Key routes for v1:
- Profile CRUD
- Credential CRUD + file upload
- Public profile fetch (no auth)
- CV generation

---

## Invariants

1. **No verified credentials in v1** — `is_verified` remains false. Institution features come later.
2. Service role key never reaches the client.
3. All database writes go through `src/services/`.
4. RLS is always enabled.
5. File upload paths are generated server-side.
6. Route handlers stay thin (< 30 lines).
7. Auth → Ownership → Action order is strictly followed.

---