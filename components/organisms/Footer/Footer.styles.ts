import styled, { css } from "styled-components";

const LineColor = css`
  content: "";
  position: absolute;
  top: 0;
  height: 1px;
  width: min(1120px, calc(100% - 64px));
  background: linear-gradient(
    90deg,
    transparent,
    rgba(var(--accent-rgb), 0.2),
    rgba(99, 102, 241, 0.12),
    transparent
  );
  box-shadow:
    0 0 60px rgba(var(--accent-rgb), 0.1),
    inset 0 0 60px rgba(var(--accent-rgb), 0.05);

  @media (max-width: 850px) {
    width: calc(100% - 40px);
  }
`;

export const FooterComponent = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 20px 30px;
  position: relative;
  &::before {
    ${LineColor}
    left: 50%;
    transform: translateX(-50%);
  }

  &::after {
    content: "";
    position: absolute;
    top: -3px;
    left: 50%;
    width: 7px;
    height: 7px;
    border: 1px solid rgba(125, 211, 252, 0.5);
    border-radius: 50%;
    background: #07111f;
    box-shadow: 0 0 14px rgba(var(--accent-rgb), 0.55);
    transform: translateX(-50%);
  }
`;

export const FooterText = styled.p`
  margin: 0;
  color: var(--text-muted);
  font-size: var(--font-label);
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
`;
