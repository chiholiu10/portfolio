import styled from "styled-components";
import { breakpoint } from "../../../styles/Breakpoint";
import {
  AIGlassMorph,
  TilesProps,
  TitleBlockProps,
} from "../../../styles/General.styles";

export const IntroBlock = styled.div`
  text-align: left;
  padding: 20px;

  ${TilesProps}
  ${breakpoint.sm`
    justify-content: center;
    align-items: center;
    width: 280px;
    display: flex;
    height: 140px;
  `}

  ${AIGlassMorph}
`;

export const IntroSubTitle = styled.p`
  font-size: 18px;
  text-transform: capitalize;
  font-weight: 600;
`;

export const IntroTitle = styled.h3`
  ${TitleBlockProps};
  font-size: 12px;
  ${breakpoint.xs`
    font-size: 16px;
  `}
  ${breakpoint.md`
    font-size: 18px;
  `}
`;

export const IntroBlockCenter = styled.div`
  z-index: 10;
  display: flex;
  flex-direction: row;
  ${IntroTitle} {
    min-width: 130px;
  }
  ${breakpoint.sm`
    text-align: center;
    flex-direction: column;
  `}
`;
