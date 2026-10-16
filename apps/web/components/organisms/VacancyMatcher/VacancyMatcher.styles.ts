import styled from "styled-components";
import { breakpoint } from "@/styles/Breakpoint";

export const MatcherSurface = styled.section.attrs({ className: "ui-section" })`
  box-sizing: border-box;
  width: min(1120px, calc(100% - 40px));
  margin: 64px auto;
  color: var(--text-heading);
  ${breakpoint.xl`
    width: min(1120px, calc(100% - 64px));
    margin-block: 96px;
  `}
  .matcher-eyebrow {
    color: var(--accent);
    font-size: var(--font-label);
    font-weight: 650;
    letter-spacing: 0.06em;
    margin: 0 0 10px;
  }
  .matcher-title {
    font-size: var(--font-section);
    font-weight: 600;
    line-height: 1.18;
    letter-spacing: -0.03em;
    margin: 0 0 18px;
    max-inline-size: 22ch;
    text-wrap: balance;
  }
  .matcher-intro {
    color: var(--text-body);
    font-size: var(--font-body);
    line-height: 1.8;
    margin: 0 0 28px;
    max-inline-size: 62ch;
  }
  .matcher-form {
    padding: 22px;
    border: 1px solid #dce7eb;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 12px 40px rgba(20, 33, 61, 0.04);
    ${breakpoint.lg`
      padding: 32px;
    `}
  }
  .matcher-field-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 22px;
  }
  .matcher-label {
    font-size: 15px;
    font-weight: 650;
  }
  .matcher-input {
    box-sizing: border-box;
    width: 100%;
    min-height: 180px;
    resize: vertical;
    padding: 18px;
    border: 1px solid #a8bce5;
    border-radius: 12px;
    background: #f0f5ff;
    outline: 0;
    color: var(--text-heading);
    font: inherit;
    font-size: 16px;
    line-height: 1.7;
    transition:
      border-color 180ms ease,
      box-shadow 180ms ease;
  }
  .matcher-input::placeholder {
    color: var(--text-muted);
    opacity: 1;
  }
  .matcher-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.14);
  }
  .matcher-note {
    color: var(--text-muted);
    font-size: 13px;
    line-height: 1.6;
    margin: 14px 0 0;
  }
  .matcher-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px 24px;
    margin-top: 20px;
  }
  .matcher-submit,
  .matcher-link {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    min-height: 46px;
    padding: 12px 20px;
    border: 1px solid var(--accent);
    border-radius: 8px;
    background: var(--accent);
    color: #fff;
    font: inherit;
    font-size: 14px;
    font-weight: 650;
    text-decoration: none;
    cursor: pointer;
    transition:
      background 180ms ease,
      border-color 180ms ease;
  }
  .matcher-submit {
    width: 100%;
  }
  ${breakpoint.sm`
    .matcher-submit {
      width: auto;
    }
  `}
  .matcher-submit:hover, .matcher-link:hover {
    background: #124f5d;
    border-color: #124f5d;
  }
  .matcher-submit:disabled {
    opacity: 0.65;
    cursor: wait;
  }
  .matcher-example {
    border: 0;
    background: transparent;
    color: var(--accent);
    font: inherit;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    padding: 6px 0;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .matcher-example:disabled {
    opacity: 0.5;
    cursor: default;
  }
  .matcher-submit:focus-visible,
  .matcher-example:focus-visible,
  .matcher-evidence-link:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
  }
  .matcher-error {
    color: #a22f29;
    margin: 18px 0 0;
    font-size: 14px;
    line-height: 1.6;
  }
  .matcher-results {
    scroll-margin-top: 100px;
    margin-top: 32px;
  }
  .matcher-result-title {
    font-size: 22px;
    font-weight: 600;
    margin: 0;
    line-height: 1.4;
  }
  .matcher-results-note {
    margin: 8px 0 22px;
  }
  .matcher-explanation {
    display: grid;
    gap: 20px;
  }
  .matcher-explanation-summary {
    display: grid;
    gap: 8px;
    padding: 18px 20px;
    border: 1px solid #cfdeef;
    border-radius: 14px;
    background: linear-gradient(135deg, #f4f8ff, #eef5ff);
  }
  .matcher-coverage,
  .matcher-confidence-note {
    margin: 0;
  }
  .matcher-coverage {
    color: var(--text-heading);
    font-size: 15px;
    line-height: 1.5;
  }
  .matcher-coverage-value {
    color: var(--accent);
    font-size: 20px;
  }
  .matcher-confidence-note {
    color: var(--text-muted);
    font-size: 12px;
    line-height: 1.6;
  }
  .matcher-requirement-list {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
    padding: 0;
    margin: 0;
    list-style: none;
  }
  ${breakpoint.xl`
    .matcher-requirement-list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  `}
  .matcher-requirement {
    display: flex;
    flex-direction: column;
    gap: 18px;
    min-width: 0;
    padding: 20px;
    border: 1px solid #dce7eb;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.85);
    ${breakpoint.sm`
      padding: 24px;
    `}
  }
  .matcher-requirement-heading,
  .matcher-evidence-heading {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px 16px;
  }
  .matcher-case-title {
    margin: 0;
    font-size: 20px;
    font-weight: 650;
    letter-spacing: -0.02em;
    line-height: 1.4;
  }
  .matcher-requirement-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin: 0 0 -8px;
    color: var(--text-muted);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .matcher-requirement-tag {
    padding: 3px 7px;
    border: 1px solid #dce7eb;
    border-radius: 999px;
  }
  .matcher-confidence {
    display: inline-flex;
    align-items: center;
    min-height: 28px;
    padding: 4px 9px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    line-height: 1.3;
  }
  .matcher-confidence--verified {
    color: #12523d;
    background: #dff7ec;
  }
  .matcher-confidence--missing {
    color: #8c3b32;
    background: #fff0ed;
  }
  .matcher-confidence--not-assessed {
    color: #3f4f69;
    background: #eaf0f8;
  }
  .matcher-confidence--profile-match {
    color: #12523d;
    background: #dff7ec;
  }
  .matcher-profile-copy {
    margin: 0;
    color: var(--text);
    font-size: 15px;
    font-weight: 650;
    line-height: 1.55;
  }
  .matcher-evidence-list {
    display: grid;
    gap: 14px;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .matcher-evidence-item {
    min-width: 0;
    padding-top: 16px;
    border-top: 1px solid #e3eaf2;
  }
  .matcher-evidence-heading {
    margin-bottom: 12px;
    color: var(--text-heading);
    font-size: 14px;
  }
  .matcher-evidence-link {
    color: var(--accent);
    font-size: 12px;
    font-weight: 650;
    text-underline-offset: 4px;
  }
  .matcher-relevance {
    display: grid;
    gap: 4px;
    margin: 0 0 10px;
    color: var(--text-body);
    font-size: 13px;
    line-height: 1.6;
  }
  .matcher-relevance-label {
    color: var(--text-muted);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .matcher-evidence {
    color: var(--text-body);
    line-height: 1.75;
    font-size: 14px;
    margin: 0;
  }
  .matcher-details {
    color: var(--text-body);
    font-size: 14px;
    margin: 12px 0 0;
  }
  .matcher-details-toggle {
    color: var(--accent);
    cursor: pointer;
    font-weight: 600;
    padding-block: 4px;
  }
  .matcher-details-toggle:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
  }
  .matcher-details-copy {
    line-height: 1.75;
    white-space: pre-line;
  }
  .matcher-missing-copy {
    margin: 0;
    color: var(--text-body);
    font-size: 14px;
    line-height: 1.7;
  }
  @media (prefers-reduced-motion: reduce) {
    .matcher-input,
    .matcher-submit,
    .matcher-evidence-link {
      transition: none;
    }
  }
`;
