import { Eyebrow } from "@/components/atoms/Eyebrow/Eyebrow";
import { m } from "motion/react";
import styled from "styled-components";
import { ComponentSection } from "@/styles/General.styles";

export const HowIWorkSection = styled(ComponentSection)`
  box-sizing: border-box;
  min-height: auto;
  scroll-margin-top: 130px;
  padding: 0 32px 120px;

  @media (max-width: 850px) {
    padding-inline: 20px;
  }
`;
export const HowIWorkPanel = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 24px 0;
`;
export const HowIWorkIntro = styled.div`
  max-width: 740px;
  margin-bottom: 64px;
`;
export const HowIWorkKicker = styled(Eyebrow)`
  margin-bottom: 16px;
`;
export const HowIWorkTitle = styled.h2`
  max-width: 700px;
  margin: 0 0 22px;
  color: var(--text-heading);
  font-size: var(--font-section);
  font-weight: 600;
  line-height: 1.18;
  letter-spacing: -0.025em;
`;
export const HowIWorkLead = styled.p`
  margin: 0;
  max-width: 620px;
  color: var(--text-body);
  font-size: var(--font-body);
  line-height: 1.75;
`;
export const HowIWorkSteps = styled(m.ol)`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-auto-rows: 1fr;
  gap: 48px;
  margin: 0;
  padding: 0;
  list-style: none;
  @media (max-width: 700px) { gap: 36px; }

`;
export const HowIWorkStep = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 76px minmax(0, 1fr);
  align-items: center;
  gap: 32px;
  min-width: 0;
  --step-color: #166778;
  &:nth-child(2) { --step-color: #31758b; }
  &:nth-child(3) { --step-color: #636c94; }
  &:nth-child(4) { --step-color: #8c7137; }
  > .step-icon { grid-column: 2; grid-row: 1; }
  > .step-copy { grid-column: 1; grid-row: 1; text-align: left; justify-self: end; }
  &:nth-child(even) > .step-copy { grid-column: 3; text-align: left; }
  @media (min-width: 701px) and (max-width: 1024px) {
    grid-template-columns: minmax(0, 1fr) 52px minmax(0, 1fr);
    gap: 24px;
  }
  @media (max-width: 700px) {
    grid-template-columns: 44px minmax(0, 1fr);
    gap: 18px;
    align-items: start;
    > .step-icon { grid-column: 1; }
    > .step-copy, &:nth-child(even) > .step-copy { grid-column: 2; text-align: left; }
  }
`;
export const HowIWorkIcon = styled(m.span)`
  position: relative;
  display: grid;
  place-items: center;
  width: 76px;
  height: 76px;
  margin-bottom: 0;
  border: 1px solid color-mix(in srgb, var(--step-color) 22%, transparent);
  border-radius: 50%;
  color: var(--step-color);
  background: #f8fafb;
  box-shadow: inset 0 1px 0 #fff, 0 4px 12px rgba(23, 59, 75, 0.035);
  svg { width: 32px; height: 32px; }
  font-size: 29px;
  z-index: 1;
  box-sizing: border-box;
  @media (max-width: 1024px) { width: 52px; height: 52px; svg { width: 25px; height: 25px; } }
  @media (max-width: 700px) { width: 44px; height: 44px; svg { width: 22px; height: 22px; } }
  @media (max-width: 850px) { margin-bottom: 0; }
`;
export const HowIWorkStepCopy = styled(m.div)`
  width: 100%;
  max-width: 40ch;
  h3 {
    margin: 0 0 12px;
    color: var(--text-heading);
    font-size: var(--font-subheading);
    font-weight: 600;
    letter-spacing: -0.025em;
  }
  p { margin: 0; color: var(--text-body); font-size: var(--font-body); line-height: 1.7; }
  @media (max-width: 850px) { padding-top: 8px; }
`;

export const HowIWorkConnector = styled(m.span)`
  position: absolute;
  top: 50%;
  left: calc(50% - .5px);
  width: 1px;
  height: calc(100% + 48px);
  background: var(--step-color);
  transform-origin: top;
  pointer-events: none;
  @media (max-width: 700px) {
    top: 22px;
    left: 21.5px;
    height: calc(100% + 36px);
  }
`;
