# AI Workflow Rules

## Approach

Build this project incrementally using a spec-driven workflow. Context files define what to build, how to build it, and the current state. Always implement exactly against the specs and context — do not infer or add extra features.

Read these files in order before every session:
1. `project-overview.md`
2. `architecture.md`
3. `ui-context.md`
4. `code-standards.md`
5. `progress-tracker.md`

Implement **one feature unit at a time**. Verify it works, update progress, then stop.

## Scoping Rules

- Work on one small, verifiable unit per session
- Never combine UI + backend changes in the same unit
- Do not add features that are marked out of scope for v1
- Prefer simplicity — no premature optimization or extra libraries

## When to Split Work

Split if the unit includes:
- Both frontend and backend changes
- Multiple unrelated API routes
- Database schema changes + feature logic
- Auth flows + unrelated features

## Handling Missing Requirements

- Do not invent behavior not defined in the context files
- If something is ambiguous, note it as an open question in `progress-tracker.md` and stop
- Never add "nice-to-have" features because they seem logical
- All v1 decisions must stay within the locked scope in `project-overview.md`

## Protected Files

Do not modify without explicit instruction:
- Any context files (`*.md` in root or `context/`)
- `src/components/ui/*` (shadcn components)
- Environment files

## Code & Architecture Rules

- Follow `architecture.md` invariants strictly
- Use Supabase UI only for auth flows
- Keep all business logic in `src/services/`
- All mutations must go through services
- Public profile routes must respect `is_public` flag
- Self-reported credentials only in v1 (`is_verified = false`)

## Verification Before Completion

Before marking a unit complete:
1. Unit works end-to-end within defined scope
2. No violations of architecture invariants
3. `npm run build` passes with no errors
4. Mobile responsive and matches UI context
5. `progress-tracker.md` has been updated
6. No files outside the unit's scope were changed

## Progress Tracking

After each unit:
- Update `progress-tracker.md` with what was completed
- Log any open questions or decisions made

Keep the project focused, simple, and true to the v1 scope.