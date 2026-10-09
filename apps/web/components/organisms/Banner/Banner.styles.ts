import { breakpoint } from "@/styles/Breakpoint";
import styled from "styled-components";

export const Hero = styled.section.attrs({ className: "ui-section" })`
  width: calc(100% - 40px);
  margin: 0 auto;
  padding: 120px 0 80px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  align-items: center;
  ${breakpoint.xl`
    width: min(1120px, calc(100% - 64px));
    padding-top: 156px;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 64px;
  `}
`;
export const HeroCopy = styled.div.attrs({ className: "ui-div" })`
  > :where(.ui-p):first-child {
    margin-bottom: 16px;
  }
  :where(.ui-h1) {
    color: var(--text-heading);
    font-size: var(--font-hero);
    font-weight: 600;
    line-height: 1.12;
    letter-spacing: -0.035em;
    margin: 0 0 28px;
    max-inline-size: 730px;
  }
  .hero-description {
    color: var(--text-body);
    font-size: var(--font-body);
    line-height: 1.8;
    max-inline-size: 58ch;
  }
  ${breakpoint.xxl`
    :where(.ui-h1) {
      font-size: clamp(40px, 4vw, 56px);
    }
  `}
`;
export const HeroActions = styled.div.attrs({ className: "ui-div" })`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
  flex-direction: column;
  align-items: stretch;
  :where(.ui-a) {
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    padding: 0 24px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 650;
    border: 1px solid #d7d7d3;
    color: var(--text-heading);
    transition:
      transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
      background 280ms ease;
    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
    &:first-child {
      background: #166778;
      color: #fff;
      border-color: #166778;
    }
    &:hover {
      transform: translateY(-2px);
    }
    &:focus-visible {
      outline: 2px solid #173341;
      outline-offset: 4px;
    }
  }
  ${breakpoint.xs`
    flex-direction: initial;
    align-items: initial;
  `}
`;
export const HeroVisual = styled.div.attrs({ className: "ui-div" })`
  position: relative;
  isolation: isolate;
  width: 100%;
  justify-self: center;
  min-height: 252px;
  border-radius: 28px;
  background: linear-gradient(145deg, #d2e6ed, #e8eef2);
  border: 1px solid rgba(180, 232, 238, 0.3);
  box-shadow:
    0 28px 70px rgba(23, 51, 65, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
  display: grid;
  place-items: center;
  overflow: hidden;
  .profile-avatar {
    width: 112%;
    height: auto;
    max-inline-size: 294px;
    z-index: 1;
    filter: drop-shadow(0 18px 22px rgba(0, 0, 0, 0.22));
  }
  &::before {
    content: "";
    position: absolute;
    width: 252px;
    height: 252px;
    border-radius: 50%;
    background: #166778;
    opacity: 0.24;
    top: 48px;
    right: -100px;
  }
  ${breakpoint.xl`
    width: 70%;
    min-height: 364px;
    .profile-avatar {
      max-inline-size: 600px;
    }
  `}
`;
export const Approach = styled.section.attrs({ className: "ui-section" })`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  align-items: start;
  width: calc(100% - 40px);
  margin: 0 auto 64px;
  padding: 32px 0;
  border-top: 1px solid rgba(var(--accent-rgb), 0.14);
  .approach-heading {
    min-width: 0;
  }
  .approach-heading > :where(.ui-p) {
    margin-bottom: 16px;
  }
  :where(.ui-h2) {
    text-align: left;
    margin: 0;
    font-size: var(--font-section);
    line-height: 1.1;
    letter-spacing: -0.045em;
    color: var(--text-heading);
    font-weight: 600;
  }
  > :where(.ui-p) {
    margin: 0;
    max-inline-size: 65ch;
    color: var(--text-body);
    font-size: var(--font-body);
    line-height: 1.7;
  }
  ${breakpoint.xl`
    width: min(1120px, calc(100% - 64px));
    padding-top: 48px;
    padding-bottom: 48px;
  `}
`;
