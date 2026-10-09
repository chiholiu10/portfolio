# Portfolio monorepo

- `apps/web`: Next.js portfolio, Contentful loaders and the public API gateway.
- `apps/matcher-api`: dependency-free Python vacancy matcher, private HTTP service.
- `packages/matcher-contracts`: typed request/response contracts shared with the frontend.

## Development

Docker Desktop must be running. Copy `apps/web/.env.example` to `apps/web/.env` if no local configuration exists, then fill in your Contentful credentials. Add `GEMINI_API_KEY` for AI requirement extraction; without it the matcher explicitly uses keyword matching. Secrets remain server-side.

```sh
yarn install --frozen-lockfile
yarn run dev
```

Open http://localhost:3100/#vacancy-match or http://localhost:3100/match. This command first frees host port 3100: containers publishing that port are stopped, and native listeners receive SIGTERM followed by SIGKILL if necessary. It then builds and runs only the web and matcher services. Next.js reloads changes; the Python development process restarts on source changes. The Python port is not published. Stop with Ctrl+C; `yarn dev:stop` stops both services.

Existing `.env.local` values in `apps/web` override Next.js environment values. Set `MATCHER_API_URL=http://matcher-api:8000` when using Docker. The development-only shared token in Compose is limited to the private local network; production requires a strong token.

For running without Docker, use `yarn dev:web` and `MATCHER_API_TOKEN=your-local-token yarn dev:python` in separate terminals. Configure the same token and `MATCHER_API_URL=http://127.0.0.1:8000` in `apps/web/.env.local`.

## Vacancy matching

The browser posts a vacancy to the same-origin Next.js endpoint. The gateway validates and masks sensitive text, rate-limits requests and loads unarchived case studies from Contentful. Python extracts named requirements with Gemini when configured, then ranks evidence from those cases. The response uses existing project URLs, reports requirements not supported by the current cases and never gives a suitability percentage. No vacancy or result is saved. AI sends the masked vacancy to Google; the form explains this before submission. Provider failure falls back to explicitly labelled keyword matching.

## Checks

```sh
yarn lint
yarn typecheck
yarn test --runInBand
yarn test:python
yarn test:format
yarn build
```

## Production deployment

Set the Vercel project Root Directory to `apps/web` (include files outside the root directory), install with `yarn install --frozen-lockfile` and build with `next build`. The GitHub deployment workflow runs Vercel from `apps/web`. Deploy the Python Dockerfile to a private service and set `MATCHER_API_URL` and the same strong `MATCHER_API_TOKEN` on both services. The web service also needs the existing Supabase distributed rate-limit configuration and `CAREER_AGENT_HASH_SECRET`. Production requests fail closed when rate limiting is unavailable. Only Python needs the Gemini key for the matcher.

The root production Dockerfile builds the web app on port 3100. Supply Contentful environment values securely during the build and runtime secrets during deployment; never bake credentials into images. Compose is the local development setup.

---

# Chiho Liu | Portfolio & AI Career Assistant

[![CI](https://github.com/chiholiu10/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/chiholiu10/portfolio/actions/workflows/ci.yml)

A production-oriented portfolio built with Next.js, TypeScript and Contentful. It combines detailed case studies with a privacy-conscious AI career assistant that retrieves verified career knowledge before answering.

> **Temporary status:** The AI career assistant is currently hidden on both production and localhost through Contentful. The implementation remains available in the codebase and can be enabled again without rebuilding the feature.

## Highlights

- Responsive portfolio and Contentful-managed project cases
- AI career assistant with Groq/Gemini fallback and grounded answers
- Supabase PostgreSQL/pgvector retrieval, feedback and optional chat history
- Input safety, origin checks, rate limiting and server-only credentials
- Secure Node.js contact API with Supabase persistence and optional email alerts
- Unit tests for contact intent and unsafe-input detection
- Reproducible GitHub Actions CI and gated Vercel production deployment
- Local observability with Phoenix, plus optional Flowise and n8n services

## Contentful configuration

Set `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ENVIRONMENT` (default `master`) and the server-only `CONTENTFUL_ACCESS_TOKEN` in `.env.local` and the production hosting environment. The delivery token is never embedded in source code or public environment variables. GitHub CI also requires a repository secret named `CONTENTFUL_ACCESS_TOKEN`; optional repository variables override the space and environment.

## Component architecture

The UI follows Atomic Design while retaining the existing markup, styling and motion:

- `components/atoms`: small visual primitives, avatar, icons, motion wrappers and page metadata.
- `components/molecules`: reusable combinations such as `SectionHeading` and `ProjectCard`.
- `components/organisms`: complete sections, contact form and career assistant.
- `components/templates`: home and project page composition, without CMS queries.
- `pages`: Next.js routing, data hooks and API endpoints.
- `lib/contentful`: GraphQL fetcher, queries, section IDs and server content loaders.
- `styles`: shared theme, tokens and global styling; component styles stay beside their components.

Dependencies flow from templates to organisms, molecules and atoms. ESLint prevents imports into higher component layers and CMS queries inside UI components. The shared theme and reset are applied once in `pages/_app.tsx`.

CMS payloads are validated at the server boundary using the Zod contracts in `lib/content-model.ts`. Invalid content fails the build or regeneration rather than replacing a valid page with broken data. Project IDs and image matches must be unique; unknown or ambiguous images are rejected instead of producing URLs based on array position. Archived projects are excluded from cards and recommendations. Tool grouping handles absent categories safely.

## Technology

| Area          | Stack                                                       |
| ------------- | ----------------------------------------------------------- |
| Front end     | Next.js 16, React 19, TypeScript, styled-components, Motion |
| Content       | Contentful GraphQL API                                      |
| AI            | Groq, Gemini, retrieval-augmented generation                |
| Data          | Supabase PostgreSQL and pgvector                            |
| Quality       | ESLint, TypeScript, Jest, Husky                             |
| Delivery      | GitHub Actions, Vercel, Docker                              |
| Observability | Phoenix / OpenTelemetry                                     |

## Local development

Requirements: Node.js 22, Yarn Classic 1.22 and optionally Docker Desktop.

```bash
git clone https://github.com/chiholiu10/portfolio.git
cd portfolio
cp apps/web/.env.example apps/web/.env
yarn install --frozen-lockfile
yarn dev
```

The application runs at `http://localhost:3100`.

Fill only the variables needed by the feature you are testing. AI provider keys, the Supabase service-role key and hash secrets are server-side values and must never use the `NEXT_PUBLIC_` prefix. Never commit `.env`, `.env.local`, Phoenix credentials or exported production data.

## Commands

| Command                       | Purpose                                       |
| ----------------------------- | --------------------------------------------- |
| `yarn dev`                    | Start Next.js and Python using Docker Compose |
| `yarn lint`                   | Run ESLint                                    |
| `yarn typecheck`              | Validate TypeScript without emitting files    |
| `yarn test --runInBand`       | Run the Jest unit tests                       |
| `yarn build`                  | Create the production build                   |
| `yarn verify`                 | Run the complete local CI suite               |
| `yarn index:career-knowledge` | Re-index knowledge documents in Supabase      |
| `yarn docker`                 | Start the local Docker services               |

## Architecture

```text
Browser
  ├─ Portfolio content ───> Next.js ──> Contentful GraphQL
  ├─ Career assistant ────> Next.js API
                              ├─ Supabase / pgvector retrieval
                              ├─ Groq or Gemini response generation
                              └─ Optional history and feedback storage
  └─ Contact form ────────> Node.js API ──> Supabase
                                             └─ Optional Resend notification
```

The browser never receives AI or Supabase privileged keys. Career-assistant requests pass through the Next.js API, where origin validation, payload validation, sensitive-input filtering and rate limiting are applied before retrieval or model calls.

The contact API uses the same server-only Supabase connection and distributed rate limiter. Install [`supabase/contact-submissions.sql`](supabase/contact-submissions.sql) before enabling it. Email notifications are optional and require `RESEND_API_KEY`, `CONTACT_NOTIFICATION_EMAIL` and `CONTACT_FROM_EMAIL`. Contact records are protected by row-level security and deleted automatically after 30 days.

More detailed setup notes live in [`docs/career-agent-setup.md`](docs/career-agent-setup.md) and [`docs/career-agent-history.md`](docs/career-agent-history.md).

## CI/CD

Every pull request and push to `main` runs one deterministic pipeline:

1. Install the exact versions from `yarn.lock`.
2. Run linting and TypeScript checks.
3. Run all unit tests.
4. Build the production application.

Production deployment starts only after CI succeeds on `main`. The deploy job builds with Vercel's production environment and deploys the verified prebuilt artifact. Configure a protected GitHub environment named `production` and add these repository or environment secrets:

| Secret              | Source                                     |
| ------------------- | ------------------------------------------ |
| `VERCEL_TOKEN`      | Vercel account settings → Tokens           |
| `VERCEL_ORG_ID`     | `.vercel/project.json` after `vercel link` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` after `vercel link` |

Application secrets belong in Vercel project settings, not GitHub workflow YAML. If Vercel's native Git integration is still enabled, disable its automatic production deployments to avoid deploying every commit twice.

Recommended branch protection for `main`:

- Require a pull request before merging.
- Require the `Lint, typecheck, test and build` status check.
- Require the branch to be up to date.
- Block force pushes and branch deletion.
- Add manual approval to the `production` GitHub environment if desired.

## Docker

Build and run only the portfolio application:

```bash
docker build -t chiho-portfolio .
docker run --rm -p 3100:3100 --env-file apps/web/.env.local chiho-portfolio
```

`docker compose -f docker-compose.tools.yml up` separately starts the configured local Flowise, n8n and Phoenix services (requires your existing `.env.phoenix.local`). Their data is stored in named Docker volumes and should be treated as development data.

## Security and privacy

- Secrets are ignored by Git and excluded from the Docker build context.
- The Supabase service-role key is server-only and bypasses row-level security; rotate it immediately if exposed.
- Chat history is disabled unless `CAREER_AGENT_HISTORY_ENABLED=true`.
- The knowledge indexer is an administrative command and should run only from a trusted machine or protected job.
- Dependency and platform updates should be reviewed through small pull requests and verified by CI.

## Content workflow

Portfolio content is managed in Contentful. Project titles, image matches, keywords, suggested questions and case studies live in the Portfolio section entry (`2qFy05XNAe3Ho1CmJiAgbO`), in the `arrays` JSON field (`projects` and `favoriteProjectIds`). The `array` field contains the existing Cloudinary images. Keep project IDs stable because they form the project URLs. Set `archived: true` to hide a project. Publish the entry after editing; project pages revalidate hourly. Career knowledge lives separately and is indexed into Supabase so individual portfolio projects can be retrieved precisely. After approved knowledge changes, run:

```bash
yarn index:career-knowledge
```

Do not run the indexer automatically for untrusted pull requests because it writes to production data and requires privileged credentials.

## License

This repository contains personal portfolio content and is not licensed for redistribution. The source is available for review as part of the portfolio.
