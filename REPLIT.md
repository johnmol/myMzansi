# Replit Setup Guide for MyMzansi Skills

## Important - This is a Next.js Project

This is **NOT** a Vite/React project. Always run it as Next.js.

### Run Commands
- Development: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`

### Environment Variables
You must add these in Replit's Secrets (Environment Variables):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### How to Run
1. Open the Shell tab
2. Run: `npm install`
3. Run: `npm run dev`

### Important Notes
- Always use the App Router structure (`app/` directory)
- Do not run `vite` or any Vite commands
- Use `next dev` for local development

### Deployment
- Production deployment is on Vercel (main branch)
