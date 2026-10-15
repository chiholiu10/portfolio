# Career assistant setup

The active career assistant runs directly through the Next.js server. It uses
Supabase pgvector for verified knowledge retrieval, Groq for answer generation
and Gemini for embeddings and as a generation fallback.

## Required configuration

Copy `apps/web/.env.example` to `apps/web/.env.local` and configure the
server-only variables used by the enabled features:

- `GROQ_API_KEY`
- `GROQ_MODEL`
- `GEMINI_API_KEY`
- `GEMINI_MODEL`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CAREER_AGENT_HASH_SECRET`

Never expose provider or Supabase service-role credentials through a
`NEXT_PUBLIC_` variable.

## Knowledge retrieval

The assistant embeds a masked question with Gemini, queries the reviewed
Supabase pgvector tables and supplies only sufficiently relevant results to the
answer provider. Retrieved text is treated as untrusted context and cannot
override the system rules.

Run the privileged indexer only after reviewing approved knowledge changes:

```bash
yarn index:career-knowledge
```

The indexer replaces configured document rows, so it belongs on a trusted
machine or protected administrative job, not in pull-request CI.

## Optional history and feedback

Apply `supabase/career-agent-history.sql` for a new database. Existing databases
that still use the former provider-specific identifier columns must first apply
`supabase/career-agent-identifiers-migration.sql`.

Set `CAREER_AGENT_HISTORY_ENABLED=true` only when server-side history is wanted.
Messages are masked before storage, raw client addresses are not stored and
public database roles receive no direct read access.

## Local verification

Start the application with:

```bash
yarn dev
```

Then verify:

1. grounded questions return concise answers;
2. unsupported questions are declined instead of invented;
3. contact questions return direct email and WhatsApp actions;
4. provider failure uses the configured fallback;
5. feedback is accepted only for an assistant message owned by the session.

Use `yarn verify` before deployment. Provider keys, prompts, retrieved documents
and personal vacancy or chat content must never be written to application logs.
