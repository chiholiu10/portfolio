import styled from "styled-components";
import { TilesProps, TitleBlockProps } from "../../../styles/General.styles";
import { breakpoint } from "../../../styles/Breakpoint";

export const IntroBlock = styled.div`
  width: 100%;
  text-align: left;
  padding: 20px;
  display: flex;
  overflow-x: hidden;
  ${TilesProps}
  ${breakpoint.sm`
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 150px;
  `}
`;

export const IntroSubTitle = styled.p`
  font-size: 16px;
  text-transform: capitalize;
  font-weight: 600;
`;

export const IntroTitle = styled.h3`
  ${TitleBlockProps}
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
