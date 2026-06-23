import styled from "styled-components";
import { breakpoint } from "../../../styles/Breakpoint";

export const PortfolioImage = styled.img`
  max-width: 350px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  margin: 10px;
  filter: drop-shadow(0px 54px 55px rgba(0, 0, 0, 0.25))
    drop-shadow(0px -12px 30px rgba(0, 0, 0, 0.12))
    drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.12))
    drop-shadow(0px 12px 13px rgba(0, 0, 0, 0.17))
    drop-shadow(0px -3px 5px rgba(0, 0, 0, 0.09));
  ${breakpoint.md`
    width: 350px;
  `}
  ${breakpoint.lg`
    width: 390px;
  `}
`;

export const PortfolioBlock = styled.div`
  padding: 20px 0;
`;
