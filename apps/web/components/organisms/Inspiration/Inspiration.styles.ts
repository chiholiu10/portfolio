import styled from "styled-components";
import Image from "next/image";
import { breakpoint } from "@/styles/Breakpoint";
import { AIGlassMorph } from "@/styles/General.styles";

export const InspirationInnerBlock = styled.div.attrs({ className: "ui-div" })`
  display: flex;
  flex-direction: column;
  width: calc(100% - 40px);
  margin-inline: auto;
  gap: 28px;
  ${breakpoint.lg`
    width: 100%;
    gap: 0;
  `}
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
  width: 100%;
  text-align: left;
  ${breakpoint.lg`
    width: auto;
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
  width: calc(100% + 40px);
  margin-inline: -20px;
  min-width: 0;
  ${breakpoint.lg`
    width: auto;
    margin: 0;
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
  width: 100%;
`;

export const InspirationImage = styled(Image).attrs({ className: "ui-img" })`
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  ${AIGlassMorph}
  border-radius: 0;
  border: 0;
  box-shadow: none;
  transform: none;
  ${breakpoint.lg`
    display: inline;
    box-sizing: content-box;
    border-radius: 12px;
    border: 1px solid rgba(var(--accent-rgb), 0.5);
    box-shadow:
      0 20px 40px -5px rgba(23, 51, 65, 0.12),
      0 0 35px 2px rgba(var(--accent-rgb), 0.25);
    transform: translateY(-2px);
  `}
`;

export const InspirationContent = styled.div.attrs({ className: "ui-div" })`
  margin: 0 auto;
  color: var(--text-body);
  font-size: var(--font-body);
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: 0.008em;
  text-align: left;
  text-wrap: pretty;
  padding: 0;
  ${breakpoint.lg`
    max-inline-size: 680px;
    margin: 0;
    font-size: var(--font-body);
  `}
  ${breakpoint.lg`
    text-align: left;
    padding-left: 0;
  `}
`;
