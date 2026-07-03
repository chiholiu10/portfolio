import styled from "styled-components";
import { breakpoint } from "../../../styles/Breakpoint";
import theme from "../../../styles/Theme";

export const NavbarComponent = styled.nav`
  display: none;

  ${breakpoint.md`
    font-size: 22px;
    position: fixed;
    width: 100%;
    background-color: ${theme.colors.black};
    color: ${theme.colors.white};
    filter: blur(0.4);
    z-index: 999;
    height: 60px;
    display: flex;
    align-items: center;
    font-weight: bold;
    justify-content: center;

    &::after {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      background: white;
      width: 100%;
      height: 1px;
      transition: transform 0.4s ease-in;
    }
  `}
`;

export const NavbarInnerBlock = styled.div`
  display: flex;

  .brand {
    position: relative;
    cursor: pointer;
    transition: opacity 0.2s ease;
  }

  .brand:hover {
    opacity: 0.7;
  }
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
    top: 10px;
    border-radius: 50px;
    ${breakpoint.md`
      margin-top: 20px;
      width: 55px;
      height: 55px;
    `}
  }
`;
