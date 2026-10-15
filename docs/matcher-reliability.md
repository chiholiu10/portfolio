# Matcher reliability

The browser calls the Next.js gateway. Next.js validates and rate-limits the vacancy, reads portfolio evidence from Contentful, then calls the private FastAPI service. Uvicorn runs the ASGI app; blocking provider calls execute in a thread pool so health endpoints remain responsive. The matcher extracts requirements through Gemini and ranks documented evidence. If Gemini is unavailable, it explicitly returns `mode: keywords`.

## Running locally

`yarn dev` uses Docker when available and otherwise starts both services locally. `yarn dev:local` and `yarn dev:docker` select a mode explicitly. The runner validates service health before reusing an occupied port.

Without Docker, run `yarn setup:python` once, then `yarn dev:local`. The Python development supervisor restarts a crashed server and reloads changed Python files. It cannot restart itself after its terminal or supervisor is stopped.

## Production

Use `yarn prod:build` followed by `yarn prod:up` for the complete local production simulation. Next.js runs its standalone production server while the matcher is reachable only through the private Compose network. `MATCHER_ALLOW_PRIVATE_HTTP=true` is scoped to this isolated stack; hosted production still requires a remote HTTPS matcher URL and must not set that override. Run `yarn prod:check` in another terminal for smoke tests.

`/health` checks process liveness. `/ready` also checks the shared token is configured. Gemini availability is intentionally excluded: keyword matching is still available during a provider outage. Docker marks unhealthy containers but does not restart them merely for being unhealthy; use the hosting platform's health-based replacement for that case. Restart policies recover process exits.

## Failure handling

- Four active analyses and eight waiting requests per process; waiting is limited to three seconds. Excess requests receive `503 MATCHER_BUSY` and `Retry-After: 5`. Limits multiply across replicas; account-level provider quotas require distributed controls.
- Next.js retries a connection refusal or temporary DNS failure once after 200 ms, within a shared 22-second deadline. It does not retry timed-out analyses or busy responses, avoiding duplicate work and retry storms.
- Gemini attempts are bounded to two, each with an eight-second socket timeout and 200 ms backoff for temporary failures. Authentication and other permanent HTTP errors are not retried. Invalid responses and exhausted attempts use keyword matching. Socket timeouts are not a hard total deadline for a continuously streaming remote response; the gateway deadline still limits visitor waiting time.
- Structured gateway logs contain request ID, phase and failure category. Backend logs contain ID, response status, duration and exception class. Provider fallback logs contain only a category. Vacancy text, authorization tokens and provider exception messages are never logged. `X-Request-ID` links gateway and backend requests.
- Contentful outages still prevent analysis; results are not fabricated without portfolio evidence. A busy or unavailable service remains a truthful error.

## Verification

`yarn test --runInBand` checks gateway failures, recovery and retry boundaries. `yarn test:python` checks validation, authentication, matching, capacity, provider fallback and actual native process crash recovery on an isolated port. `yarn test:docker` builds a disposable matcher image, checks readiness, sends a real match request, terminates PID 1 inside the container using its registered SIGTERM handler, verifies restart count and checks matching again. It uses keyword mode and never calls Gemini. Resources are removed afterwards. CI runs all three suites.

These checks establish tested failure behavior and crash recovery; they cannot guarantee continuous availability of hosting, networking or external providers.

## Proposed observability

The [observability architecture](observability-architecture.md) includes the Grafana/OpenTelemetry diagram, explains metrics, traces and logs, and describes privacy and serverless export requirements. This integration is proposed, not implemented.
