import styled, { css } from "styled-components";
import { breakpoint } from "@/styles/Breakpoint";
import theme from "@/styles/Theme";

export const AIGlassMorph = css`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(24px);
  border-radius: 12px;
  box-shadow:
    0 20px 40px -15px rgba(23, 51, 65, 0.12),
    0 0 30px -5px rgba(var(--accent-rgb), 0.2);
  background: rgba(230, 241, 245, 0.9);
  /* Rand licht feller op bij hover (Cyaan/Blauw) */
  border: 1px solid rgba(var(--accent-rgb), 0.5);
  /* De blauwe AI-glow wordt intenser */
  box-shadow:
    0 20px 40px -5px rgba(23, 51, 65, 0.12),
    0 0 35px 2px rgba(var(--accent-rgb), 0.25);
  /* Optioneel: lift het blokje een heel klein beetje omhoog */
  transform: translateY(-2px);
`;

interface ComponentSectionProps {
  paddingLarge?: boolean;
}

export const ComponentSection = styled.section.attrs({
  className: "ui-section",
})<ComponentSectionProps>`
  min-height: 650px;
  width: 100%;
  overflow-x: hidden;
  padding-bottom: 150px;
  position: relative;
  &:not(.bannerComponent) {
    content-visibility: auto;
    contain-intrinsic-size: auto 850px;
  }
  &.bannerComponent {
    :where(.ui-svg) {
      width: min(100%, 850px);
      height: auto;
      display: flex;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 50px;
    }
    :where(.ui-img) {
      display: flex;
    }
  }
  &.inspirationComponent {
    position: relative;
    :where(.ui-img) {
      left: -52px;
      z-index: 999;
      width: 100%;
      aspect-ratio: auto;
      top: -180px;
    }
  }
  &.contactComponent {
    :where(.ui-img) {
      right: 0;
      left: auto;
      bottom: 0;
      aspect-ratio: auto;
    }
    overflow: hidden;
  }
  :where(.ui-input),
  :where(.ui-textarea) {
    color: ${theme.colors.black};
  }
  ${breakpoint.lg`
    overflow-x: initial;
    &.bannerComponent {
      padding-top: 180px;
    }
  `}
  ${breakpoint.xl`
    &:not(.bannerComponent) {
      margin-top: 32px;
    }
  `}
`;

export const HeaderGeneral = `
  font-kerning: normal;
  font-size: var(--font-section);
  font-weight: 650;
  line-height: 1.2;
  letter-spacing: -0.025em;
  text-align: center;
  padding: 20px 20px 0;
  color: var(--text-heading);
  text-wrap: balance;
  text-shadow: 0 0 36px rgba(var(--accent-rgb), 0.07);
`;

export const Header = styled.h2.attrs({ className: "ui-h2" })`
  ${HeaderGeneral}
  ${breakpoint.sm`
    font-size: var(--font-section);
    font-weight: 600;
    margin-top: 100px;
  `}
  ${breakpoint.lg`
    font-size: var(--font-section);
  `}
  ${breakpoint.xxxl`
    font-size: var(--font-section);
    padding: 80px 0 0;
  `}
`;

export const SubHeader = styled.p.attrs({ className: "ui-p" })`
  max-inline-size: 65ch;
  color: var(--text-body);
  font-weight: 400;
  margin: 0 auto;
  padding: 20px 20px 80px;
  font-size: var(--font-body);
  line-height: 1.75;
  letter-spacing: 0.008em;
  text-align: center;
  text-wrap: pretty;
  ${breakpoint.lg`
    margin-bottom: 50px;
    width: 700px;
  `}
`;

export const DisplayFlex = styled.div.attrs({ className: "ui-div" })`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  width: calc(100% - 40px);
  padding-bottom: 180px;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  gap: 30px;
  ${breakpoint.lg`
    gap: 32px;
  `}
  ${breakpoint.xl`
    width: min(1120px, calc(100% - 64px));
  `}
`;
