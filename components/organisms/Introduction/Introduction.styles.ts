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
  grid-template-columns: repeat(auto-fit, minmax(0, 348px));
  grid-auto-rows: 1fr;
  align-items: stretch;
  > div { display: flex; min-width: 0; }
  @media (max-width: 388px) { grid-template-columns: minmax(0, 1fr); }
`;

export const IntroBlock = styled(OrbitSurface)`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 268px;
  padding: 24px;
`;

export const OrbitVisual = OrbitArtwork;
export const OrbitPlanet = OrbitingPlanet;
export const CardFoot = OrbitCardAccent;

export const IntroBlockCenter = styled.div`
  position: relative;
  z-index: 3;
  margin-top: 92px;
`;

export const IntroSubTitle = styled.p`
  margin-bottom: 9px;
  color: var(--text-muted);
  font-size: var(--font-label);
  font-weight: 750;
  letter-spacing: 0.13em;
  text-transform: uppercase;
`;

export const IntroTitle = styled.h3`
  max-width: 230px;
  color: var(--text-heading);
  font-size: var(--font-subheading);
  font-weight: 650;
  letter-spacing: -0.025em;
  line-height: 1.25;
`;
