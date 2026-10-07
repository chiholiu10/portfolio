import styled, { css } from "styled-components";

const LineColor = css`
  content: "";
  position: absolute;
  top: 0;
  height: 1px;
  width: 85%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(56, 189, 248, 0.2),
    rgba(99, 102, 241, 0.12),
    transparent
  );
  box-shadow:
    0 0 60px rgba(14, 165, 233, 0.1),
    inset 0 0 60px rgba(14, 165, 233, 0.05);
`;

export const FooterComponent = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 20px 30px;
  position: relative;
  &::before {
    ${LineColor}
    left: 7.5%;
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
    box-shadow: 0 0 14px rgba(56, 189, 248, 0.55);
    transform: translateX(-50%);
  }
`;

export const FooterText = styled.p`
  margin: 0;
  color: #718093;
  font-size: 11px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
`;
