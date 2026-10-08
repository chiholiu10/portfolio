import styled from "styled-components";
import { breakpoint } from "../../../styles/Breakpoint";
import { OrbitSurface } from "../../atoms/OrbitSurface/OrbitCard.styles";

export const ToolsBlock = styled(OrbitSurface)`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  align-items: center;
  gap: 13px;
  min-width: 0;
  width: 100%;
  max-width: 100%;
  height: 72px;
  padding: 12px 14px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.035),
    0 8px 20px rgba(0, 0, 0, 0.11);

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(var(--accent-rgb), 0.26);
  }
`;

export const ToolsCategory = styled.section`
  box-sizing: border-box;
  width: calc(100% - 64px);
  max-width: 1320px;
  margin: 18px auto 0;
  padding: clamp(20px, 3vw, 28px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 22px;
  background: rgba(234, 242, 245, 0.85);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.025);

  @media (max-width: 850px) {
    width: calc(100% - 40px);
  }

  &:first-child {
    margin-top: 0;
  }
`;

export const ToolsCategoryHeader = styled.div`
  max-width: 640px;
  margin-bottom: 18px;

  h3 {
    margin-bottom: 8px;
    color: var(--text-heading);
    font-size: var(--font-subheading);
    font-weight: 700;
    letter-spacing: -0.025em;
  }

  p {
    color: var(--text-body);
    font-size: var(--font-small);
    line-height: 1.6;
  }
`;

export const ToolsGrid = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(210px, 100%), 1fr));
  gap: 10px;
  width: 100%;
  max-width: 100%;

  > * {
    min-width: 0;
    width: 100%;
    height: 100%;
  }
`;

export const ToolInnerBlock = styled.div`
  position: relative;
  z-index: 3;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.035);

  img {
    width: 28px;
    height: 28px;
    object-fit: contain;
    filter: saturate(0.86) drop-shadow(0 7px 12px rgba(0, 0, 0, 0.26));
    transition: transform 240ms ease, filter 240ms ease;
  }

  ${ToolsBlock}:hover & img {
    transform: translateY(-3px) scale(1.04);
    filter: saturate(1) drop-shadow(0 14px 22px rgba(var(--accent-rgb), 0.14));
  }
`;

export const ToolsHeader = styled.div`
  position: relative;
  z-index: 3;

  h4 {
    color: var(--text-heading);
    font-size: var(--font-small);
    font-weight: 650;
    letter-spacing: -0.02em;
    overflow-wrap: anywhere;
  }
`;
