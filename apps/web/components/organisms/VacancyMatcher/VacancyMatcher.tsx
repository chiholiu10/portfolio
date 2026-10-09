import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import {
  matchResponseSchema,
  type VacancyMatch,
} from "@portfolio/matcher-contracts";
import { MatcherSurface } from "@/components/organisms/VacancyMatcher/VacancyMatcher.styles";

const example =
  "We are looking for a front-end developer with React, TypeScript and a strong sense of UX. You build reusable components, collaborate with designers and write tests.";

export function VacancyMatcher() {
  const [vacancy, setVacancy] = useState("");
  const [result, setResult] = useState<VacancyMatch | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const requestInFlight = useRef(false);
  const reduceMotion = useReducedMotion();

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (requestInFlight.current) return;
    requestInFlight.current = true;
    setPending(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch("/api/vacancy-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vacancy }),
        signal: AbortSignal.timeout(35_000),
      });
      const payload = await response.json();
      if (!response.ok)
        throw new Error(
          typeof payload.error === "string"
            ? payload.error
            : "The vacancy could not be analysed right now.",
        );
      setResult(matchResponseSchema.parse(payload));
    } catch (failure) {
      setError(
        failure instanceof Error && failure.name !== "TimeoutError"
          ? failure.message
          : "The analysis is taking too long. Please try again.",
      );
    } finally {
      requestInFlight.current = false;
      setPending(false);
    }
  }

  return (
    <MatcherSurface id="vacancy-match" aria-labelledby="matcher-title">
      <p className="matcher-eyebrow">FIND RELEVANT WORK</p>
      <h2 className="matcher-title" id="matcher-title">
        Does my experience match your vacancy?
      </h2>
      <p className="matcher-intro">
        Paste the vacancy to discover which projects are relevant, supported by
        concrete examples from my work.
      </p>
      <form className="matcher-form" onSubmit={submit} aria-busy={pending}>
        <div className="matcher-field-heading">
          <label className="matcher-label" htmlFor="matcher-vacancy">
            Job description
          </label>
          <button
            className="matcher-example"
            type="button"
            disabled={pending}
            onClick={() => {
              setVacancy(example);
              setResult(null);
              setError("");
            }}
          >
            Try an example
          </button>
        </div>
        <textarea
          className="matcher-input"
          id="matcher-vacancy"
          required
          minLength={40}
          maxLength={8000}
          value={vacancy}
          disabled={pending}
          onChange={(event) => {
            setVacancy(event.target.value);
            setResult(null);
            setError("");
          }}
          placeholder="Paste the role, requirements and responsibilities here…"
          aria-describedby="matcher-privacy"
        />

        <div className="matcher-actions">
          <button className="matcher-submit" type="submit" disabled={pending}>
            <m.span
              aria-hidden="true"
              animate={
                pending && !reduceMotion ? { rotate: 360 } : { rotate: 0 }
              }
              transition={{
                duration: 2,
                repeat: pending && !reduceMotion ? Infinity : 0,
                ease: "linear",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </m.span>
            {pending ? "Analysing vacancy…" : "Find relevant projects"}
          </button>
        </div>
        <p className="matcher-note" id="matcher-privacy">
          40–8,000 characters. Not stored. AI analysis uses Google Gemini. Avoid
          personal or confidential information.
        </p>
        {error && (
          <p className="matcher-error" role="alert">
            {error}
          </p>
        )}
      </form>
      <div aria-live="polite" aria-atomic="true">
        {pending && (
          <p className="matcher-note" role="status">
            Comparing the requirements with documented project experience.
          </p>
        )}
        {result && (
          <div className="matcher-results">
            <h3 className="matcher-result-title">
              {result.matches.length
                ? "These case studies match your vacancy"
                : "No clear match found"}
            </h3>
            <p className="matcher-note matcher-results-note">
              {result.mode === "ai"
                ? "AI identified the requirements; the examples come from documented project case studies."
                : "Keyword comparison is being used because AI analysis is currently unavailable."}{" "}
              This is an evidence-based comparison, not a suitability score.
            </p>
            <ol className="matcher-list">
              {result.matches.map((match, index) => (
                <m.li
                  className="matcher-case"
                  key={match.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.35 }}
                >
                  <div className="matcher-case-content">
                    <h4 className="matcher-case-title">{match.title}</h4>
                    <p className="matcher-evidence">
                      {match.evidence.length > 280
                        ? `${match.evidence.slice(0, 280).replace(/\s+\S*$/, "")}…`
                        : match.evidence}
                    </p>
                    {match.evidence.length > 280 && (
                      <details className="matcher-details">
                        <summary className="matcher-details-toggle">
                          Read contribution
                        </summary>
                        <p className="matcher-details-copy">{match.evidence}</p>
                      </details>
                    )}
                    <div className="matcher-tags">
                      {match.skills.map((skill) => (
                        <span className="matcher-tag" key={skill}>
                          {skill}
                        </span>
                      ))}
                    </div>
                    <Link
                      className="matcher-link"
                      aria-label={`View case study: ${match.title}`}
                      href={`/project/${match.id}`}
                    >
                      View case study
                    </Link>
                  </div>
                </m.li>
              ))}
            </ol>
            {result.missing.length > 0 && (
              <p className="matcher-note matcher-missing">
                Not demonstrated in the current case studies:{" "}
                {result.missing.join(", ")}.
              </p>
            )}
            {!result.requirements.length && (
              <p className="matcher-note">
                No recognisable requirements were found. Add the requested
                technologies or responsibilities.
              </p>
            )}
          </div>
        )}
      </div>
    </MatcherSurface>
  );
}
