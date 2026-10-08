import styled from "styled-components";

export const NavbarComponent = styled.nav`
  position: fixed;
  z-index: 999;
  top: 20px;
  left: 50%;
  width: min(1120px, calc(100% - 40px));
  transform: translateX(-50%);
  @media (max-width: 600px) { top: 12px; width: calc(100% - 24px); }
`;

export const NavbarInnerComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 66px;
  padding: 12px 16px 12px 20px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  background: rgba(12, 20, 33, 0.88);
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.16);
  .nav-links { display: flex; gap: 16px; align-items: center; }
  .nav-links a {
    display: inline-flex;
    align-items: center;
    min-height: 40px;
    padding: 0 16px;
    border-radius: 10px;
    color: #b9c4cf;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    transition: background 280ms ease, color 280ms ease;
    @media (prefers-reduced-motion: reduce) { transition: none; }
    &:hover { background: rgba(255, 255, 255, 0.07); color: #fff; }
    &:last-child { color: #101629; background: var(--accent); }
    &:last-child:hover { background: #b3ffe5; }
  }
  a:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
  @media (max-width: 600px) {
    padding: 10px 12px;
    min-height: 58px;
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
  color: #f4f9fc;
  text-decoration: none;
  .brand-copy { display: flex; flex-direction: column; gap: 4px; }
  .brand { font-size: 14px; font-weight: 700; letter-spacing: -0.02em; }
  .role { color: #94a3b3; font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; }
  @media (max-width: 600px) { gap: 8px; .role { display: none; } }
`;

export const BrandOrbit = styled.span`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(var(--accent-rgb), 0.1);
  color: var(--accent);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: -0.04em;
`;
