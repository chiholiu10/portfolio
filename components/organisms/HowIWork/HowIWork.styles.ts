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
export const HowIWorkKicker = styled.p`
  margin: 0 0 16px;
  color: var(--accent);
  font-size: var(--font-label);
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
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
export const HowIWorkSteps = styled.ol`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-auto-rows: 1fr;
  gap: 48px;
  margin: 0;
  padding: 0;
  list-style: none;
  &::before {
    content: "";
    position: absolute;
    top: 38px;
    bottom: 38px;
    left: 50%;
    width: 1px;
    background: linear-gradient(#166778, #31758b 35%, #636c94 65%, #8c7137);
    opacity: 0.45;
  }
  @media (max-width: 700px) { gap: 36px; &::before { left: 37px; } }
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
  > span { grid-column: 2; grid-row: 1; }
  > div { grid-column: 1; grid-row: 1; text-align: left; justify-self: end; }
  &:nth-child(even) > div { grid-column: 3; text-align: left; }
  @media (max-width: 700px) {
    grid-template-columns: 76px minmax(0, 1fr);
    gap: 24px;
    align-items: start;
    > span { grid-column: 1; }
    > div, &:nth-child(even) > div { grid-column: 2; text-align: left; }
  }
`;
export const HowIWorkIcon = styled.span`
  position: relative;
  display: grid;
  place-items: center;
  width: 76px;
  height: 76px;
  margin-bottom: 0;
  border: 1px solid color-mix(in srgb, var(--step-color) 35%, transparent);
  border-radius: 50%;
  color: var(--step-color);
  background: radial-gradient(circle, color-mix(in srgb, var(--step-color) 10%, #f4f7f8), #f4f7f8 70%);
  font-size: 29px;
  @media (max-width: 850px) { margin-bottom: 0; }
`;
export const HowIWorkStepCopy = styled.div`
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
