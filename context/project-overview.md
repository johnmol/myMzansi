# MyMzansi Skills - Project Overview

## Overview

MyMzansi Skills is a simple, practical digital career passport for South Africans. It allows job seekers — especially recent TVET and university graduates as well as working professionals (e.g. in IT) — to create a professional profile, upload their certificates and qualifications, and generate a clean, shareable public profile link. The platform focuses on making credentials trustworthy and easy to present to employers, reducing the friction of scattered documents and qualification doubts.

## Goals

1. Enable a user to go from sign-up to having a professional, shareable public profile with credentials in under 10 minutes.
2. Make credentials visible and credible to employers through clear verified/self-reported status and direct document access.
3. Provide a clean professional CV PDF export from the user's profile data.
4. Build a solid, maintainable foundation that can support future employer tools and institution features.

## Core User Flow (Primary User)

1. User lands on home page and clicks "Create Your Profile" → Supabase sign-up (email/password or phone).
2. Redirected to Dashboard.
3. Completes basic profile setup (name, headline, location, bio, avatar, experience, skills).
4. Adds credentials via simple form + file upload.
5. Previews public profile and toggles visibility.
6. Copies shareable link and/or downloads CV PDF.

## Features (v1)

### Job Seeker / User Features
- Simple landing page with clear CTA
- Supabase Auth (sign up, login, password reset)
- Private Dashboard for editing profile
- Credential management (add, view, edit, delete)
- Public profile page with auto-generated URL
- Basic CV PDF generation and download
- Profile visibility toggle

### Public Pages
- Clean public profile (`/profile/[slug]`)
- Informational employer landing page (`/for-employers`) — static only

### Technical Foundations
- Secure file storage for certificates and avatars
- Responsive, mobile-first UI

## In Scope (v1)

- Job seeker profile creation and credential wallet
- Self-uploaded credentials with clear "Self-reported" status
- Simple public profile sharing
- Basic one-page CV PDF export
- Dashboard for personal management
- Static employer informational page
- Full mobile responsiveness

## Out of Scope (v1)

- Any employer tools (search, filtering, candidate directory)
- Institution registration or certificate issuance
- AI analysis or competency scoring
- Custom profile URLs
- Advanced profile builder features (recommendations, rich media, etc.)
- Government integrations (Home Affairs, SAQA, etc.)
- Payments, subscriptions, or monetization
- Native mobile apps
- Job marketplace or applications
- Social features (connections, endorsements)

## Success Criteria

1. A new user can sign up, build a basic profile, add at least one credential with document, and copy a working public profile link — end-to-end — in a single session.
2. The public profile page loads quickly, looks professional on mobile, and clearly displays credentials with document access.
3. The generated CV PDF is clean, readable, and contains the key profile + credential information.
4. All credential data and files are stored securely with proper access controls.
5. The codebase follows the defined architecture, standards, and invariants with no major tech debt.

---