import { breakpoint } from "@/styles/Breakpoint";
import styled from "styled-components";
import { DisplayFlex } from "@/styles/General.styles";
import {
  OrbitArtwork,
  OrbitCardAccent,
  OrbitingPlanet,
  OrbitSurface,
} from "@/components/atoms/OrbitSurface/OrbitCard.styles";

export const IntroGrid = styled(DisplayFlex)`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-auto-rows: auto;
  gap: 12px;
  padding-bottom: 32px;
  align-items: stretch;
  > :where(.ui-div) {
    display: flex;
    min-width: 0;
  }
  ${breakpoint.lg`
    grid-template-columns: repeat(auto-fit, minmax(0, 348px));
    grid-auto-rows: 1fr;
    gap: 32px;
    padding-bottom: 180px;
  `}
`;

export const IntroBlock = styled(OrbitSurface)`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 28px 20px;
  border-radius: 14px;
  @supports (
    (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))
  ) {
    background: linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.7),
      rgba(239, 245, 255, 0.4)
    );
    -webkit-backdrop-filter: blur(18px) saturate(120%);
    backdrop-filter: blur(18px) saturate(120%);
    border-color: rgba(255, 255, 255, 0.75);
    box-shadow:
      0 12px 32px rgba(20, 33, 61, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.95),
      inset 0 -1px 0 rgba(255, 255, 255, 0.35);
  }
  ${breakpoint.lg`
    min-height: 268px;
    padding: 24px;
    border-radius: 26px;
  `}
`;

export const OrbitVisual = OrbitArtwork;
export const OrbitPlanet = OrbitingPlanet;
export const CardFoot = OrbitCardAccent;

export const IntroBlockCenter = styled.div.attrs({ className: "ui-div" })`
  position: relative;
  z-index: 3;
  margin-top: 0;
  ${breakpoint.lg`
    margin-top: 92px;
  `}
`;

export const IntroSubTitle = styled.p.attrs({ className: "ui-p" })`
  margin: 0 0 9px;
  color: var(--text-muted);
  font-size: var(--font-label);
  font-weight: 750;
  letter-spacing: 0.13em;
  text-transform: uppercase;
`;

export const IntroTitle = styled.h3.attrs({ className: "ui-h3" })`
  margin: 0;
  color: var(--text-heading);
  font-size: var(--font-subheading);
  font-weight: 650;
  letter-spacing: -0.025em;
  line-height: 1.25;
  ${breakpoint.lg`
    max-inline-size: 230px;
    margin-block: 1em;
  `}
`;
