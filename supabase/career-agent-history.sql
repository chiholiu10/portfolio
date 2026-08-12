create extension if not exists pgcrypto;

create table if not exists public.career_agent_messages (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  flowise_chat_id text,
  flowise_message_id text,
  flowise_feedback_id text,
  feedback text check (feedback in ('THUMBS_UP', 'THUMBS_DOWN')),
  provider text,
  model text,
  contact_options text[],
  client_address_hash text,
  created_at timestamptz not null default now()
);

create table if not exists public.career_agent_feedback (
  id uuid primary key default gen_random_uuid(),
  session_id text,
  flowise_chat_id text not null,
  flowise_message_id text not null,
  flowise_feedback_id text,
  rating text not null check (rating in ('THUMBS_UP', 'THUMBS_DOWN')),
  created_at timestamptz not null default now()
);

create index if not exists career_agent_messages_session_id_idx
  on public.career_agent_messages (session_id);

create index if not exists career_agent_messages_created_at_idx
  on public.career_agent_messages (created_at);

create index if not exists career_agent_messages_flowise_message_id_idx
  on public.career_agent_messages (flowise_message_id);

create index if not exists career_agent_feedback_message_id_idx
  on public.career_agent_feedback (flowise_message_id);

create unique index if not exists career_agent_feedback_session_message_uidx
  on public.career_agent_feedback (session_id, flowise_message_id);

create table if not exists public.career_agent_rate_limits (
  rate_key text primary key,
  request_count integer not null default 0,
  expires_at timestamptz not null
);

alter table public.career_agent_messages enable row level security;
alter table public.career_agent_feedback enable row level security;
alter table public.career_agent_rate_limits enable row level security;

drop policy if exists "No public read access to career agent messages"
  on public.career_agent_messages;
drop policy if exists "No public read access to career agent feedback"
  on public.career_agent_feedback;

create policy "No public read access to career agent messages"
  on public.career_agent_messages
  for select
  using (false);

create policy "No public read access to career agent feedback"
  on public.career_agent_feedback
  for select
  using (false);

drop policy if exists "No public access to career agent rate limits"
  on public.career_agent_rate_limits;

create policy "No public access to career agent rate limits"
  on public.career_agent_rate_limits
  for all
  using (false)
  with check (false);

drop function if exists public.consume_career_agent_rate_limit(
  text,
  integer,
  integer
);

create function public.consume_career_agent_rate_limit(
  p_rate_key text,
  p_request_limit integer,
  p_window_seconds integer
)
returns table (allowed boolean, retry_after_seconds integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamptz := clock_timestamp();
  current_count integer;
  current_expiry timestamptz;
begin
  insert into public.career_agent_rate_limits (
    rate_key,
    request_count,
    expires_at
  )
  values (
    p_rate_key,
    1,
    v_now + make_interval(secs => greatest(p_window_seconds, 1))
  )
  on conflict (rate_key) do update
  set
    request_count = case
      when career_agent_rate_limits.expires_at <= v_now then 1
      else career_agent_rate_limits.request_count + 1
    end,
    expires_at = case
      when career_agent_rate_limits.expires_at <= v_now
        then v_now + make_interval(secs => greatest(p_window_seconds, 1))
      else career_agent_rate_limits.expires_at
    end
  returning request_count, expires_at
  into current_count, current_expiry;

  return query
  select
    current_count <= greatest(p_request_limit, 1),
    greatest(0, ceil(extract(epoch from current_expiry - v_now)))::integer;
end;
$$;

revoke all on function public.consume_career_agent_rate_limit(text, integer, integer)
  from public, anon, authenticated;
grant execute on function public.consume_career_agent_rate_limit(text, integer, integer)
  to service_role;

create or replace function public.save_career_agent_feedback(
  p_session_id text,
  p_chat_id text,
  p_message_id text,
  p_feedback_id text,
  p_rating text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  saved_id uuid;
begin
  if p_rating not in ('THUMBS_UP', 'THUMBS_DOWN') then
    return null;
  end if;

  if not exists (
    select 1
    from public.career_agent_messages
    where session_id = p_session_id
      and flowise_message_id = p_message_id
      and role = 'assistant'
  ) then
    return null;
  end if;

  insert into public.career_agent_feedback (
    session_id,
    flowise_chat_id,
    flowise_message_id,
    flowise_feedback_id,
    rating
  )
  values (
    p_session_id,
    p_chat_id,
    p_message_id,
    p_feedback_id,
    p_rating
  )
  on conflict (session_id, flowise_message_id) do update
  set
    rating = excluded.rating,
    flowise_feedback_id = excluded.flowise_feedback_id
  returning id into saved_id;

  update public.career_agent_messages
  set
    feedback = p_rating,
    flowise_feedback_id = p_feedback_id
  where session_id = p_session_id
    and flowise_message_id = p_message_id
    and role = 'assistant';

  return saved_id;
end;
$$;

revoke all on function public.save_career_agent_feedback(
  text,
  text,
  text,
  text,
  text
) from public, anon, authenticated;
grant execute on function public.save_career_agent_feedback(
  text,
  text,
  text,
  text,
  text
) to service_role;

create or replace function public.delete_old_career_agent_history(
  retention interval default interval '90 days'
)
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.career_agent_feedback
  where created_at < now() - retention;

  delete from public.career_agent_messages
  where created_at < now() - retention;

  delete from public.career_agent_rate_limits
  where expires_at < now() - interval '1 day';
$$;

create extension if not exists pg_cron;

do $$
declare
  existing_job bigint;
begin
  select jobid into existing_job
  from cron.job
  where jobname = 'career-agent-daily-retention';

  if existing_job is not null then
    perform cron.unschedule(existing_job);
  end if;

  perform cron.schedule(
    'career-agent-daily-retention',
    '17 3 * * *',
    $job$select public.delete_old_career_agent_history(interval '90 days');$job$
  );
end;
$$;
