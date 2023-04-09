import styled from "styled-components";
import { breakpoint } from "styles/Breakpoint";

export const PortfolioImage = styled.img`
  max-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 10px;
  ${breakpoint.md`
    max-width: 400px;
  `}
`;
