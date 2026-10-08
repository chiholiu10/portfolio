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
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 24px;
  }
  h1 {
    color: #f4fbff;
    font-size: clamp(48px, 4.5vw, 64px);
    font-weight: 600;
    line-height: 1.02;
    letter-spacing: -0.065em;
    margin: 0 0 28px;
    max-width: 730px;
    @media (max-width: 850px) { font-size: clamp(48px, 6.5vw, 88px); }
  }
  .hero-description {
    color: #aeb9ca;
    font-size: 16px;
    line-height: 1.8;
    max-width: 620px;
  }
`;
export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
  a {
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    padding: 0 24px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 650;
    border: 1px solid #d7d7d3;
    color: #eaf7ff;
    transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1), background 280ms ease;
    @media (prefers-reduced-motion: reduce) { transition: none; }
    &:first-child { background: #85f2cf; color: #101629; border-color: #85f2cf; }
    &:hover { transform: translateY(-2px); }
    &:focus-visible { outline: 2px solid #eaf7ff; outline-offset: 4px; }
  }
`;
export const HeroVisual = styled.div`
  position: relative;
  isolation: isolate;
  width: 70%;
  justify-self: center;
  min-height: 364px;
  border-radius: 28px;
  background: linear-gradient(145deg, #345668, #383e60);
  border: 1px solid rgba(180, 232, 238, 0.3);
  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.12);
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
    background: #85f2cf;
    opacity: 0.24;
    top: 48px;
    right: -100px;
  }
  @media (max-width: 850px) { min-height: 252px; .profile-avatar { max-width: 294px; } }
`;
export const VisualCaption = styled.div`
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
  z-index: 2;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  padding-top: 16px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: #edf5fa;
  font-size: 11px;
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
    font-size: clamp(30px, 4vw, 48px);
    line-height: 1.1;
    letter-spacing: -0.045em;
    color: #eaf7ff;
    font-weight: 600;
  }
  p { margin: 0; color: #aeb9ca; font-size: 17px; line-height: 1.8; }
  @media (max-width: 700px) {
    width: calc(100% - 40px);
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 32px 0;
  }
`;
