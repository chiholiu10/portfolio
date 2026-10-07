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
- `lib/contentful`: Apollo client, queries, section IDs and server content loaders.
- `styles`: shared theme, tokens and global styling; component styles stay beside their components.

Dependencies flow from templates to organisms, molecules and atoms. ESLint prevents imports into higher component layers and CMS queries inside UI components. The shared theme and reset are applied once in `pages/_app.tsx`.

CMS payloads are validated at the server boundary using the Zod contracts in `lib/content-model.ts`. Invalid content fails the build or regeneration rather than replacing a valid page with broken data. Project IDs and image matches must be unique; unknown or ambiguous images are rejected instead of producing URLs based on array position. Archived projects are excluded from cards and recommendations. Tool grouping handles absent categories safely.

## Technology

| Area | Stack |
| --- | --- |
| Front end | Next.js 16, React 19, TypeScript, styled-components, Motion |
| Content | Contentful GraphQL API |
| AI | Groq, Gemini, retrieval-augmented generation |
| Data | Supabase PostgreSQL and pgvector |
| Quality | ESLint, TypeScript, Jest, Husky |
| Delivery | GitHub Actions, Vercel, Docker |
| Observability | Phoenix / OpenTelemetry |

## Local development

Requirements: Node.js 22, Yarn Classic 1.22 and optionally Docker Desktop.

```bash
git clone https://github.com/chiholiu10/portfolio.git
cd portfolio
cp .env.example .env.local
yarn install --frozen-lockfile
yarn dev
```

The application runs at `http://localhost:3001`.

Fill only the variables needed by the feature you are testing. AI provider keys, the Supabase service-role key and hash secrets are server-side values and must never use the `NEXT_PUBLIC_` prefix. Never commit `.env`, `.env.local`, Phoenix credentials or exported production data.

## Commands

| Command | Purpose |
| --- | --- |
| `yarn dev` | Start the local Next.js server on port 3001 |
| `yarn lint` | Run ESLint |
| `yarn typecheck` | Validate TypeScript without emitting files |
| `yarn test --runInBand` | Run the Jest unit tests |
| `yarn build` | Create the production build |
| `yarn verify` | Run the complete local CI suite |
| `yarn index:career-knowledge` | Re-index knowledge documents in Supabase |
| `yarn docker` | Start the local Docker services |

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

| Secret | Source |
| --- | --- |
| `VERCEL_TOKEN` | Vercel account settings → Tokens |
| `VERCEL_ORG_ID` | `.vercel/project.json` after `vercel link` |
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
docker run --rm -p 3000:3000 --env-file .env.local chiho-portfolio
```

`docker compose up --build` additionally starts the configured local Flowise, n8n and Phoenix services. Their data is stored in named Docker volumes and should be treated as development data.

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
