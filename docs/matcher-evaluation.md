# Matcher evaluation

The vacancy matcher is evaluated against synthetic, human-reviewed vacancies.
The deterministic evaluation never calls an AI provider and is required in CI.

## Commands

```bash
yarn eval:matcher
yarn eval:matcher:check
yarn eval:matcher:live
```

- `eval:matcher` runs keyword mode and updates `evaluation/results/latest.json`.
- `eval:matcher:check` runs the same evaluation without changing the report.
- `eval:matcher:live` deliberately calls Gemini and writes an ignored local report.

Run the live evaluation only after changing the extraction prompt, model or
supported skill taxonomy. It requires `GEMINI_API_KEY` and consumes provider
quota.

## Metrics

- **Requirement precision:** correctly extracted requirements divided by all
  extracted requirements.
- **Requirement recall:** correctly extracted requirements divided by all
  requirements expected by the reviewed dataset.
- **Evidence accuracy:** returned projects approved for the evaluated vacancy
  divided by all returned projects.
- **Unsupported claims:** returned skill claims not present in the source
  project's evidence. This must remain zero.

Thresholds live in `evaluation/thresholds.json`. The dataset is versioned so a
change to expected behaviour is visible during code review. Never weaken a
threshold only to make a failing implementation pass; first review the fixture,
taxonomy and matcher behaviour.

## Adding a case

1. Use a synthetic vacancy without personal or client-confidential data.
2. Select requirements only from the matcher's supported taxonomy.
3. Review expected and forbidden project IDs manually.
4. Run deterministic evaluation.
5. Inspect every `REVIEW` case before changing expectations.
6. Run the optional live evaluation if AI extraction behaviour changed.

Evaluation reports contain IDs, labels, metrics and latency, not secrets or real
recruiter input.
