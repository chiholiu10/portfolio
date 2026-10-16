# Chiho Liu Portfolio

[![CI](https://github.com/chiholiu10/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/chiholiu10/portfolio/actions/workflows/ci.yml)

A production-oriented portfolio built with Next.js, TypeScript, Contentful, Supabase and a private Python matching service. The project combines recruiter-focused case studies, an explainable vacancy matcher, a privacy-conscious career assistant and a secure contact flow.

This document is the main onboarding and operational reference for the repository. Detailed implementation notes remain in [`docs/`](docs/).

## What the application contains

- Responsive portfolio with Contentful-managed sections and case studies.
- Individual project pages with stable project IDs and hourly revalidation.
- Explainable vacancy matcher that connects explicit vacancy requirements to verified portfolio evidence.
- Career assistant grounded with Supabase pgvector retrieval.
- Groq response generation with Gemini fallback; Gemini also generates retrieval embeddings.
- Direct email and WhatsApp actions for questions that require current or personal information.
- Supabase-backed contact form with optional Resend notifications.
- Optional privacy-controlled chat history and feedback storage.
- Sitemap, metadata, redirects and security headers.
- Optional local Phoenix container for future observability experiments.
- GitHub Actions CI and a gated Vercel production deployment.

The career assistant can be shown or hidden independently for localhost and production through the Contentful contact-section flags `showCareerAgentInLocalhost` and `showCareerAgentInProduction`.

## System architecture

```text
Browser
  |
  v
Next.js web application and API gateway
  |-- Contentful GraphQL       portfolio sections and case studies
  |-- Supabase PostgreSQL      contact records, rate limits, optional history
  |-- Supabase pgvector        verified career-knowledge retrieval
  |-- Groq / Gemini            grounded career-assistant answers
  `-- Private FastAPI service  vacancy requirement extraction and ranking
          |
          `-- Gemini or deterministic keyword fallback
```

The browser never receives provider keys, the Supabase service-role key, Contentful delivery credentials or the matcher token. All privileged calls go through server-side Next.js API routes.

### Main request flows

**Portfolio content**

```text
Contentful -> Next.js server loaders -> Zod validation -> page/template -> browser
```

Invalid CMS structures fail the build or regeneration instead of silently rendering corrupted content.

**Career assistant**

```text
Question
  -> validation, origin check and input-safety filter
  -> distributed Supabase rate limit
  -> Gemini query embedding
  -> pgvector retrieval from verified knowledge tables
  -> Groq answer, with Gemini as fallback
  -> optional masked history record
  -> concise answer and optional contact/project actions
```

**Vacancy matcher**

```text
Vacancy text
  -> Next.js validation, masking and rate limit
  -> current Contentful case studies
  -> authenticated private FastAPI request
  -> Gemini requirement extraction or keyword fallback
  -> deterministic evidence validation in Next.js
  -> requirement-by-requirement explanation
```

The matcher does not return a fabricated suitability percentage. Its confidence labels describe the amount of verified evidence, not model certainty. Vacancy text and results are not persisted.

**Contact form**

```text
Form
  -> validation, origin check and rate limit
  -> Supabase contact_submissions
  `-> optional Resend notification
```

## Repository structure

```text
apps/
  web/                         Next.js UI, routes and server API gateway
    components/                Atomic Design components
    lib/                       content, retrieval, validation and domain logic
    pages/                     pages and API routes
    public/                    fonts, icons and static assets
    styles/                    theme, tokens, resets and breakpoints
    Dockerfile                 standalone production image
    Dockerfile.dev             development image
  matcher-api/                 private FastAPI vacancy matcher
packages/
  matcher-contracts/           shared Zod request and response contracts
scripts/
  dev.mjs                      development-mode orchestrator
  dev/                         health, process and Docker modules
  production.mjs               production Compose command runner
  production-environment.mjs   temporary secure env-file preparation
  check-production.mjs         local production smoke tests
  index-career-knowledge.mjs   privileged pgvector indexing command
  test-matcher-docker.mjs      matcher crash-recovery integration test
  evaluate-matcher.py          deterministic quality evaluation
evaluation/                    reviewed matcher cases, thresholds and report
supabase/                      idempotent database migrations
docs/                          focused operational and architecture notes
.github/workflows/             CI and production deployment
```

The UI follows Atomic Design:

- `atoms`: small visual and motion primitives.
- `molecules`: reusable combinations such as headings and project cards.
- `organisms`: complete portfolio sections and interactive features.
- `templates`: page composition without direct CMS queries.
- `pages`: routing, server-side data loading and API boundaries.

ESLint enforces dependency direction and prevents CMS queries from leaking into UI components. Component styling remains colocated and follows the repository rules in [`AGENTS.md`](AGENTS.md).

## Technology

| Area               | Technology                                                        |
| ------------------ | ----------------------------------------------------------------- |
| Frontend           | Next.js 16, React 19, TypeScript                                  |
| Styling and motion | styled-components, Motion, shared design tokens                   |
| Content            | Contentful GraphQL Delivery API                                   |
| Career assistant   | Groq, Gemini embeddings/generation, Supabase pgvector             |
| Vacancy analysis   | Python 3.13, FastAPI, Uvicorn, Gemini/keyword fallback            |
| Data               | Supabase PostgreSQL, RLS, pgvector, pg_cron                       |
| Validation         | Zod contracts at external boundaries                              |
| Testing            | Jest, Node test runner, Python unittest, Docker integration tests |
| Delivery           | GitHub Actions, Vercel, Docker Compose                            |
| Optional tooling   | Phoenix (not currently integrated)                                |

Supported production browsers are defined in [`apps/web/package.json`](apps/web/package.json): Chrome/Edge 111+, Firefox 115+ and Safari 16.4+.

## Prerequisites

- Node.js 22.
- Yarn Classic 1.22.
- Python 3.13 for local matcher development.
- Docker Desktop for container development, production simulation and Docker integration tests.
- Contentful delivery credentials for pages that load CMS content.
- Supabase, Gemini and optionally Groq/Resend credentials for their corresponding features.

## Environment configuration

Start from the tracked example:

```bash
cp apps/web/.env.example apps/web/.env.local
```

Never commit local env files. `.env`, `.env.local`, `.env.production.local` and `.env.phoenix.local` are ignored.

### Environment groups

| Variables                                                                  | Purpose                                                                  | Required when                                |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------- |
| `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ENVIRONMENT`, `CONTENTFUL_ACCESS_TOKEN` | Server-side CMS delivery                                                 | Building or serving portfolio content        |
| `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`                 | Public direct-contact actions                                            | Showing contact links                        |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`                                | Retrieval, contact storage, distributed rate limits and optional history | Using those server features                  |
| `GEMINI_API_KEY`, `GEMINI_MODEL`                                           | Embeddings, fallback answers and matcher extraction                      | Career assistant or AI matcher mode          |
| `GROQ_API_KEY`, `GROQ_MODEL`                                               | Primary career-assistant response provider                               | Optional but preferred for assistant answers |
| `MATCHER_API_URL`, `MATCHER_API_TOKEN`                                     | Authenticated Next.js-to-Python connection                               | Vacancy matcher                              |
| `CAREER_AGENT_HASH_SECRET`                                                 | HMAC for client-address rate-limit keys                                  | Production assistant and matcher             |
| `CAREER_AGENT_ALLOWED_ORIGINS`                                             | Career API origin allowlist                                              | Cross-origin production use                  |
| `CAREER_AGENT_RATE_LIMIT`, `CAREER_AGENT_RATE_WINDOW_MS`                   | Assistant request limits                                                 | Optional tuning                              |
| `CAREER_AGENT_HISTORY_ENABLED`                                             | Enables server-side history writes                                       | Optional, default `false`                    |
| `CONTACT_ALLOWED_ORIGINS`, `CONTACT_HASH_SECRET`                           | Contact API origin and hashing controls                                  | Contact form in production                   |
| `RESEND_API_KEY`, `CONTACT_NOTIFICATION_EMAIL`, `CONTACT_FROM_EMAIL`       | Optional email notification                                              | Sending contact notifications                |

`SUPABASE_SERVICE_ROLE_KEY`, provider keys, Contentful tokens, matcher tokens and hash secrets must never use the `NEXT_PUBLIC_` prefix.

### Env-file behavior

- Next.js reads `apps/web/.env.local` and `apps/web/.env` using normal Next.js precedence.
- `yarn dev:python` loads `.env.local` first and fills missing values from `.env`; explicitly exported shell variables win.
- Development Docker Compose reads `apps/web/.env`.
- Production simulation securely combines `.env`, `.env.local` and `.env.production.local` in that order. Later files override earlier files.
- The combined production file is created in the operating-system temp directory with mode `0600`, passed to Docker as a build secret/runtime env file and removed after the command.
- Hosted production secrets belong in Vercel and the backend hosting platform, not in repository files.

`MATCHER_ALLOW_PRIVATE_HTTP=true` is set only inside the isolated local production Compose network. Never add it to hosted production, where the matcher URL must use HTTPS.

## First-time setup

```bash
git clone https://github.com/chiholiu10/portfolio.git
cd portfolio
yarn install --frozen-lockfile
yarn setup:python
yarn dev:local
```

Open [http://localhost:3100](http://localhost:3100).

`yarn setup:python` creates `apps/matcher-api/.venv` and installs runtime plus test dependencies.

## Development modes

### Automatic mode

```bash
yarn dev
```

The orchestrator checks Docker availability:

- Docker daemon available and `apps/web/.env` present: run `web` and `matcher-api` with development Compose.
- Otherwise: run Next.js and Python as native child processes.

Before reusing ports `3100` or `8000`, the runner checks `/api/health` or `/ready`. A different process occupying either port causes a clear failure instead of being mistaken for this application. Signals and unexpected child exits are handled centrally.

### Force local processes

```bash
yarn dev:local
```

- Next.js: `http://localhost:3100`
- Matcher: `http://127.0.0.1:8000`
- Next.js hot reload is enabled.
- `apps/matcher-api/dev.py` restarts the Python server when Python files change or the child exits.

### Force development Docker

```bash
yarn dev:docker
```

The web container mounts the repository and polls for changes. The matcher source is mounted and runs through its development supervisor. The Python port is private to the Compose network.

Stop foreground mode with `Ctrl+C`. `yarn dev:stop` stops the development Compose services.

## Local production simulation

This is the closest local representation of the deployed application. It uses an optimized standalone Next.js server and a production Python process without source mounts or reload supervisors.

Start Docker Desktop, then run:

```bash
yarn prod:build
yarn prod:up
```

Open [http://localhost:3100](http://localhost:3100). Keep `prod:up` running and execute the smoke test in another terminal:

```bash
yarn prod:check
```

The smoke test verifies:

- Next.js `/api/health`.
- The rendered homepage.
- CSP, referrer, content-type and frame-protection headers.
- Matcher `/ready` through the private Compose network.

Background workflow:

```bash
yarn prod:up:detached
yarn prod:logs
yarn prod:check
yarn prod:down
```

Production containers run read-only, drop Linux capabilities, prevent privilege escalation, use temporary writable mounts and have memory limits. Only `127.0.0.1:3100` is published; matcher port `8000` is not exposed to the host.

## Command reference

### Development and production

| Command                 | Purpose                                            |
| ----------------------- | -------------------------------------------------- |
| `yarn dev`              | Automatically start the complete development stack |
| `yarn dev:local`        | Start Next.js and Python locally                   |
| `yarn dev:docker`       | Start the development Compose stack                |
| `yarn dev:web`          | Start only the Next.js development server          |
| `yarn dev:python`       | Start only the Python development supervisor       |
| `yarn dev:stop`         | Stop development Compose services                  |
| `yarn prod:build`       | Build production web and matcher images            |
| `yarn prod:up`          | Run production containers in the foreground        |
| `yarn prod:up:detached` | Run production containers in the background        |
| `yarn prod:check`       | Run production smoke tests                         |
| `yarn prod:logs`        | Follow production container logs                   |
| `yarn prod:down`        | Stop and remove the production stack               |
| `yarn start`            | Start an already-built Next.js app without Docker  |

### Quality and maintenance

| Command                       | Purpose                                                           |
| ----------------------------- | ----------------------------------------------------------------- |
| `yarn format`                 | Format tracked source with Prettier                               |
| `yarn format:check`           | Check formatting without changing files                           |
| `yarn lint`                   | Run ESLint                                                        |
| `yarn lint:fix`               | Apply safe ESLint fixes                                           |
| `yarn typecheck`              | Run TypeScript without emitting files                             |
| `yarn test --runInBand`       | Run Jest unit tests serially                                      |
| `yarn test:python`            | Run Python matcher tests                                          |
| `yarn test:format`            | Test the custom Prettier styles plugin                            |
| `yarn test:docker`            | Test matcher image startup, matching and crash recovery           |
| `yarn eval:matcher`           | Evaluate matcher quality and update the versioned report          |
| `yarn eval:matcher:check`     | Enforce matcher thresholds without changing the report            |
| `yarn eval:matcher:live`      | Optionally evaluate Gemini extraction using provider quota        |
| `yarn build`                  | Check formatting and create the Next.js production build          |
| `yarn verify`                 | Run formatting, lint, tests, matcher evaluation and the web build |
| `yarn reinstall`              | Reinstall exact dependencies from `yarn.lock`                     |
| `yarn index:career-knowledge` | Replace career knowledge vectors in Supabase                      |

## Routes and APIs

### Pages

| Route             | Purpose                                               |
| ----------------- | ----------------------------------------------------- |
| `/`               | Main portfolio and optional career-assistant launcher |
| `/project/[slug]` | Contentful-backed case study                          |
| `/match`          | Dedicated vacancy matcher                             |
| `/sitemap.xml`    | Dynamic XML sitemap                                   |

### Server APIs

| Route                             | Purpose and relevant limits                                                                                                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `POST /api/career-agent`          | Validates up to 1,000 characters and at most six history turns, filters unsafe/sensitive input, retrieves evidence and generates an answer |
| `POST /api/career-agent-feedback` | Stores one thumbs-up/down rating per owned message when history is enabled; 2 KB body limit                                                |
| `POST /api/contact`               | Validates and stores contact submissions; 8 KB body limit; optional Resend notification                                                    |
| `POST /api/vacancy-match`         | Validates 40 to 8,000 vacancy characters; 16 KB body limit; calls the private matcher                                                      |
| `GET /api/health`                 | Lightweight web-process health response                                                                                                    |

FastAPI exposes `/health`, `/ready` and authenticated `POST /match`. `/ready` confirms that the matcher token exists; it intentionally does not require Gemini because deterministic keyword mode remains useful during provider outages.

## Content management

### Contentful

Homepage sections are loaded server-side using IDs in [`apps/web/lib/contentful/section-ids.ts`](apps/web/lib/contentful/section-ids.ts). Queries live under `apps/web/lib/contentful/queries`, and Zod contracts in `content-model.ts` validate every external payload.

Portfolio projects live in the Portfolio section's JSON fields. Keep project IDs stable because they form `/project/[slug]` URLs and connect matcher recommendations to case studies. `archived: true` hides a project from public cards and matcher evidence. Publish Contentful entries after editing; portfolio pages revalidate hourly.

The career-assistant visibility flags live on the Contact section. Hiding the UI does not remove its API implementation.

### Career knowledge and pgvector

The indexer reads approved Markdown files from `knowledge/`, splits them into bounded chunks, creates 3,072-dimensional Gemini embeddings and replaces the corresponding Supabase tables.

```bash
yarn index:career-knowledge
```

This is a privileged destructive-replacement operation per configured knowledge table. It currently loads credentials specifically from `apps/web/.env`. Run it only from a trusted machine after reviewing knowledge changes. Do not run it automatically for untrusted pull requests.

The career assistant queries the RPC functions defined by the Supabase vector-store migration and keeps the five highest unique results above `CAREER_AGENT_MATCH_THRESHOLD` (default `0.35`). Retrieved documents are untrusted context and never override system rules.

## Supabase setup

Apply only the migrations required by enabled features through the Supabase SQL Editor:

| Migration                                                                | Creates                                                                               |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| [`supabase/career-agent-history.sql`](supabase/career-agent-history.sql) | messages, feedback, distributed rate limits, ownership checks and retention functions |
| [`supabase/contact-submissions.sql`](supabase/contact-submissions.sql)   | contact records, RLS and 30-day pg_cron cleanup                                       |

The service-role key bypasses RLS and is intentionally server-only. Public, anonymous and authenticated roles receive no direct access to private tables.

The active retrieval code also expects seven pgvector document tables and matching RPC functions, including `technical_skills_documents` and `match_technical_skills_documents`. Preserve the existing Supabase vector schema and export a reviewed, idempotent migration before provisioning a new environment.

## Privacy and security model

- API routes validate methods, content types, payload shape and size.
- Origin checks protect career, feedback and contact writes.
- Career-assistant input rejects dangerous scripts, active HTML, credentials, prompt-injection patterns and common sensitive fields before model calls and history writes.
- Email addresses and phone numbers are masked before browser/session persistence and server history logging.
- Client addresses are HMAC-hashed; raw addresses are not intentionally stored.
- Distributed rate limits use a Supabase security-definer function in production.
- Assistant responses are grounded in retrieved documents and explicitly decline unsupported claims.
- Vacancy results are cross-checked against current Contentful project IDs and evidence.
- CSP, frame denial, MIME sniffing protection, referrer policy and a restrictive permissions policy are applied globally.
- Production Docker containers are non-root, read-only, capability-free and isolated by the Compose network.
- Secrets are excluded from Git and the Docker build context. The production web build consumes env values through a BuildKit secret rather than copying the env file into an image layer.
- Logs contain request IDs, status/categories and durations, not raw vacancy text, prompts or authorization tokens.

Chat continuity in the browser uses `sessionStorage`: refreshes in the same tab preserve the conversation, while closing the tab ends that browser session. Optional server history is disabled unless `CAREER_AGENT_HISTORY_ENABLED=true`. See [`docs/career-agent-history.md`](docs/career-agent-history.md) for retention and setup.

## Reliability behavior

- The matcher allows four active analyses and eight waiting requests per Python process.
- Waiting is limited to three seconds; excess work returns `503 MATCHER_BUSY` with `Retry-After: 5`.
- Next.js retries one connection refusal or temporary DNS failure, but does not duplicate timed-out analyses.
- Matcher Gemini calls have bounded retries and fall back to deterministic keyword extraction.
- Groq assistant generation falls back to Gemini; retrieval still requires Gemini embeddings and Supabase.
- Contentful failures fail closed because the application must not fabricate portfolio evidence.
- Request IDs correlate Next.js and matcher logs.

See [`docs/matcher-reliability.md`](docs/matcher-reliability.md) for exact failure and recovery behavior.

## Optional local tooling

The application does not require Phoenix to start. Its local container is isolated in `docker-compose.tools.yml`:

```bash
docker compose -f docker-compose.tools.yml up -d phoenix
```

| Tool    | Local URL               | Purpose                                                |
| ------- | ----------------------- | ------------------------------------------------------ |
| Phoenix | `http://localhost:6006` | Future local AI observability; not currently connected |

Phoenix requires `.env.phoenix.local`. Tool data lives in a Docker volume and should be treated as development data. The active application currently sends no traces to Phoenix.

## Testing and CI

GitHub Actions runs on pull requests and pushes to `main`:

1. Install exact Yarn dependencies.
2. Check custom formatting rules and Prettier output.
3. Run ESLint and TypeScript.
4. Run Jest tests.
5. Install Python 3.13 dependencies and run Python tests.
6. Enforce the reviewed vacancy-matcher quality thresholds without an AI call.
7. Build and exercise the matcher container, including PID 1 crash recovery.
8. Build the Next.js production bundle with Contentful credentials.

The main local quality suite is:

```bash
yarn verify
```

CI additionally runs `yarn eval:matcher:check` and `yarn test:docker`. Run the
deterministic evaluation whenever ranking, extraction or evidence changes. The
optional live evaluation consumes Gemini quota and is never part of CI.

Some Python crash-recovery tests open an isolated loopback port. Run them outside an unusually restrictive sandbox if the operating system denies local socket creation.

## Deployment

### Web application

Production deploys to Vercel only after the CI workflow for `main` succeeds. The deploy workflow checks out the exact verified revision, builds a prebuilt Vercel artifact and deploys it to the protected `production` environment.

Required GitHub secrets:

| Secret              | Source                                     |
| ------------------- | ------------------------------------------ |
| `VERCEL_TOKEN`      | Vercel account settings, Tokens            |
| `VERCEL_ORG_ID`     | `.vercel/project.json` after `vercel link` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` after `vercel link` |

Application runtime secrets belong in Vercel project settings, not in workflow YAML. Disable duplicate automatic production deployments if Vercel's native Git integration is also connected.

### Matcher service

Deploy [`apps/matcher-api/Dockerfile`](apps/matcher-api/Dockerfile) to a private or protected container host. Configure the same strong `MATCHER_API_TOKEN` on both Next.js and Python. Hosted `MATCHER_API_URL` must be HTTPS; never point Vercel to localhost or enable `MATCHER_ALLOW_PRIVATE_HTTP` in hosted production.

### Recommended branch protection

- Require pull requests for `main`.
- Require the `Lint, typecheck, test and build` status check.
- Require the branch to be current before merging.
- Block force pushes and branch deletion.
- Optionally require manual approval for the GitHub `production` environment.

## Troubleshooting

### `yarn dev` says a port contains the wrong service

Open the reported health URL or stop the old process. The runner intentionally refuses to terminate an unknown listener automatically in local mode.

```bash
lsof -nP -iTCP:3100 -sTCP:LISTEN
lsof -nP -iTCP:8000 -sTCP:LISTEN
```

### Docker daemon is unavailable

Use `yarn dev:local` for development or start Docker Desktop before a production simulation. `yarn prod:*` requires an active Docker daemon.

### Production build cannot reach Contentful

Confirm the three `CONTENTFUL_*` variables and network access. Contentful is required during static generation.

### Matcher returns an availability error

Check, in order:

1. Next.js `MATCHER_API_URL`.
2. Matching `MATCHER_API_TOKEN` values.
3. Matcher `/ready` response.
4. Supabase rate-limit configuration in production.
5. Provider logs and keyword-fallback events.

### Career assistant is not visible

Check the Contentful Contact section visibility flag for the current environment. Then verify provider, Supabase and knowledge-index configuration.

### `prod:check` fails

Run `yarn prod:logs`. Both containers must be healthy, and `prod:check` must run while the production stack is active.

## Maintenance checklist

When changing architecture or operations:

1. Update this README and the relevant focused document.
2. Update `.env.example` when adding or removing configuration.
3. Add or adjust validation at the external boundary.
4. Add tests for successful and failure behavior.
5. Run `yarn format`, `yarn lint`, `yarn typecheck` and the relevant tests.
6. Run `yarn build` for web changes.
7. Run `yarn prod:build`, `yarn prod:up` and `yarn prod:check` for container or runtime changes.
8. Keep secrets and generated data out of commits.

## Further documentation

- [`docs/career-agent-setup.md`](docs/career-agent-setup.md): current provider, retrieval and hardening setup.
- [`docs/career-agent-history.md`](docs/career-agent-history.md): optional history, privacy and retention.
- [`docs/matcher-reliability.md`](docs/matcher-reliability.md): matcher capacity, retries, fallbacks and recovery.
- [`docs/matcher-evaluation.md`](docs/matcher-evaluation.md): reviewed cases, metrics, thresholds and evaluation commands.
- [`docs/observability-architecture.md`](docs/observability-architecture.md): proposed OpenTelemetry/Grafana architecture.
- [`docs/tools-content.md`](docs/tools-content.md): source and maintenance notes for tool content.

## License

This repository contains personal portfolio content and is not licensed for redistribution. The source is available for review as part of the portfolio.
