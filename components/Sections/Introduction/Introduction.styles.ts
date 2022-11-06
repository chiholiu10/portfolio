import styled from "styled-components";
import { breakpoint } from "../../../styles/Breakpoint";
import theme from "../../../styles/Theme";

export const DisplayFlex = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  ${breakpoint.md`
    gap: 50px;
  `}
`;

export const IntroBlock = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  background-color: ${theme.colors.lightBlack};
  ${breakpoint.sm`
    width: 180px;
    height: 180px;
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