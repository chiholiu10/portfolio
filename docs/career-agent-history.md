# Career agent chat history

This project can optionally store career-agent chat history in Supabase.

## Security model

- The browser never writes directly to Supabase.
- Writes happen only through Next.js API routes.
- Use `SUPABASE_SERVICE_ROLE_KEY` only as a server-side env var.
- Do not expose Supabase service role keys with `NEXT_PUBLIC_`.
- Email addresses and phone numbers are masked before storage.
- Full IP addresses are not stored; only a SHA-256 hash is stored.
- RLS is enabled and public reads are denied by default.

## Setup

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Run:

```txt
supabase/career-agent-history.sql
```

4. Add server-side env vars:

```env
CAREER_AGENT_HISTORY_ENABLED=true
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

5. Redeploy or restart the app.

If these env vars are missing, the chatbot still works; history logging is skipped.

## Retention

Recommended retention for testing:

```txt
30-90 days
```

Manual cleanup example:

```sql
select public.delete_old_career_agent_history(interval '90 days');
```

Use Supabase scheduled jobs or an external cron if you want automatic cleanup.
