import styled from "styled-components";

export const Hero = styled.section`
  width: min(1320px, calc(100% - 64px));
  margin: 0 auto;
  padding: 156px 0 80px;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 64px;
  align-items: center;
  @media (max-width: 850px) {
    width: calc(100% - 40px);
    grid-template-columns: 1fr;
    padding-top: 120px;
    gap: 40px;
  }
`;
export const HeroCopy = styled.div`
  > p:first-child {
    color: var(--accent);
    font-size: var(--font-label);
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 24px;
  }
  h1 {
    color: var(--text-heading);
    font-size: var(--font-hero);
    font-weight: 600;
    line-height: 1.12;
    letter-spacing: -0.035em;
    margin: 0 0 28px;
    max-width: 730px;
  }
  .hero-description {
    color: var(--text-body);
    font-size: var(--font-body);
    line-height: 1.8;
    max-width: 58ch;
  }
`;
export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
  @media (max-width: 420px) {
    flex-direction: column;
    align-items: stretch;
  }
  a {
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
    transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1), background 280ms ease;
    @media (prefers-reduced-motion: reduce) { transition: none; }
    &:first-child { background: #166778; color: #fff; border-color: #166778; }
    &:hover { transform: translateY(-2px); }
    &:focus-visible { outline: 2px solid #173341; outline-offset: 4px; }
  }
`;
export const HeroVisual = styled.div`
  position: relative;
  isolation: isolate;
  width: 70%;
  justify-self: center;
  min-height: 364px;
  border-radius: 28px;
  background: linear-gradient(145deg, #d2e6ed, #e8eef2);
  border: 1px solid rgba(180, 232, 238, 0.3);
  box-shadow: 0 28px 70px rgba(23, 51, 65, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.12);
  display: grid;
  place-items: center;
  overflow: hidden;
  .profile-avatar { width: 112%; height: auto; max-width: 600px; z-index: 1; filter: drop-shadow(0 18px 22px rgba(0, 0, 0, 0.22)); }
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
  @media (max-width: 850px) { width: 100%; min-height: 252px; .profile-avatar { max-width: 294px; } }
`;
export const VisualCaption = styled.div`
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
  z-index: 2;
  padding-top: 16px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: var(--text-heading);
  font-size: var(--font-label);
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Approach = styled.section`
  display: grid;
  grid-template-columns: 0.65fr 1.35fr;
  gap: 48px;
  width: min(1320px, calc(100% - 64px));
  margin: 0 auto 64px;
  padding: 48px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  h2 {
    margin: 0;
    font-size: var(--font-section);
    line-height: 1.1;
    letter-spacing: -0.045em;
    color: var(--text-heading);
    font-weight: 600;
  }
  p { margin: 0; max-width: 65ch; color: var(--text-body); font-size: var(--font-body); line-height: 1.7; }
  @media (max-width: 700px) {
    width: calc(100% - 40px);
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 32px 0;
  }
`;
