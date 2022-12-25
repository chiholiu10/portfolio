import styled from "styled-components";
import { TilesProps, TitleBlockProps } from "styles/General.styles";
import { breakpoint } from "../../../styles/Breakpoint";

export const IntroBlock = styled.div`
  width: 120px;
  height: 120px;
  justify-content: center;
  align-items: center;
  display: flex;
  ${TilesProps}
  ${breakpoint.sm`
    width: 150px;
    height: 150px;
  `}
`;

export const IntroSubTitle = styled.p`
  font-size: 16px;
  text-transform: capitalize;
  font-weight: 600;
`;

export const IntroBlockCenter = styled.div`
  text-align: center;
`;

export const IntroTitle = styled.h3`
  ${TitleBlockProps}
`;
