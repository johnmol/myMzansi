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
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'profiles'
      and policyname = 'profiles_is_owner'
  ) then
    create policy "profiles_is_owner" on public.profiles
      for all
      using (auth.uid() = id)
      with check (auth.uid() = id);
  end if;
end $$;

-- Public read for profiles marked as public
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'profiles'
      and policyname = 'profiles_public_read'
  ) then
    create policy "profiles_public_read" on public.profiles
      for select
      using (is_public = true or auth.uid() = id);
  end if;
end $$;
