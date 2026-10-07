import styled from "styled-components";
import { breakpoint } from "../../../styles/Breakpoint";
import { ComponentSection } from "../../../styles/General.styles";

export const HowIWorkSection = styled(ComponentSection)`
  min-height: auto;
  padding: 0 20px 150px;
`;

export const HowIWorkPanel = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(28px, 6vw, 64px);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 28px;
  background:
    radial-gradient(circle at 85% 5%, rgba(56, 189, 248, 0.12), transparent 34%),
    #08131f;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
`;

export const HowIWorkIntro = styled.div`
  max-width: 700px;
  margin-bottom: 34px;
`;

export const HowIWorkKicker = styled.p`
  margin: 0 0 12px;
  color: #38bdf8;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

export const HowIWorkTitle = styled.h2`
  max-width: 620px;
  margin: 0 0 14px;
  color: #f1f7fb;
  font-size: clamp(30px, 5vw, 48px);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.045em;
`;

export const HowIWorkLead = styled.p`
  margin: 0;
  color: #91a4b7;
  font-size: 16px;
  line-height: 1.72;
`;

export const HowIWorkSteps = styled.ol`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;

  ${breakpoint.md`
    grid-template-columns: repeat(2, minmax(0, 1fr));
  `}
`;

export const HowIWorkStep = styled.li`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: 14px;
  min-width: 0;
  padding: 19px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.025);
`;

export const HowIWorkIcon = styled.span`
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 13px;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.1);
  font-size: 19px;
  font-weight: 700;
`;

export const HowIWorkStepCopy = styled.div`
  h3 {
    margin: 1px 0 7px;
    color: #edf5fa;
    font-size: 15px;
    font-weight: 650;
    letter-spacing: -0.015em;
  }

  p {
    margin: 0;
    color: #8ea0b5;
    font-size: 13px;
    line-height: 1.58;
  }
`;

export const HowIWorkProof = styled.p`
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 24px 0 0;
  color: #9aabbb;
  font-size: 13px;
  line-height: 1.5;

  &::before {
    content: "";
    flex: 0 0 auto;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #38bdf8;
    box-shadow: 0 0 14px rgba(56, 189, 248, 0.68);
  }
`;
