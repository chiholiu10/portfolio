import styled from "styled-components";
import { breakpoint } from "@/styles/Breakpoint";
import {
  OrbitArtwork,
  OrbitCardAccent,
  OrbitingPlanet,
  OrbitSurface,
} from "@/components/atoms/OrbitSurface/OrbitCard.styles";

export const IntroBlock = styled(OrbitSurface)`
  width: min(300px, calc(100vw - 40px));
  min-height: 220px;
  padding: 24px;
  ${breakpoint.md`width: 300px;`}
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
