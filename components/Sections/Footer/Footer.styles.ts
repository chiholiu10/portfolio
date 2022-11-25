import styled from "styled-components";
import theme from "../../../styles/Theme";

export const FooterComponent = styled.footer`
  display: flex;
  justify-content: center;
  padding: 15px 0 10px;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    height: 1px;
    width: 90%;
    border-top: 1px solid ${theme.colors.white};
  }
`;

export const FooterText = styled.div`
  font-size: 14px;
`;
