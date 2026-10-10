import { useScrollReveal } from "@/components/atoms/Motion/useScrollReveal";
import { FadeUp } from "@/components/atoms/Motion";
import { useRef, useState, type ReactNode, type FormEvent } from "react";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import {
  matchResponseSchema,
  type VacancyMatch,
} from "@portfolio/matcher-contracts";
import { MatcherSurface } from "@/components/organisms/VacancyMatcher/VacancyMatcher.styles";

import type { HomeSections } from "@/lib/content-model";

type VacancyMatcherProps = { data: HomeSections["vacancyMatcher"] };

export function VacancyMatcher({ data }: VacancyMatcherProps) {
  const [vacancy, setVacancy] = useState("");
  const [result, setResult] = useState<VacancyMatch | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const requestInFlight = useRef(false);
  const reduceMotion = useReducedMotion();
  const { ref: formRef, style: formStyle } = useScrollReveal<HTMLFormElement>();
  const [formFocused, setFormFocused] = useState(false);

  if (!data.section) return null;
  const { eyebrow, title, subtitle, arrays: copy } = data.section;

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
      if (!response.ok) throw new Error(copy.errorMessage);
      setResult(matchResponseSchema.parse(payload));
    } catch (failure) {
      setError(
        failure instanceof Error && failure.name === "TimeoutError"
          ? copy.timeoutMessage
          : copy.errorMessage,
      );
    } finally {
      requestInFlight.current = false;
      setPending(false);
    }
  }

  return (
    <MatcherSurface id="vacancy-match" aria-labelledby="matcher-title">
      <FadeUp id="matcher-heading-reveal">
        <p className="matcher-eyebrow">{eyebrow}</p>
        <h2 className="matcher-title" id="matcher-title">
          {title}
        </h2>
        <p className="matcher-intro">{subtitle}</p>
      </FadeUp>
      <m.form
        className="matcher-form"
        ref={formRef}
        style={formFocused ? { opacity: 1, y: 0 } : formStyle}
        onFocusCapture={() => setFormFocused(true)}
        onSubmit={submit}
        aria-busy={pending}
      >
        <div className="matcher-field-heading">
          <label className="matcher-label" htmlFor="matcher-vacancy">
            {copy.label}
          </label>
          <button
            className="matcher-example"
            type="button"
            disabled={pending}
            onClick={() => {
              setVacancy(copy.example);
              setResult(null);
              setError("");
            }}
          >
            {copy.exampleButton}
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
          placeholder={copy.placeholder}
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
            {pending ? copy.pendingButton : copy.submitButton}
          </button>
        </div>
        <p className="matcher-note" id="matcher-privacy">
          {copy.lengthHint}
        </p>
        {error && (
          <p className="matcher-error" role="alert">
            {error}
          </p>
        )}
      </m.form>
      <div aria-live="polite" aria-atomic="true">
        {pending && (
          <p className="matcher-note" role="status">
            {copy.pendingMessage}
          </p>
        )}
        {result && (
          <div className="matcher-results">
            <h3 className="matcher-result-title">
              {result.matches.length ? copy.resultsTitle : copy.emptyTitle}
            </h3>
            <p className="matcher-note matcher-results-note">
              {result.mode === "ai" ? copy.aiNote : copy.keywordNote}{" "}
              {copy.comparisonNote}
            </p>
            <ol className="matcher-list">
              {result.matches.map((match) => (
                <ScrollCase key={match.id}>
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
                          {copy.readContribution}
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
                      aria-label={`${copy.caseButton}: ${match.title}`}
                      href={`/project/${match.id}`}
                    >
                      {copy.caseButton}
                    </Link>
                  </div>
                </ScrollCase>
              ))}
            </ol>
            {result.missing.length > 0 && (
              <p className="matcher-note matcher-missing">
                {copy.missingLabel} {result.missing.join(", ")}.
              </p>
            )}
            {!result.requirements.length && (
              <p className="matcher-note">{copy.noRequirements}</p>
            )}
          </div>
        )}
      </div>
    </MatcherSurface>
  );
}

function ScrollCase({ children }: { children: ReactNode }) {
  const { ref, style } = useScrollReveal<HTMLLIElement>();
  return (
    <m.li className="matcher-case" ref={ref} style={style}>
      {children}
    </m.li>
  );
}
