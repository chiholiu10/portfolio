import styled from "styled-components";
import { breakpoint } from "../../../styles/Breakpoint";
import { HeaderGeneral } from "../../../styles/General.styles";

export const HeaderH1 = styled.h1`
  ${HeaderGeneral};
  ${breakpoint.sm`
    font-size: 40px;
    font-weight: 600;
    margin-top: 100px;
    padding: 20px;
  `}
  ${breakpoint.md`
    font-size: 46px;
  `}
  ${breakpoint.xl`
    font-size: 54px;
    padding: 80px 0 0;
  `}
`;

export const ProfileCartoon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  position: relative;
  img {
    z-index: -1;
    opacity: 0.3;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 0;
    width: 900px;
    height: auto;
    aspect-ratio: auto;
  }
  svg {
    position: relative;
    opacity: 1;
    z-index: 100;
    margin: 0 auto;
    width: 165px;
    height: auto;
    aspect-ratio: auto;
  }
`;
