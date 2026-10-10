import styled from "styled-components";
import { breakpoint } from "@/styles/Breakpoint";
import { OrbitSurface } from "@/components/atoms/OrbitSurface/OrbitCard.styles";

export const ToolsBlock = styled(OrbitSurface)`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  align-items: center;
  gap: 13px;
  min-width: 0;
  width: min(100%, 100%);
  height: 72px;
  padding: 12px 14px;
  border-radius: 16px;
  background: #ffffff;
  border-color: rgba(var(--accent-rgb), 0.1);
  box-shadow:
    inset 0 1px 0 #fff,
    0 3px 10px rgba(20, 33, 61, 0.04);
  &:hover {
    transform: translateY(-2px);
    border-color: rgba(var(--accent-rgb), 0.26);
  }
`;

export const ToolsCategory = styled.section.attrs({ className: "ui-section" })`
  box-sizing: border-box;
  width: calc(100% - 40px);
  max-inline-size: 1120px;
  margin: 18px auto 0;
  padding: clamp(20px, 3vw, 28px);
  border: 1px solid rgba(var(--accent-rgb), 0.08);
  border-radius: 22px;
  background: linear-gradient(135deg, #ffffff, #f0f5ff);
  box-shadow: inset 0 1px 0 #fff;
  &:first-child {
    margin-top: 0;
  }
  ${breakpoint.xl`
    width: calc(100% - 64px);
  `}
`;

export const ToolsCategoryHeader = styled.div.attrs({ className: "ui-div" })`
  max-inline-size: 640px;
  margin-bottom: 36px;
  :where(.ui-h3) {
    margin-bottom: 8px;
    color: var(--text-heading);
    font-size: var(--font-subheading);
    font-weight: 700;
    letter-spacing: -0.025em;
  }
  :where(.ui-p) {
    color: var(--text-body);
    font-size: var(--font-small);
    line-height: 1.6;
  }
`;

export const ToolsGrid = styled.div.attrs({ className: "ui-div" })`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(210px, 100%), 1fr));
  gap: 10px;
  width: min(100%, 100%);
  ${breakpoint.xxl`
    gap: 20px;
  `}
  > * {
    min-width: 0;
    width: 100%;
    height: 100%;
  }
`;

export const ToolInnerBlock = styled.div.attrs({ className: "ui-div" })`
  position: relative;
  z-index: 3;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.035);
  :where(.ui-img) {
    width: 28px;
    height: 28px;
    object-fit: contain;
    filter: none;
    transition:
      transform 240ms ease,
      filter 240ms ease;
  }
  ${ToolsBlock}:hover & :where(.ui-img) {
    transform: translateY(-2px);
    filter: none;
  }
`;

export const ToolsHeader = styled.div.attrs({ className: "ui-div" })`
  position: relative;
  z-index: 3;
  :where(.ui-h4) {
    color: var(--text-heading);
    font-size: var(--font-small);
    font-weight: 650;
    letter-spacing: -0.02em;
    overflow-wrap: anywhere;
  }
`;
