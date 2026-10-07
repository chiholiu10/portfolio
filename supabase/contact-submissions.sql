create extension if not exists pgcrypto;

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null unique,
  name text not null check (char_length(name) between 1 and 80),
  email text not null check (char_length(email) between 3 and 254),
  company text check (company is null or char_length(company) <= 120),
  subject text not null check (char_length(subject) between 1 and 140),
  message text not null check (char_length(message) between 20 and 2000),
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  consented_at timestamptz not null,
  client_address_hash text,
  user_agent text check (user_agent is null or char_length(user_agent) <= 300),
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index if not exists contact_submissions_status_idx
  on public.contact_submissions (status);

alter table public.contact_submissions enable row level security;

drop policy if exists "No public access to contact submissions"
  on public.contact_submissions;

create policy "No public access to contact submissions"
  on public.contact_submissions
  for all
  using (false)
  with check (false);

revoke all on public.contact_submissions from public, anon, authenticated;
grant all on public.contact_submissions to service_role;

create or replace function public.delete_expired_contact_submissions(
  retention interval default interval '30 days'
)
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.contact_submissions
  where created_at < now() - retention;
$$;

revoke all on function public.delete_expired_contact_submissions(interval)
  from public, anon, authenticated;
grant execute on function public.delete_expired_contact_submissions(interval)
  to service_role;

create extension if not exists pg_cron;

do $$
declare
  existing_job bigint;
begin
  select jobid into existing_job
  from cron.job
  where jobname = 'contact-submissions-daily-retention';

  if existing_job is not null then
    perform cron.unschedule(existing_job);
  end if;

  perform cron.schedule(
    'contact-submissions-daily-retention',
    '23 3 * * *',
    $job$select public.delete_expired_contact_submissions(interval '30 days');$job$
  );
end;
$$;
