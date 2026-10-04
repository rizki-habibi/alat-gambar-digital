create table if not exists public.vtuber_projects (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null,
 name text not null default 'Karakter Baru',
 data jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
alter table public.vtuber_projects enable row level security;
drop policy if exists "anonymous users own projects" on public.vtuber_projects;
create policy "anonymous users own projects" on public.vtuber_projects
for all to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
create index if not exists vtuber_projects_user_id_idx on public.vtuber_projects(user_id);