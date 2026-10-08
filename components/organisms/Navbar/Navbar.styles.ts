import { architecturalPatternStatic } from "../../../styles/ArchitecturalPattern";
import styled from "styled-components";

export const NavbarComponent = styled.nav`
  position: fixed;
  z-index: 999;
  top: 20px;
  left: 50%;
  width: min(1320px, calc(100% - 64px));
  transform: translateX(-50%);
  @media (max-width: 600px) { top: 12px; width: calc(100% - 24px); }
`;

export const NavbarInnerComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 56px;
  padding: 8px 16px 8px 20px;
  position: relative;
  isolation: isolate;
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 18px;
  background: linear-gradient(115deg, rgba(244, 249, 251, 0.96), rgba(221, 234, 240, 0.94));
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.16), inset 0 1px 0 #fff;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    pointer-events: none;
        background-image: ${architecturalPatternStatic};
    mask-image: linear-gradient(to right, transparent 22%, #000 65%, transparent);
  }
  .nav-links { display: flex; gap: 16px; align-items: center; }
  .nav-links a {
    display: inline-flex;
    align-items: center;
    min-height: 40px;
    padding: 0 16px;
    border-radius: 10px;
    color: #344b59;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    transition: background 280ms ease, color 280ms ease;
    @media (prefers-reduced-motion: reduce) { transition: none; }
    &:hover { background: rgba(30, 66, 83, 0.08); color: #102a39; }
    &:last-child { color: #fff; background: var(--accent); }
    &:last-child:hover { background: #125667; }
  }
  a:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
  @media (max-width: 600px) {
    padding: 6px 12px;
    min-height: 52px;
    gap: 10px;
    .nav-links { gap: 12px; }
    .nav-links a { padding: 0 10px; font-size: 12px; }
    .nav-links a:nth-child(2) { display: none; }
  }
`;

export const NavbarInnerBlock = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  color: var(--text-heading);
  text-decoration: none;
  .brand-copy { display: flex; flex-direction: column; gap: 4px; }
  .brand { font-size: 14px; font-weight: 700; letter-spacing: -0.02em; }
  .role { color: var(--text-body); font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; }
  @media (max-width: 600px) { gap: 8px; .role { display: none; } }
`;

export const BrandOrbit = styled.span`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 12px 5px 12px 5px;
  background: #173b4b;
  color: #f4fbff;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: -0.04em;
`;
