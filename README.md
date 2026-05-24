# MyMzansi Skills

MyMzansi Skills is a digital career passport for South African job seekers. Users can create a profile, upload credentials, toggle a public share link, and export a CV PDF.

## Current Status

MVP v1 is complete. The app includes landing, auth, dashboard, profile management, credential management, public profile pages, and CV export.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file with the Supabase values used by the app:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000).

## Common Commands

```bash
npm run dev
npm run build
npm run lint
```

## Main Routes

- `/` landing page
- `/signup` and `/login` authentication screens
- `/dashboard` overview
- `/dashboard/profile` profile editor and share controls
- `/dashboard/credentials` credential management
- `/profile/[slug]` public profile page
- `/for-employers` employer information page

## Notes

- Supabase is required for auth, storage, and database access.
- Certificates and CV files are stored in Supabase Storage.
- Public profile visibility is controlled from the dashboard profile page.
