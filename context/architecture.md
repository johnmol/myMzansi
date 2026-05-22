# Architecture Context

## Stack

| Layer      | Technology                  | Role                                                      |
| ---------- | --------------------------- | --------------------------------------------------------- |
| Framework  | Next.js 14 + TypeScript     | App router, server components, API routes, SSR/SSG        |
| UI         | TailwindCSS + shadcn/ui     | Utility-first styling and accessible base components      |
| Auth       | Supabase Auth               | Email/password and OAuth sign-in, session management, RLS |
| Database   | Supabase (PostgreSQL)       | All structured data — users, profiles, credentials, institutions |
| ORM        | Supabase JS client          | Type-safe database queries via generated types            |
| Storage    | Supabase Storage            | Certificate files, CV PDFs, avatar images                 |
| Hosting    | Vercel                      | Frontend deployment, edge functions, preview environments |
| Backend    | Supabase                    | Database, auth, storage, and row-level security policies  |

---

## System Boundaries

- `src/app/` — Next.js app router. Pages, layouts, loading states, and API route
  handlers. No business logic here — handlers call service functions and return responses.
- `src/app/api/` — Server-side API routes. Input validation, auth checks, service calls,
  and response formatting. One responsibility per route.
- `src/services/` — All business logic. One file per domain. Called by API routes and
  server components only — never imported into client components.
- `src/components/` — Shared UI components used across multiple pages. No data fetching
  or service calls inside components — receive data via props.
- `src/components/ui/` — shadcn base components. Never modified directly.
- `src/lib/` — Supabase client setup, Zod schemas, utility functions, and type helpers.
- `src/types/` — Shared TypeScript interfaces and types derived from the database schema.
- `src/hooks/` — Client-side React hooks for shared UI logic only.
- `src/config/` — App-level constants, environment variable access, and route definitions.
- `supabase/` — Database migrations, seed files, and RLS policy definitions.

---

## Data Model

### `profiles`
Extends Supabase Auth users. One profile per user.

| Column          | Type        | Notes                                  |
| --------------- | ----------- | -------------------------------------- |
| `id`            | `uuid`      | Matches `auth.users.id`                |
| `full_name`     | `text`      |                                        |
| `headline`      | `text`      | e.g. "Software Developer, Cape Town"   |
| `bio`           | `text`      |                                        |
| `avatar_url`    | `text`      | Supabase Storage path                  |
| `phone`         | `text`      |                                        |
| `location`      | `text`      |                                        |
| `is_public`     | `boolean`   | Controls public profile visibility     |
| `created_at`    | `timestamp` |                                        |

### `credentials`
Certificates and qualifications belonging to a user.

| Column              | Type        | Notes                                              |
| ------------------- | ----------- | -------------------------------------------------- |
| `id`                | `uuid`      |                                                    |
| `user_id`           | `uuid`      | FK → `profiles.id`                                 |
| `title`             | `text`      | e.g. "National Certificate: IT Systems Support"    |
| `institution_name`  | `text`      |                                                    |
| `institution_id`    | `uuid`      | FK → `institutions.id`, nullable if self-uploaded  |
| `nqf_level`         | `integer`   | 1–10, nullable                                     |
| `issue_date`        | `date`      |                                                    |
| `expiry_date`       | `date`      | Nullable                                           |
| `file_path`         | `text`      | Supabase Storage path to certificate file          |
| `is_verified`       | `boolean`   | True only if issued by a verified institution      |
| `verification_token`| `text`      | Unique token for public verification link          |
| `created_at`        | `timestamp` |                                                    |

### `institutions`
Registered training providers and issuers.

| Column          | Type        | Notes                                        |
| --------------- | ----------- | -------------------------------------------- |
| `id`            | `uuid`      |                                              |
| `name`          | `text`      |                                              |
| `type`          | `text`      | e.g. "SETA", "University", "Private College" |
| `is_verified`   | `boolean`   | Manually approved by platform admin          |
| `contact_email` | `text`      |                                              |
| `logo_url`      | `text`      | Supabase Storage path                        |
| `created_at`    | `timestamp` |                                              |

### `institution_users`
Links institution admin users to their institution.

| Column           | Type   | Notes                          |
| ---------------- | ------ | ------------------------------ |
| `user_id`        | `uuid` | FK → `profiles.id`             |
| `institution_id` | `uuid` | FK → `institutions.id`         |
| `role`           | `text` | `"admin"` or `"staff"`         |

### `cv_exports`
Tracks generated CV PDFs.

| Column       | Type        | Notes                         |
| ------------ | ----------- | ----------------------------- |
| `id`         | `uuid`      |                               |
| `user_id`    | `uuid`      | FK → `profiles.id`            |
| `file_path`  | `text`      | Supabase Storage path         |
| `created_at` | `timestamp` |                               |

---

## Storage Model

- **PostgreSQL (Supabase)** — all structured data: user profiles, credential metadata,
  institution records, verification status, NQF levels, relationships between entities
- **Supabase Storage** — all binary and generated files: uploaded certificate PDFs and
  images, generated CV PDFs, institution logos, user avatars
- **Rule** — the database stores only the storage path or public URL, never file content
- **Rule** — large content is never written directly to the database as a blob or base64 string

### Storage Buckets

| Bucket          | Contents                        | Access                        |
| --------------- | ------------------------------- | ----------------------------- |
| `certificates`  | Uploaded credential files       | Private — owner + institution |
| `cv-exports`    | Generated CV PDFs               | Private — owner only          |
| `avatars`       | User profile photos             | Public                        |
| `institution-logos` | Institution branding        | Public                        |

---

## Auth and Access Model

- All authentication is handled by Supabase Auth — email/password sign-up to start,
  with Google OAuth as a later addition
- Every authenticated request is tied to a `auth.users` record; the `profiles` table
  extends this with application-specific data
- Supabase Row Level Security (RLS) is enabled on all tables — no table is publicly
  writable without a policy
- Users can only read and mutate their own profile and credential records
- Institutions can only issue credentials to users who have accepted an invite or
  submitted a claim request — no institution can write to a user's record unilaterally
- Employer accounts are a role flag on `profiles` — not a separate table
- Admin access (institution verification, dispute resolution) is restricted to
  service-role queries on the server — never exposed to client-side code
- Public profile pages (`/profile/[username]`) are readable without auth only if
  `profiles.is_public = true`
- Credential verification links (`/verify/[token]`) are publicly readable by design

---

## API Route Conventions

All routes follow this structure:

```
POST   /api/credentials          → create a new credential
GET    /api/credentials/[id]     → fetch a single credential
PATCH  /api/credentials/[id]     → update a credential
DELETE /api/credentials/[id]     → delete a credential

POST   /api/institutions/[id]/issue  → institution issues a credential to a user

GET    /api/verify/[token]       → public credential verification (no auth required)

POST   /api/cv/generate          → generate and store a CV PDF
```

Every route handler:
1. Parses and validates input with Zod
2. Verifies the session with Supabase Auth
3. Checks ownership or role before any mutation
4. Calls a service function — no logic in the handler itself
5. Returns `{ data: T }` on success or `{ error: { message, code } }` on failure

---

## Invariants

These rules must never be violated anywhere in the codebase:

1. **Verified status is institution-controlled only.** `credentials.is_verified` is
   only set to `true` by a verified institution via a server-side service call. A user
   can never set their own credential as verified through any client-facing route.

2. **The Supabase service role key never reaches the client.** It is used only in
   server components, API routes, and server actions — never in `"use client"` files
   or exposed via `NEXT_PUBLIC_` environment variables.

3. **Every database write goes through a service function.** API route handlers and
   server components do not call the Supabase client directly for mutations — they
   call a function in `src/services/`.

4. **RLS is always on.** No table is left without row-level security policies. Direct
   database access without an authenticated session must not return user data.

5. **File storage paths are generated server-side.** Clients do not construct their
   own storage paths — the server generates and returns a signed upload URL.

6. **Route handlers are thin.** No handler exceeds ~30 lines. If it does, logic belongs
   in a service function.

7. **Auth checks happen before ownership checks, which happen before mutations.**
   The order is always: authenticate → authorise → act.