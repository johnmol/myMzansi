# MyMzansi Skills

## Overview

MyMzansi Skills is a South African digital career and credential platform that allows
individuals to store, verify, and showcase their qualifications, certifications, and
professional achievements in one trusted place. It serves job seekers, students,
professionals, employers, and training providers. The platform solves a widespread
problem in South Africa where qualifications are scattered across physical documents,
emails, and messaging apps, and where employers face rampant fake credentials and slow
verification processes. MyMzansi Skills acts as a verified digital career passport —
combining a CV builder, a certificate wallet, and a talent discovery engine — built
specifically for the South African education and employment landscape, with support for
NQF levels, SAQA alignment, and SETA-issued credentials.

## Goals

1. Enable job seekers to build a verified, shareable professional profile backed by
   real, institution-issued credentials within minutes of signing up.
2. Allow employers and recruiters to instantly verify candidate qualifications and
   search for talent by skill, certification, or NQF level without manual back-and-forth.
3. Provide training providers and institutions with a simple tool to issue tamper-evident
   digital certificates directly to learner profiles, improving credential trust across
   the ecosystem.

## Core User Flow

### Job Seeker Flow

1. User signs up and creates a personal account.
2. User builds a professional profile with personal details, work experience, and skills.
3. User uploads existing certificates or receives digital credentials from a registered
   training provider.
4. User generates a professional CV from their profile.
5. User shares a public profile link with employers or applies through the platform.
6. Employer views profile, verifies credentials, and contacts the candidate.

### Employer Flow

1. Employer registers a company account.
2. Employer searches the candidate pool by skill, certification, or NQF level.
3. Employer views a candidate's public profile and verifies credentials via verification link.
4. Employer contacts shortlisted candidates directly.

### Training Provider Flow

1. Institution registers and submits for platform verification.
2. Verified institution issues digital certificates to learner profiles.
3. Institution tracks learner outcomes and showcases successful graduates.

## Features

### User Profiles

- User sign-in and route protection
- Professional profile with personal details, work history, and skills
- Public shareable profile URL
- Profile visibility controls (public / private / employers only)

### Credential Management

- Certificate upload (PDF, image)
- Digital certificate wallet
- Credential verification links per certificate
- Verified badge display for institution-issued credentials
- NQF level tagging on qualifications

### CV Builder

- Auto-generated CV from profile data
- Downloadable PDF CV
- Skills and achievement highlights

### Employer Tools

- Candidate search and filtering by skill, certification, or NQF level
- Candidate profile viewing
- One-click credential verification
- Shortlisting and basic contact tools

### Institution Tools

- Institution registration and identity verification
- Manual digital certificate issuance to learner profiles
- Learner credential approval workflow
- Institution public page listing graduates

### Trust & Verification

- Unique verification link per credential
- Verified institution badges
- Flagging system for suspicious uploads (manual review)

## Scope

### In Scope

- Web application (desktop and mobile-responsive)
- Job seeker profile and credential management
- CV generation and PDF export
- Employer candidate search and credential verification
- Training provider certificate issuance
- Public shareable profile pages
- Basic admin panel for managing institution verification requests

### Out of Scope

- Native mobile app (iOS / Android)
- AI-powered CV recommendations or skills gap analysis
- Skills assessments or built-in testing
- Learnership or job marketplace (applications, listings)
- Government or Home Affairs identity verification integration
- QR code credential scanning
- Payment processing or subscription billing
- LinkedIn or third-party OAuth integrations
- Pan-African or multi-country support

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | Next.js, TailwindCSS                |
| Authentication | Supabase                         |
| Backend  | Supabase (database, APIs, storage)  |
| Database | PostgreSQL                          |
| Hosting  | Vercel (frontend), Supabase (backend/services) |
| Storage  | Supabase Storage (certificates, CVs, Profile files)|

## Success Criteria

1. A job seeker can sign up, build a complete profile, upload a certificate, and share
   a public profile link — end to end — in under 10 minutes.
2. An employer can search candidates by skill or certification and verify a credential
   without leaving the platform.
3. A registered training provider can issue a digital certificate to a learner profile,
   and that certificate appears as verified on the learner's public page.
4. A generated CV PDF accurately reflects a user's profile data and is formatted
   professionally enough to submit to a real employer.
5. The platform correctly distinguishes between unverified (user-uploaded) and verified
   (institution-issued) credentials on every public profile.