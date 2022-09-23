import styled from "styled-components";
import { breakpoint } from "../../../styles/Breakpoint";
import theme from "../../../styles/Theme";

export const DisplayFlex = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
`;

export const IntroBlock = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: ${theme.colors.lightBlack};
  ${breakpoint.sm`
    width: 200px;
    height: 200px;
  `}
`;

export const IntroTitle = styled.h3`
  color: ${theme.colors.blue};
  font-weight: 600;
  font-size: 15px;
  ${breakpoint.sm`
    font-weight: 600;
    font-size: 24px;
  `}
  ${breakpoint.md`
    font-weight: 600;
    font-size: 28px;
  `}
`;

export const IntroSubTitle = styled.p`
  font-size: 14px;
  ${breakpoint.sm`
    font-size: 18px;
  `}
  ${breakpoint.md`
    font-size: 18px;
  `}
`;

export const IntroBlockCenter = styled.div`
  text-align: center;
`;