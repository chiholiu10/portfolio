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
    box-shadow: 0 12px 40px rgba(23, 51, 65, 0.04);
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
    margin-bottom: 14px;
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
    border: 1px solid #d6e3e8;
    border-radius: 12px;
    background: #f6f9fa;
    color: var(--text-heading);
    font: inherit;
    font-size: 16px;
    line-height: 1.7;
    transition:
      border-color 180ms ease,
      background 180ms ease;
  }
  .matcher-input::placeholder {
    color: #607781;
    opacity: 1;
  }
  .matcher-input:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
    background: #fff;
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
  .matcher-link:focus-visible {
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
  .matcher-list {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
    padding: 0;
    margin: 0;
    list-style: none;
  }
  ${breakpoint.xxl`
    .matcher-list {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  `}
  .matcher-case {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 24px;
    border: 1px solid #dce7eb;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.85);
  }
  .matcher-case-content {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
  }
  .matcher-case-title {
    margin: 0 0 12px;
    font-size: 20px;
    font-weight: 650;
    letter-spacing: -0.02em;
    line-height: 1.4;
  }
  .matcher-evidence {
    color: var(--text-body);
    line-height: 1.75;
    font-size: 14px;
    margin: 0 0 18px;
  }
  .matcher-details {
    color: var(--text-body);
    font-size: 14px;
    margin-bottom: 18px;
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
  .matcher-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    margin-bottom: 24px;
  }
  .matcher-tag {
    color: var(--accent);
    background: #eaf3f5;
    border-radius: 6px;
    padding: 6px 9px;
    font-size: 12px;
    line-height: 1.4;
  }
  .matcher-link {
    margin-top: auto;
  }
  .matcher-missing {
    padding: 16px 20px;
    border-radius: 12px;
    background: #eaf1f4;
    margin-top: 20px;
  }
  @media (prefers-reduced-motion: reduce) {
    .matcher-input,
    .matcher-submit,
    .matcher-link,
  `;
