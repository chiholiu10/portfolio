import styled from "styled-components";
import { breakpoint } from "styles/Breakpoint";

export const PortfolioImage = styled.img`
  max-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  ${breakpoint.md`
    max-width: 350px;
  `}
  ${breakpoint.lg`
    max-width: 390px;
  `}
`;

export const PortfolioBlock = styled.div``;
