# Matcher reliability

The browser calls the Next.js gateway. Next.js validates and rate-limits the vacancy, reads portfolio evidence from Contentful, then calls the private FastAPI service. Uvicorn runs the ASGI app; blocking provider calls execute in a thread pool so health endpoints remain responsive. The matcher extracts requirements through Gemini and ranks documented evidence. If Gemini is unavailable, it explicitly returns `mode: keywords`.

## Running locally

With Docker Desktop running, `yarn dev` starts both services and waits for matcher readiness before starting the web container. `restart: unless-stopped` restarts a crashed matcher container. An intentional operator stop is respected.

Without Docker, run `yarn setup:python` once, then `yarn dev:python` and `yarn dev:web` in separate terminals. The Python development supervisor restarts a crashed server and reloads changed Python files. It cannot restart itself after its terminal or supervisor is stopped.

## Production

Use `docker compose --env-file apps/web/.env -f docker-compose.production.yml up --build -d` to run the production matcher alongside a website on the same host. This exposes the API on loopback only. Provide a strong shared `MATCHER_API_TOKEN`; the production configuration has no development token default. The website is deployed separately. Alternatively deploy Next.js and the private ASGI service independently on managed hosting and set `MATCHER_API_URL` to the actual backend URL, never localhost on Vercel.

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
