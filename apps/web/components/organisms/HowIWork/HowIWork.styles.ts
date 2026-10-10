import { breakpoint } from "@/styles/Breakpoint";
import { Eyebrow } from "@/components/atoms/Eyebrow/Eyebrow";
import { m } from "motion/react";
import styled from "styled-components";
import { ComponentSection } from "@/styles/General.styles";

export const HowIWorkSection = styled(ComponentSection)`
  box-sizing: border-box;
  min-height: auto;
  scroll-margin-top: 130px;
  padding: 0 20px 120px;
  ${breakpoint.xl`
    padding-inline: 32px;
  `}
`;
export const HowIWorkPanel = styled.div.attrs({ className: "ui-div" })`
  box-sizing: border-box;
  width: min(100%, 1120px);
  margin: 0 auto;
  padding: 24px 0;
`;
export const HowIWorkIntro = styled.div.attrs({ className: "ui-div" })`
  max-inline-size: 740px;
  margin-bottom: 64px;
`;
export const HowIWorkKicker = styled(Eyebrow)`
  margin-bottom: 16px;
`;
export const HowIWorkTitle = styled.h2.attrs({ className: "ui-h2" })`
  max-inline-size: 700px;
  margin: 0 0 22px;
  color: var(--text-heading);
  font-size: var(--font-section);
  font-weight: 600;
  line-height: 1.18;
  letter-spacing: -0.025em;
`;
export const HowIWorkLead = styled.p.attrs({ className: "ui-p" })`
  margin: 0;
  max-inline-size: 620px;
  color: var(--text-body);
  font-size: var(--font-body);
  line-height: 1.75;
`;
export const HowIWorkSteps = styled(m.ol).attrs({ className: "ui-ol" })`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-auto-rows: 1fr;
  gap: 36px;
  margin: 0;
  padding: 0;
  list-style: none;
  ${breakpoint.md`
    gap: 48px;
  `}
`;
export const HowIWorkStep = styled(m.li).attrs({ className: "ui-li" })`
  position: relative;
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  align-items: start;
  gap: 18px;
  min-width: 0;
  --step-color: #173b4b;
  > .step-icon {
    grid-column: 1;
    grid-row: 1;
  }
  > .step-copy {
    grid-column: 2;
    grid-row: 1;
    text-align: left;
    justify-self: end;
  }
  ${breakpoint.md`
    grid-template-columns: minmax(0, 1fr) 52px minmax(0, 1fr);
    align-items: center;
    gap: 24px;
    > .step-icon {
      grid-column: 2;
    }
    > .step-copy {
      grid-column: 1;
    }
    &:nth-child(even) > .step-copy {
      grid-column: 3;
    }
  `}
  ${breakpoint.xxl`
    grid-template-columns: minmax(0, 1fr) 60px minmax(0, 1fr);
    gap: 32px;
  `}
`;
export const HowIWorkIcon = styled(m.span).attrs({ className: "ui-span" })`
  position: relative;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin-bottom: 0;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 14px;
  color: var(--step-color);
  background: linear-gradient(145deg, #ffffff 0%, #edf5f8 42%, #cadfe7 100%);
  box-shadow:
    inset 0 2px 2px rgba(255, 255, 255, 0.95),
    inset 0 -3px 4px rgba(23, 59, 75, 0.16),
    inset 1px 0 2px rgba(255, 255, 255, 0.8),
    0 3px 0 #b8cfd8,
    0 8px 12px rgba(23, 59, 75, 0.14),
    0 18px 30px rgba(23, 59, 75, 0.1);
  font-size: 29px;
  z-index: 1;
  box-sizing: border-box;
  :where(.ui-svg) {
    width: 22px;
    height: 22px;
    filter: drop-shadow(0 1px 0 rgba(255, 255, 255, 0.95));
  }
  ${breakpoint.md`
    width: 52px;
    height: 52px;
    :where(.ui-svg) {
      width: 25px;
      height: 25px;
    }
  `}
  ${breakpoint.xxl`
    width: 60px;
    height: 60px;
    :where(.ui-svg) {
      width: 28px;
      height: 28px;
    }
  `}
`;
export const HowIWorkStepCopy = styled(m.div).attrs({ className: "ui-div" })`
  width: min(100%, 40ch);
  padding-top: 8px;
  :where(.ui-h3) {
    margin: 0 0 12px;
    color: var(--text-heading);
    font-size: var(--font-subheading);
    font-weight: 600;
    letter-spacing: -0.025em;
  }
  :where(.ui-p) {
    margin: 0;
    color: var(--text-body);
    font-size: var(--font-body);
    line-height: 1.7;
  }
  ${breakpoint.xl`
    padding-top: initial;
  `}
`;

export const HowIWorkConnector = styled(m.span).attrs({ className: "ui-span" })`
  position: absolute;
  top: 22px;
  left: 21.5px;
  width: 1px;
  height: calc(100% + 36px);
  background: rgba(23, 59, 75, 0.25);
  transform-origin: top;
  pointer-events: none;
  ${breakpoint.md`
    top: 50%;
    left: calc(50% - 0.5px);
    height: calc(100% + 48px);
  `}
`;
