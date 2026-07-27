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

alter table public.career_agent_messages enable row level security;
alter table public.career_agent_feedback enable row level security;

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
$$;
