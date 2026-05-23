# Code Standards

## General

- Keep modules small and single-purpose — one component, one job
- Fix root causes, do not layer workarounds or patch symptoms
- Do not mix unrelated concerns in one component or route
- Delete dead code — do not comment it out and leave it
- If logic appears in more than one place, extract it before adding a third
- Readable code is preferred over clever code — optimise for the next developer
- Always prioritize simplicity and maintainability over premature optimization

## TypeScript

- Strict mode is required throughout — `"strict": true` in `tsconfig.json`
- Never use `any` — use explicit interfaces, `unknown` with narrowing, or generics
- Define shared types in `src/types/` and import from there — do not redefine inline
- Validate all external input (API request bodies, URL params, form data) at the boundary using Zod before it touches any logic
- Use `type` for data shapes and `interface` for object contracts — stay consistent
- Never cast with `as` to silence a type error — resolve the type properly

## Next.js

- Default to server components — only add `"use client"` when browser APIs or interactivity require it
- Keep route handlers in `src/app/api/` focused on a single responsibility — no handler should do more than parse, validate, call a service, and return a response
- Do not fetch data inside client components directly — use server components or server actions to pass data down
- Use Next.js `Image` for all images — never raw `<img>` tags
- Use `next/link` for all internal navigation — never raw `<a>` tags
- Environment variables prefixed `NEXT_PUBLIC_` are exposed to the browser — never put secrets there

## Styling

- Use TailwindCSS utility classes throughout — no separate `.css` files unless absolutely necessary
- Never hardcode hex values or colour literals — use CSS variables / Tailwind theme tokens defined in `tailwind.config.ts`
- Follow the spacing, color, and border radius scale from the UI Context — do not introduce arbitrary values with `[]` unless there is no token equivalent
- Use `cn()` (clsx + tailwind-merge) to conditionally combine class names
- Responsive design is mobile-first

## Components

- Use named exports for all components — no default exports
- One component per file — file name matches the component name in PascalCase
- Co-locate component-specific logic inside the component file unless it needs to be shared (then extract to `src/hooks/`)
- Props interfaces are defined directly above the component
- Do not pass more than 5 props — use a data object or context if needed
- Use Supabase UI components **only** for authentication flows

## API Routes

- Validate and parse all request input with Zod before any logic runs
- Enforce authentication and resource ownership before any mutation or read
- Return consistent response shapes:
  - Success: `{ data: T }`
  - Error: `{ error: { message: string, code?: string } }`
- Never return raw database records — map to response types
- Do not put business logic inside route handlers — call service functions
- Use meaningful HTTP status codes

## Data and Storage

- Profile and credential metadata belongs in Supabase PostgreSQL
- Files (certificates, avatars, CVs) belong in Supabase Storage only
- Database stores only paths/URLs, never file content
- All database operations go through service functions in `src/services/`
- Use Supabase server client in server components and API routes

## Services

- Business logic lives in `src/services/` — one file per domain (`profiles.service.ts`, `credentials.service.ts`, etc.)
- Service functions are plain async functions — no classes
- Services receive already-validated input
- Services return typed domain objects or throw typed errors

## File Organisation

- `src/app/` — Pages, layouts, and API routes
- `src/components/` — Reusable UI components
- `src/components/ui/` — shadcn/ui base components (never modify)
- `src/services/` — Business logic
- `src/hooks/` — Client-side UI hooks
- `src/types/` — Shared TypeScript types
- `src/lib/` — Supabase clients, Zod schemas, utilities
- `src/config/` — Constants and env access
- `supabase/` — Migrations and RLS policies

---