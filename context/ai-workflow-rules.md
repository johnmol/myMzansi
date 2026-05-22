# AI Workflow Rules

## Approach

Build this project incrementally using a spec-driven workflow. Context files define
what to build, how to build it, and the current state of progress. Always implement
against these specs — do not infer or invent behavior from scratch.

Read `project-overview.md` before starting any session to understand the product
goals and boundaries. Read `architecture.md` before touching any code to understand
system structure. Read `progress-tracker.md` to know what has been completed and
what is next. Implement exactly one feature unit per session, verify it works end
to end, update the relevant docs, and stop.

## Scoping Rules

- Work on one feature unit at a time
- Prefer small, verifiable increments over large speculative changes
- Do not combine unrelated system boundaries in a single implementation step

## When to Split Work

Split an implementation step if it combines:

- UI changes and backend/API changes
- Multiple unrelated API routes or endpoints
- Database schema changes alongside feature logic
- Auth logic alongside unrelated feature behavior
- Behavior not clearly defined in the context files

If a change cannot be verified end to end quickly, the scope is too broad — split it.

## Handling Missing Requirements

- Do not invent product behavior not defined in the context files
- If a requirement is ambiguous, resolve it in the relevant context file before
  implementing
- If a requirement is missing, add it as an open question in `progress-tracker.md`
  before continuing
- Do not assume a feature is needed because it seems logical — if it is not in
  `project-overview.md` or `architecture.md`, it is out of scope

## File Roles

Each context file has a single responsibility. Do not write information into the
wrong file:

| File                   | Purpose                                              |
|------------------------|------------------------------------------------------|
| `project-overview.md`  | Product goals, features, scope, and success criteria |
| `architecture.md`      | System structure, data models, API design, tech decisions |
| `progress-tracker.md`  | Completed units, open questions, what is next        |
| `ai-workflow-rules.md` | How the agent behaves — never modified during a build session |

## Protected Files

Do not modify the following unless explicitly instructed:

- `ai-workflow-rules.md` — agent behavior rules are set by the developer, not the agent
- `components/ui/*` — generated UI library components (shadcn or equivalent)
- Any installed library internals under `node_modules/`
- Environment files (`.env`, `.env.local`) — reference them, never overwrite them

## Code Conventions

Follow these consistently across the project:

- Use TypeScript throughout — no plain `.js` files in `src/`
- Use named exports for components, not default exports
- Co-locate component styles using TailwindCSS utility classes — no separate CSS files
  unless absolutely necessary
- Keep API route handlers thin — move business logic into service files
- Use Supabase client only inside server-side code or API routes — never expose it
  directly in client components

## Keeping Docs in Sync

Update the relevant context file whenever implementation changes affect:

- System architecture or service boundaries
- Database schema or storage model decisions
- New code conventions or patterns introduced
- Feature scope (anything added, removed, or deferred)

Do not wait until the end of a session to update docs — update as you go.

## Before Moving to the Next Unit

Confirm all of the following before marking a unit complete:

1. The current unit works end to end within its defined scope
2. No invariant defined in `architecture.md` was violated
3. `progress-tracker.md` reflects the completed work and is up to date
4. Any open questions raised during the unit are logged in `progress-tracker.md`
5. `npm run build` passes with no errors or type errors
6. No files outside the current unit's scope were modified without a clear reason