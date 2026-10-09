import styled from "styled-components";
import Image from "next/image";
import { breakpoint } from "@/styles/Breakpoint";
import { AIGlassMorph } from "@/styles/General.styles";

export const InspirationInnerBlock = styled.div.attrs({ className: "ui-div" })`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-inline: auto;
  ${breakpoint.xxl`
    flex-direction: row;
    align-items: flex-start;
    width: min(calc(100% - 64px), 1120px);
    margin-top: 0;
    gap: clamp(40px, 6vw, 80px);
  `}
`;

export const InspirationBlockLeft = styled.div.attrs({ className: "ui-div" })`
  position: relative;
  display: flex;
  min-width: 0;
  text-align: left;
  ${breakpoint.lg`
    justify-content: center;
    align-items: center;
    font-size: var(--font-body);
    padding: 50px;
  `}
  ${breakpoint.xxl`
    flex: 1 1 0;
    justify-content: flex-start;
    padding: 0;
  `}
`;

export const InspirationBlockRight = styled.div.attrs({ className: "ui-div" })`
  position: relative;
  margin: 0;
  min-width: 0;
  ${breakpoint.lg`
    display: flex;
    justify-content: center;
  `}
  ${breakpoint.xxl`
    flex: 1 1 0;
  `}
`;

export const InspirationFigure = styled.figure.attrs({
  className: "ui-figure",
})`
  margin: 0;
`;

export const InspirationImage = styled(Image).attrs({ className: "ui-img" })`
  width: 100%;
  height: auto;
  ${AIGlassMorph}
`;

export const InspirationContent = styled.div.attrs({ className: "ui-div" })`
  max-inline-size: 680px;
  margin: 0 auto;
  color: var(--text-body);
  font-size: var(--font-body);
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: 0.008em;
  text-align: center;
  text-wrap: pretty;
  padding: 0;
  ${breakpoint.lg`
    margin: 0;
    font-size: var(--font-body);
  `}
  ${breakpoint.lg`
    text-align: left;
    padding-left: 0;
  `}
`;
