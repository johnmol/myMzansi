-- Create profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  headline text,
  bio text,
  avatar_url text,
  phone text,
  location text,
  is_public boolean default false,
  slug text unique,
  created_at timestamp with time zone default now()
);

-- Enable RLS and policies
alter table public.profiles enable row level security;

-- Allow users to insert/update their own profile (owner = auth.uid())
create policy "profiles_is_owner" on public.profiles
  for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Public read for profiles marked as public
create policy "profiles_public_read" on public.profiles
  for select
  using (is_public = true or auth.uid() = id);
