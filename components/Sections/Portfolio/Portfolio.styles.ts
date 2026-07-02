import styled from "styled-components";
import Image from "next/image";
import { breakpoint } from "../../../styles/Breakpoint";

export const PortfolioImage = styled(Image)`
  max-width: 350px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  aspect-ratio: 16 / 9;
  ${breakpoint.md`
    width: 350px;
  `}
  ${breakpoint.lg`
    width: 390px;
  `}
`;

export const PortfolioBlock = styled.div`
  max-width: 350px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  margin: 10px;
  filter: drop-shadow(0 12px 18px rgba(0, 0, 0, 0.3));
  aspect-ratio: 16 / 9;
  ${breakpoint.md`
    width: 350px;
  `}
  ${breakpoint.lg`
    width: 390px;
  `}
`;
