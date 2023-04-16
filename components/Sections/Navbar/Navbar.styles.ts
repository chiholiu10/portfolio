import styled from "styled-components";
import { breakpoint } from "../../../styles/Breakpoint";
import theme from "../../../styles/Theme";

export interface NavType {
  navEffect: boolean;
}

export const NavbarComponent = styled.nav<NavType>`
  position: fixed;
  width: 100%;
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  filter: blur(0.4);
  z-index: 999;
  height: 50px;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 22px;
  justify-content: center;
  border-bottom: 1px solid ${theme.colors.white};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);

  ${breakpoint.md`
    font-size: 22px;
    height: 70px;
    border-bottom: unset;
    &:after {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        background: ${(props) => (props.navEffect ? "white" : "silver")};
        width: 100%;
        height: 1px;
        transform: ${(props) => (props.navEffect ? "scale(0)" : "scale(1)")};
        transition: transform 0.4s ease-in;
    }
  `}
`;

export const NavbarInnerBlock = styled.div`
  display: none;
  ${breakpoint.md`
    display: flex;
  `}
`;

export const NavbarInnerComponent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  margin: 0 20px;
  max-width: 1200px;
`;

export const Logo = styled.div`
  img {
    width: 40px;
    height: 40px;
    position: absolute;
    background-color: black;
    z-index: 99;
    right: 0;
    border-radius: 50px;
    ${breakpoint.md`
      margin-top: 20px;
      width: 55px;
      height: 55px;
    `}
  }
`;
