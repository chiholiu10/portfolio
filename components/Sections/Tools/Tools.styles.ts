import styled from "styled-components";
import { breakpoint } from "../../../styles/Breakpoint";
import {
  OrbitArtwork,
  OrbitCardAccent,
  OrbitCardNumber,
  OrbitingPlanet,
  OrbitSurface,
} from "../../OrbitCard/OrbitCard.styles";

export const ToolsBlock = styled(OrbitSurface)`
  display: flex;
  flex-direction: column;
  width: 150px;
  min-height: 178px;
  padding: 18px;

  ${breakpoint.sm`width: 170px; min-height: 190px;`}
  ${breakpoint.md`width: 190px; min-height: 205px;`}
`;

export const ToolNumber = OrbitCardNumber;
export const ToolAccent = OrbitCardAccent;

export const ToolOrbit = styled(OrbitArtwork)`
  top: -78px;
  right: -70px;
  width: 190px;
  height: 190px;
  opacity: 0.8;
`;

export const ToolPlanet = OrbitingPlanet;

export const ToolInnerBlock = styled.div`
  position: relative;
  z-index: 3;
  display: grid;
  place-items: center;
  flex: 1;
  padding-top: 22px;

  img {
    width: 52px;
    height: 52px;
    object-fit: contain;
    filter: saturate(0.86) drop-shadow(0 12px 18px rgba(0, 0, 0, 0.3));
    transition: transform 240ms ease, filter 240ms ease;
  }

  ${ToolsBlock}:hover & img {
    transform: translateY(-3px) scale(1.04);
    filter: saturate(1) drop-shadow(0 14px 22px rgba(56, 189, 248, 0.14));
  }
`;

export const ToolsHeader = styled.div`
  position: relative;
  z-index: 3;
  padding-top: 13px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  p {
    margin-bottom: 5px;
    color: #607084;
    font-size: 8px;
    font-weight: 750;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  h3 {
    color: #eef6fb;
    font-size: 13px;
    font-weight: 650;
    letter-spacing: -0.02em;
  }
`;
