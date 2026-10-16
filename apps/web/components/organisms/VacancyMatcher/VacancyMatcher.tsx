import { useScrollReveal } from "@/components/atoms/Motion/useScrollReveal";
import { FadeUp } from "@/components/atoms/Motion";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import {
  matchResponseSchema,
  type VacancyMatch,
} from "@portfolio/matcher-contracts";
import { MatcherSurface } from "@/components/organisms/VacancyMatcher/VacancyMatcher.styles";

import type { HomeSections } from "@/lib/content-model";

type VacancyMatcherProps = { data: HomeSections["vacancyMatcher"] };

const evidenceStatusLabel = (
  status: VacancyMatch["requirementAnalysis"][number]["status"],
  confidence: number,
) => {
  if (status === "verified") return `${confidence}% evidence confidence`;
  if (status === "transferable") return "Transferable evidence";
  if (status === "profile-match") return "Confirmed profile match";
  if (status === "not-assessed") return "Profile check required";
  return "No verified evidence";
};

const requirementTitle = (requirement: string) => {
  const seniority = requirement.match(/^Seniority:\s*(.+)$/i);
  return seniority ? `${seniority[1]}-level experience` : requirement;
};

export function VacancyMatcher({ data }: VacancyMatcherProps) {
  const [vacancy, setVacancy] = useState("");
  const [result, setResult] = useState<VacancyMatch | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const requestInFlight = useRef(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { ref: formRef, style: formStyle } = useScrollReveal<HTMLFormElement>();
  const [formFocused, setFormFocused] = useState(false);

  useEffect(() => {
    if (!result) return;
    const frame = requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({
        behavior: reduceMotion ? "instant" : "smooth",
        block: "start",
      });
      resultsRef.current?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [result, reduceMotion]);

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
      if (!response.ok) {
        setError(
          response.status === 429 || payload?.code === "MATCHER_BUSY"
            ? copy.busyMessage
            : copy.errorMessage,
        );
        return;
      }
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
          <div
            className="matcher-results"
            ref={resultsRef}
            tabIndex={-1}
            aria-labelledby="matcher-results-title"
          >
            <h3 className="matcher-result-title" id="matcher-results-title">
              {result.matches.length ? copy.resultsTitle : copy.emptyTitle}
            </h3>
            <p className="matcher-note matcher-results-note">
              {result.mode === "ai" ? copy.aiNote : copy.keywordNote}{" "}
              {copy.comparisonNote}
            </p>
            {result.matches.length > 0 && (
              <p className="matcher-verification-note">
                {copy.verificationNote}{" "}
                <Link
                  className="matcher-verification-link"
                  href="/project/ai-vacancy-matcher#evaluation-and-scope"
                >
                  {copy.verificationLink}
                </Link>
              </p>
            )}
            {result.requirementAnalysis.length > 0 && (
              <div className="matcher-explanation">
                <div className="matcher-explanation-summary">
                  <p className="matcher-coverage">
                    <strong className="matcher-coverage-value">
                      {
                        result.requirementAnalysis.filter(
                          (item) =>
                            item.status === "verified" ||
                            item.status === "transferable",
                        ).length
                      }
                      /
                      {
                        result.requirementAnalysis.filter(
                          (item) =>
                            item.status === "verified" ||
                            item.status === "transferable" ||
                            item.status === "missing",
                        ).length
                      }
                    </strong>{" "}
                    evidence-assessable requirements supported by portfolio
                    evidence
                  </p>
                  <p className="matcher-confidence-note">
                    Verified evidence demonstrates the requested skill directly.
                    Transferable evidence is related experience and is never
                    presented as direct tool experience.
                  </p>
                </div>
                <ol className="matcher-requirement-list">
                  {result.requirementAnalysis.map((item) => (
                    <ScrollCase key={item.requirement}>
                      {(() => {
                        const detail = result.requirementDetails.find(
                          (requirement) =>
                            requirement.name === item.requirement,
                        );
                        return detail ? (
                          <p className="matcher-requirement-meta">
                            <span className="matcher-requirement-tag">
                              {detail.priority}
                            </span>
                            <span
                              className="matcher-requirement-separator"
                              aria-hidden="true"
                            >
                              ·
                            </span>
                            <span className="matcher-requirement-tag">
                              {detail.category}
                            </span>
                          </p>
                        ) : null;
                      })()}
                      <div className="matcher-requirement-heading">
                        <h4 className="matcher-case-title">
                          {requirementTitle(item.requirement)}
                        </h4>
                        <span
                          className={`matcher-confidence matcher-confidence--${item.status}`}
                        >
                          {evidenceStatusLabel(item.status, item.confidence)}
                        </span>
                      </div>
                      {item.evidence.length > 0 && (
                        <ul className="matcher-evidence-list">
                          {item.evidence.map((evidence) => (
                            <li
                              className="matcher-evidence-item"
                              key={evidence.projectId}
                            >
                              <div className="matcher-evidence-heading">
                                <strong className="matcher-evidence-title">
                                  {evidence.projectTitle}
                                </strong>{" "}
                                <Link
                                  className="matcher-evidence-link"
                                  href={`/project/${evidence.projectId}`}
                                  aria-label={`${copy.caseButton}: ${evidence.projectTitle}`}
                                >
                                  {copy.caseButton}
                                </Link>
                              </div>
                              <p className="matcher-relevance">
                                <span className="matcher-relevance-label">
                                  Why this matches
                                </span>
                                {evidence.relevance}
                              </p>
                              <p className="matcher-evidence">
                                {evidence.excerpt.length > 240
                                  ? `${evidence.excerpt.slice(0, 240).replace(/\s+\S*$/, "")}…`
                                  : evidence.excerpt}
                              </p>
                              {evidence.excerpt.length > 240 && (
                                <details className="matcher-details">
                                  <summary className="matcher-details-toggle">
                                    {copy.readContribution}
                                  </summary>
                                  <p className="matcher-details-copy">
                                    {evidence.excerpt}
                                  </p>
                                </details>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                      {item.evidence.length === 0 &&
                        item.status === "profile-match" && (
                          <p className="matcher-profile-copy">
                            {item.profileEvidence}
                          </p>
                        )}
                      {item.evidence.length === 0 &&
                        item.status === "not-assessed" && (
                          <p className="matcher-missing-copy">
                            This vacancy condition is shown separately. It
                            cannot be proven responsibly from a project case
                            study.
                          </p>
                        )}
                      {item.evidence.length === 0 &&
                        item.status === "missing" && (
                          <p className="matcher-missing-copy">
                            The portfolio contains no verified evidence for this
                            requirement. This is intentionally reported instead
                            of inferred.
                          </p>
                        )}
                    </ScrollCase>
                  ))}
                </ol>
              </div>
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
  const reduceMotion = useReducedMotion();
  return (
    <m.li
      className="matcher-requirement"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.35 }}
    >
      {children}
    </m.li>
  );
}
