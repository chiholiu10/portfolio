import styled, { keyframes } from "styled-components";
import { breakpoint } from "../../../styles/Breakpoint";

const orbit = keyframes`to { transform: rotate(360deg); }`;
const breathe = keyframes`50% { opacity: .45; transform: scale(.82); }`;

export const NavbarComponent = styled.nav`
  display: none;
  ${breakpoint.md`
    display: block;  
    position: fixed;
    z-index: 999;
    top: 9px;
    left: 50%;
    width: min(1180px, calc(100% - 24px));
    transform: translateX(-50%)
  `}
`;

export const NavbarInnerComponent = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  min-height: 48px;
  padding: 4px 8px;
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 999px;
  background:
    linear-gradient(110deg, rgba(56, 189, 248, 0.055), transparent 38%),
    rgba(6, 14, 24, 0.79);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.045),
    0 20px 65px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px) saturate(1.25);

  &::after {
    content: "";
    position: absolute;
    right: 12%;
    bottom: -1px;
    left: 12%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(56, 189, 248, 0.55),
      transparent
    );
  }

  ${breakpoint.md`
    grid-template-columns: 1fr auto 1fr;
    padding-left: 8px;
  `}
`;

export const NavbarInnerBlock = styled.a`
  display: flex;
  align-items: center;
  gap: 9px;
  width: max-content;
  color: #f4f9fc;
  text-decoration: none;

  .brand-copy {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .brand {
    font-size: 14px;
    font-weight: 760;
    letter-spacing: -0.025em;
  }
  .role {
    color: #657386;
    font-size: 9px;
    font-weight: 750;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding-top: 3px;
  }
`;

export const BrandOrbit = styled.span`
  position: relative;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(56, 189, 248, 0.22);
  border-radius: 50%;
  color: #dff6ff;
  font-size: 14px;
  font-weight: 850;

  &::before {
    content: "";
    position: absolute;
    inset: 4px;
    border: 1px dashed rgba(56, 189, 248, 0.3);
    border-radius: 50%;
    animation: ${orbit} 12s linear infinite;
  }

  &::after {
    content: "";
    position: absolute;
    top: 48%;
    left: 1px;
    width: 6px;
    height: 6px;
    border: 2px solid #07111c;
    border-radius: 50%;
    background: #38bdf8;
    box-shadow: 0 0 12px rgba(56, 189, 248, 0.8);
    animation: ${breathe} 2.8s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before,
    &::after {
      animation: none;
    }
  }
`;
