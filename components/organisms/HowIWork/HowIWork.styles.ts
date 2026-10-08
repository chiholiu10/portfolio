import styled from "styled-components";
import { ComponentSection } from "../../../styles/General.styles";

export const HowIWorkSection = styled(ComponentSection)`
  box-sizing: border-box;
  min-height: auto;
  scroll-margin-top: 130px;
  padding: 0 24px 120px;
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
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;
export const HowIWorkTitle = styled.h2`
  max-width: 700px;
  margin: 0 0 22px;
  color: #f1f7fb;
  font-size: clamp(34px, 5vw, 56px);
  font-weight: 600;
  line-height: 1.07;
  letter-spacing: -0.045em;
`;
export const HowIWorkLead = styled.p`
  margin: 0;
  max-width: 620px;
  color: #a6b5c6;
  font-size: 16px;
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
    background: linear-gradient(#85f2cf, #a6d9ff 35%, #c2b1ff 65%, #ffd89b);
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
  --step-color: #85f2cf;
  &:nth-child(2) { --step-color: #a6d9ff; }
  &:nth-child(3) { --step-color: #c2b1ff; }
  &:nth-child(4) { --step-color: #ffd89b; }
  > span { grid-column: 2; grid-row: 1; }
  > div { grid-column: 1; grid-row: 1; text-align: right; }
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
  background: radial-gradient(circle, color-mix(in srgb, var(--step-color) 10%, #101629), #101629 70%);
  font-size: 29px;
  @media (max-width: 850px) { margin-bottom: 0; }
`;
export const HowIWorkStepCopy = styled.div`
  h3 {
    margin: 0 0 12px;
    color: #edf5fa;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.025em;
  }
  p { margin: 0; color: #a6b5c6; font-size: 14px; line-height: 1.75; }
  @media (max-width: 850px) { padding-top: 8px; }
`;
