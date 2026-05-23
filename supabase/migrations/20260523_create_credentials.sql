-- Create credentials table
create table if not exists public.credentials (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
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

create policy "credentials_is_owner" on public.credentials
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
