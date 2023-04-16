import styled from "styled-components";
import { HeaderGeneral } from "styles/General.styles";

export const HeaderH1 = styled.h1`
  ${HeaderGeneral}
`;

export const ProfileCartoon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  img {
    z-index: -1;
    opacity: 0.3;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 0;
    width: 900px;
    height: 400px;
  }
  svg {
    position: relative;
    opacity: 1;
    z-index: 100;
    margin-left: auto;
    margin-right: auto;
  }
`;
