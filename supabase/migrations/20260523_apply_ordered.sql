-- Idempotent migration: ensure profiles then credentials with safe policy creation

-- Create profiles table if missing
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

alter table public.profiles enable row level security;

-- Recreate policies idempotently
drop policy if exists profiles_is_owner on public.profiles;
create policy profiles_is_owner on public.profiles
  for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists profiles_public_read on public.profiles;
create policy profiles_public_read on public.profiles
  for select
  using (is_public = true or auth.uid() = id);

-- Create credentials table if missing
create table if not exists public.credentials (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  institution_name text not null,
  nqf_level integer,
  issue_date date not null,
  expiry_date date,
  file_path text,
  is_verified boolean default false,
  created_at timestamp with time zone default now()
);

alter table public.credentials enable row level security;

drop policy if exists credentials_is_owner on public.credentials;
create policy credentials_is_owner on public.credentials
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
