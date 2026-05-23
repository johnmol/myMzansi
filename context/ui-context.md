# UI Context

## Theme

MyMzansi Skills uses a clean, confident, and professional design language. The goal is to make users feel their career identity looks credible and trustworthy — like a premium digital CV rather than a government form.

**Design philosophy:**
- Professional yet approachable (warm neutrals + teal accent)
- Strong focus on clarity and scannability — especially for credentials
- Mobile-first, fast, and lightweight
- Identity-first: the user's profile content should feel like the hero

Hard rules:
- Not bureaucratic/government style
- Not social network noisy
- Minimal animations
- High readability on mobile

---

## Colors

Use CSS variables only. No hardcoded hex values.

| Role                  | CSS Variable             | Value      |
|-----------------------|--------------------------|------------|
| Page background       | `--bg-base`              | `#F8F9F8`  |
| Surface               | `--bg-surface`           | `#FFFFFF`  |
| Surface raised        | `--bg-surface-raised`    | `#F1F5F4`  |
| Primary text          | `--text-primary`         | `#0F172A`  |
| Secondary text        | `--text-secondary`       | `#334155`  |
| Muted text            | `--text-muted`           | `#64748B`  |
| Primary accent        | `--accent-primary`       | `#0F766E`  |
| Accent hover          | `--accent-hover`         | `#115E59`  |
| Accent light          | `--accent-light`         | `#CCFBF1`  |
| Border default        | `--border-default`       | `#E2E8F0`  |
| Verified badge        | `--badge-verified`       | `#0F766E`  |
| Self-reported badge   | `--badge-self`           | `#64748B`  |
| Error                 | `--state-error`          | `#EF4444`  |
| Success               | `--state-success`        | `#10B981`  |

Teal (`--accent-primary`) is reserved for trust signals, primary buttons, and verified badges.

---

## Typography

| Role      | Font                | Usage |
|-----------|---------------------|-------|
| UI text   | Plus Jakarta Sans   | All interface text |
| Mono      | IBM Plex Mono       | Code or verification tokens if needed |

- Headings: `font-semibold`, generous line height
- Body text: minimum `text-base` (16px) for readability
- Mobile-first sizing

---

## Border Radius

| Element                    | Class         |
|----------------------------|---------------|
| Buttons, inputs            | `rounded-lg`  |
| Cards                      | `rounded-xl`  |
| Modals / sheets            | `rounded-2xl` |
| Badges                     | `rounded-md`  |
| Avatars                    | `rounded-full`|

---

## Component Library

- **shadcn/ui** as the primary component library
- **Supabase UI Library** used **only** for authentication screens (sign up, login, password reset)
- All other components built/customized with shadcn primitives + Tailwind
- Never modify files inside `src/components/ui/`

---

## Layout Patterns

- **Landing page**: Single scroll hero + sections, strong primary CTA
- **Dashboard**: Sidebar (desktop) or top/bottom nav (mobile). Clean sections with empty states
- **Public Profile**: Vertical stack — Hero → About → Experience → Skills → Credentials (most prominent)
- **Credential cards**: Clear title, institution, dates, badge (verified/self-reported), "View Document" button
- **Forms**: Clean, single column on mobile, generous spacing, inline validation
- **Empty states**: Friendly message + prominent action button

---

## Verified vs Self-Reported

- **Verified** (future): Teal badge with check icon + "Verified"
- **Self-Reported** (v1 default): Grey badge + "Self-Reported"
- Always visually distinct at a glance

---

## Icons

- **Lucide React** only
- Consistent `h-4 w-4` or `h-5 w-5` sizing
- Pair icons with text labels

---

## UI Principles for v1

- Prioritize speed and clarity over visual flair
- Credential section must be the strongest visual element on public profiles
- Make uploading and viewing documents feel effortless
- Strong empty states to guide first-time users
- Mobile experience must feel native
- Every screen should feel purposeful — no unnecessary chrome

---