import styled, { css } from "styled-components";
import theme from "../../../styles/Theme";

const LineColor = css`
  content: "";
  position: absolute;
  top: 0;
  height: 1px;
  width: 85%;
  border-top: 1px solid rgba(56, 189, 248, 0.08);
  box-shadow:
    0 0 60px rgba(14, 165, 233, 0.1),
    inset 0 0 60px rgba(14, 165, 233, 0.05);
`;

export const FooterComponent = styled.footer`
  display: flex;
  justify-content: center;
  padding: 5px 0;
  position: relative;
  &::after,
  &::before {
    ${LineColor}
  }
`;

export const FooterText = styled.p`
  font-size: 16px;
  line-height: 1.4;
`;
