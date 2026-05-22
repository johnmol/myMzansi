# UI Context

## Theme

MyMzansi Skills uses a confident, modern, and human design language built around one
idea: *this is where your professional identity lives.* The platform should feel like
a premium personal career tool — the kind of product a person is proud to share as
their professional presence online.

The aesthetic is clean and ambitious. Light backgrounds with strong typographic
hierarchy, warm-neutral surfaces, and a deep teal accent that communicates credibility
without feeling like a government portal. Think less "online form" and more "personal
brand platform."

The experience should feel fast, focused, and intentional. Every screen should make
the user feel capable and credible — not like they are filling in paperwork.

Design philosophy:
- **Identity-first** — the user's profile is the hero, not the platform's branding
- **Confident** — strong typography, clear hierarchy, generous whitespace
- **Warm** — approachable and human, not cold or bureaucratic
- **Mobile-native** — built for phones first, not adapted afterward
- **Accessible** — high contrast, legible at all sizes, touch-friendly
- **Fast** — lightweight UI, no heavy animations or bloated components

Hard rules on what this is not:
- Not a government portal — no flat greys, no cramped form layouts
- Not a job board — no listing-heavy grid spam
- Not a social network — no feeds, reactions, or follower counts
- No heavy gradients, glassmorphism, or decorative noise

---

## Colors

All components must use CSS variables. No hardcoded hex values anywhere.

| Role              | CSS Variable          | Value     |
| ----------------- | --------------------- | --------- |
| Page background   | `--bg-base`           | `#F7F9F8` |
| Surface           | `--bg-surface`        | `#FFFFFF` |
| Surface raised    | `--bg-surface-raised` | `#F0F4F3` |
| Primary text      | `--text-primary`      | `#0D1F1C` |
| Secondary text    | `--text-secondary`    | `#374151` |
| Muted text        | `--text-muted`        | `#6B7280` |
| Primary accent    | `--accent-primary`    | `#0F766E` |
| Accent hover      | `--accent-hover`      | `#115E59` |
| Accent light      | `--accent-light`      | `#CCFBF1` |
| Border default    | `--border-default`    | `#E5E7EB` |
| Border subtle     | `--border-subtle`     | `#F3F4F6` |
| Error             | `--state-error`       | `#DC2626` |
| Success           | `--state-success`     | `#15803D` |
| Warning           | `--state-warning`     | `#D97706` |
| Verified badge    | `--badge-verified`    | `#0F766E` |
| Unverified badge  | `--badge-unverified`  | `#9CA3AF` |

The teal accent (`--accent-primary`) is the single most important colour on the
platform. It marks verified credentials, primary actions, and trust signals.
Use it deliberately — not decoratively.

---

## Typography

Typography carries the platform's personality. Headings should feel confident and
editorial. Body text should be effortlessly readable at small sizes on mobile.

| Role      | Font          | Variable      |
| --------- | ------------- | ------------- |
| UI text   | Plus Jakarta Sans | `--font-sans` |
| Code/mono | IBM Plex Mono | `--font-mono` |

Rules:
- Headings use `font-semibold` or `font-bold` — never `font-black`
- Body text is `text-base` (`16px`) minimum — never smaller than `text-sm` in
  primary reading contexts
- Line height for body: `leading-relaxed`
- Line height for headings: `leading-tight`
- Use `--text-muted` for supporting information, metadata, and timestamps
- Never use more than three distinct font sizes on a single screen
- Do not use condensed, display, or decorative typefaces anywhere

---

## Border Radius

Corners should feel modern and approachable — not pill-shaped, not sharp.

| Context                    | Class         |
| -------------------------- | ------------- |
| Inline elements / badges   | `rounded-md`  |
| Buttons                    | `rounded-lg`  |
| Cards / panels             | `rounded-xl`  |
| Modals / sheets / overlays | `rounded-2xl` |
| Avatar images              | `rounded-full`|

---

## Component Library

Use shadcn/ui on top of TailwindCSS.

All base components live in `src/components/ui/` — do not modify these files.
Use the shadcn CLI to add components rather than building common UI elements
from scratch.

When extending a shadcn component, wrap it in a new component in
`src/components/` rather than editing the base file in `ui/`.

Component styling must stay:
- minimal and purposeful
- accessible (keyboard navigable, correct ARIA)
- responsive at all breakpoints
- free from excessive animation or transitions

---

## Layout Patterns

- **App shell** — top navigation bar with a clean bottom border, full-width layout,
  optional left sidebar on desktop that collapses on mobile
- **Profile page** — hero section with avatar, name, and headline at the top;
  credential cards in a stacked single-column layout on mobile, two-column on desktop
- **Credential cards** — each credential is its own card with a clear verified /
  unverified status indicator, institution name, date, and an action link
- **CV builder** — two-panel layout on desktop: live editable form on the left,
  PDF preview on the right; single-column stacked on mobile
- **Sidebars** — subtle `--border-default` separator, no shadows, clean item spacing
- **Modals** — centered overlay with `backdrop-blur-sm`, `rounded-2xl` container,
  and a visible close action
- **Forms** — multi-step where onboarding requires it; single clearly labelled field
  per row on mobile; inline validation messages below each field
- **Empty states** — every list or section must have a designed empty state with a
  brief human message and a clear call to action

---

## Verified vs Unverified Visual Language

Verification status is the platform's most important trust signal. It must be visually
unambiguous at a glance.

- **Verified credential** — teal badge with a checkmark icon, `--badge-verified`
  background, label: "Verified"
- **Unverified credential** — grey badge, `--badge-unverified` colour,
  label: "Pending Verification" or "Self-reported"
- Never use similar styling for both states
- Verified badges use `--accent-light` as a soft background behind the badge
  on card surfaces

---

## Icons

Use Lucide React exclusively. No other icon libraries.

- Stroke-based only — no filled icons
- Consistent stroke width across all usage
- Never use icons as the only signifier — always pair with a label or tooltip

| Context          | Size        |
| ---------------- | ----------- |
| Inline / text    | `h-4 w-4`   |
| Buttons          | `h-5 w-5`   |
| Feature sections | `h-6 w-6`   |
| Empty states     | `h-10 w-10` |

---

## UI Principles

- **Your profile is the product** — every design decision should make the user's
  professional identity look better, not the platform's chrome
- **Trust through clarity** — if a user cannot tell at a glance whether a credential
  is verified, the design has failed
- **Earn every screen** — do not add modals, toasts, or overlays unless they are
  genuinely necessary
- **Design for low bandwidth** — no autoplay video, no massive hero images, minimal
  external asset loading
- **Optimise for first-time users** — onboarding friction is the biggest drop-off
  risk; every step should feel obvious and fast
- **Whitespace is intentional** — generous spacing communicates quality, not emptiness