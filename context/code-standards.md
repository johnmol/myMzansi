# Code Standards

## General

- Keep modules small and single-purpose — one component, one job
- Fix root causes, do not layer workarounds or patch symptoms
- Do not mix unrelated concerns in one component or route
- Delete dead code — do not comment it out and leave it
- If logic appears in more than one place, extract it before adding a third
- Readable code is preferred over clever code — optimise for the next developer

## TypeScript

- Strict mode is required throughout — `"strict": true` in `tsconfig.json`
- Never use `any` — use explicit interfaces, `unknown` with narrowing, or generics
- Define shared types in `src/types/` and import from there — do not redefine inline
- Validate all external input (API request bodies, URL params, form data) at the
  boundary using Zod before it touches any logic
- Use `type` for data shapes and `interface` for object contracts — stay consistent
- Never cast with `as` to silence a type error — resolve the type properly

## Next.js

- Default to server components — only add `"use client"` when browser APIs or
  interactivity require it
- Keep route handlers in `src/app/api/` focused on a single responsibility — no
  handler should do more than parse, validate, call a service, and return a response
- Do not fetch data inside client components directly — use server components or
  server actions to pass data down
- Use Next.js `Image` for all images — never raw `<img>` tags
- Use `next/link` for all internal navigation — never raw `<a>` tags
- Environment variables prefixed `NEXT_PUBLIC_` are exposed to the browser — never
  put secrets there

## Styling

- Use TailwindCSS utility classes throughout — no separate `.css` files unless
  absolutely necessary
- Never hardcode hex values or colour literals — use Tailwind theme tokens defined
  in `tailwind.config.ts`
- Follow the spacing and border radius scale from the Tailwind config — do not
  introduce arbitrary values with `[]` unless there is no token equivalent
- Use `cn()` (clsx + tailwind-merge) to conditionally combine class names — never
  string interpolation for class logic
- Responsive design is mobile-first — write base styles for small screens and
  layer up with `sm:`, `md:`, `lg:` modifiers

## Components

- Use named exports for all components — no default exports
- One component per file — file name matches the component name in PascalCase
- Co-locate component-specific logic inside the component file unless it needs
  to be shared, in which case extract to a hook in `src/hooks/`
- Props interfaces are defined directly above the component they belong to
- Do not pass more than 5 props into a component — if you need more, introduce
  a data object or a context

## API Routes

- Validate and parse all request input with Zod before any logic runs
- Enforce authentication and resource ownership before any mutation or read
- Return consistent response shapes across all routes:
  - Success: `{ data: T }`
  - Error: `{ error: { message: string, code?: string } }`
- Never return raw database records to the client — map to a response type
- Do not put business logic inside route handlers — call service functions instead
- HTTP status codes must be meaningful — `200` for success, `400` for bad input,
  `401` for unauthenticated, `403` for unauthorised, `404` for not found, `500`
  for unexpected server errors

## Data and Storage

- User profile and credential metadata belongs in PostgreSQL via Supabase
- Uploaded certificate files and generated CV PDFs belong in Supabase Storage —
  never in the database as blobs
- Store only the storage path or public URL in the database, not file content
- Do not query the database directly from components — go through a service function
- Use Supabase server client (`createServerClient`) in server components and API
  routes — never the browser client in server-side code
- Every database write must be wrapped in error handling — do not assume success

## Services

- Business logic lives in `src/services/` — one file per domain
  (e.g. `credentials.service.ts`, `profiles.service.ts`)
- Service functions are plain async functions — no classes
- Services receive already-validated input — they do not validate themselves
- Services do not return raw Supabase responses — they return typed domain objects
  or throw typed errors

## File Organisation

- `src/app/` — Next.js app router pages, layouts, and API route handlers
- `src/components/` — Shared UI components used across multiple pages
- `src/components/ui/` — Base design system components (shadcn) — do not modify
- `src/services/` — Business logic, one file per domain
- `src/hooks/` — Custom React hooks for shared client-side logic
- `src/types/` — Shared TypeScript types and interfaces
- `src/lib/` — Utility functions, Supabase client setup, Zod schemas
- `src/config/` — App-level constants and environment variable access
- `public/` — Static assets only (icons, images, fonts)