import styled from "styled-components";
import { breakpoint } from "../../../styles/Breakpoint";
import {
  OrbitArtwork,
  OrbitCardAccent,
  OrbitCardNumber,
  OrbitingPlanet,
  OrbitSurface,
} from "../../OrbitCard/OrbitCard.styles";

export const IntroBlock = styled(OrbitSurface)`
  width: min(300px, calc(100vw - 40px));
  min-height: 220px;
  padding: 24px;
  ${breakpoint.md`width: 300px;`}
`;

export const CardNumber = OrbitCardNumber;
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
  color: #6f7d8e;
  font-size: 10px;
  font-weight: 750;
  letter-spacing: 0.13em;
  text-transform: uppercase;
`;

export const IntroTitle = styled.h3`
  max-width: 230px;
  color: #f3f8fc;
  font-size: clamp(15px, 1.4vw, 18px);
  font-weight: 650;
  letter-spacing: -0.025em;
  line-height: 1.25;
`;
