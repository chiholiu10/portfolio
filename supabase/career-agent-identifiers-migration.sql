do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'career_agent_messages'
      and column_name = 'flowise_chat_id'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'career_agent_messages'
      and column_name = 'chat_id'
  ) then
    alter table public.career_agent_messages
      rename column flowise_chat_id to chat_id;
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'career_agent_messages'
      and column_name = 'flowise_message_id'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'career_agent_messages'
      and column_name = 'message_id'
  ) then
    alter table public.career_agent_messages
      rename column flowise_message_id to message_id;
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'career_agent_messages'
      and column_name = 'flowise_feedback_id'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'career_agent_messages'
      and column_name = 'feedback_id'
  ) then
    alter table public.career_agent_messages
      rename column flowise_feedback_id to feedback_id;
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'career_agent_feedback'
      and column_name = 'flowise_chat_id'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'career_agent_feedback'
      and column_name = 'chat_id'
  ) then
    alter table public.career_agent_feedback
      rename column flowise_chat_id to chat_id;
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'career_agent_feedback'
      and column_name = 'flowise_message_id'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'career_agent_feedback'
      and column_name = 'message_id'
  ) then
    alter table public.career_agent_feedback
      rename column flowise_message_id to message_id;
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'career_agent_feedback'
      and column_name = 'flowise_feedback_id'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'career_agent_feedback'
      and column_name = 'feedback_id'
  ) then
    alter table public.career_agent_feedback
      rename column flowise_feedback_id to feedback_id;
  end if;
end;
$$;

drop index if exists public.career_agent_messages_flowise_message_id_idx;

create index if not exists career_agent_messages_message_id_idx
  on public.career_agent_messages (message_id);

create index if not exists career_agent_feedback_message_id_idx
  on public.career_agent_feedback (message_id);

create unique index if not exists career_agent_feedback_session_message_uidx
  on public.career_agent_feedback (session_id, message_id);
