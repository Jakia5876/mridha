-- =========================================================
-- Portfolio database schema (Supabase)
-- Safe to re-run. Run in Supabase → SQL Editor if you ever
-- need to recreate the database.
-- =========================================================

-- ---------- admins: emails allowed to edit the site ----------
create table if not exists public.admins (
  email text primary key
);
alter table public.admins enable row level security;
-- (no policies → not readable/writable from the website; manage in SQL editor)

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
grant execute on function public.is_admin() to anon, authenticated;

-- ---------- site_content: the whole portfolio as one JSON document ----------
create table if not exists public.site_content (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;

drop policy if exists "site_content public read" on public.site_content;
create policy "site_content public read" on public.site_content
  for select using (true);

drop policy if exists "site_content admin insert" on public.site_content;
create policy "site_content admin insert" on public.site_content
  for insert to authenticated with check (public.is_admin());

drop policy if exists "site_content admin update" on public.site_content;
create policy "site_content admin update" on public.site_content
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------- messages: contact form submissions ----------
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (char_length(email) between 3 and 320),
  subject text check (subject is null or char_length(subject) <= 300),
  message text not null check (char_length(message) between 1 and 5000),
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.messages enable row level security;

drop policy if exists "messages anyone can send" on public.messages;
create policy "messages anyone can send" on public.messages
  for insert to anon, authenticated with check (is_read = false);

drop policy if exists "messages admin read" on public.messages;
create policy "messages admin read" on public.messages
  for select to authenticated using (public.is_admin());

drop policy if exists "messages admin update" on public.messages;
create policy "messages admin update" on public.messages
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "messages admin delete" on public.messages;
create policy "messages admin delete" on public.messages
  for delete to authenticated using (public.is_admin());

-- ---------- storage: public "media" bucket for images / CV ----------
insert into storage.buckets (id, name, public, file_size_limit)
values ('media', 'media', true, 10485760)
on conflict (id) do update set public = true, file_size_limit = 10485760;

drop policy if exists "media admin insert" on storage.objects;
create policy "media admin insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "media admin update" on storage.objects;
create policy "media admin update" on storage.objects
  for update to authenticated using (bucket_id = 'media' and public.is_admin());

drop policy if exists "media admin delete" on storage.objects;
create policy "media admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and public.is_admin());
