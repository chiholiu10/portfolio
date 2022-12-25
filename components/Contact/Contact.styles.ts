import styled from "styled-components";
import { breakpoint } from "../../styles/Breakpoint";
import theme from "../../styles/Theme";
import { ContactSVG } from "../ContactSvg/Contact.styles";

export const ContactBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    &:hover {
      @media (hover: hover) and (pointer: fine) {
        cursor: pointer;
      }
    }
  }
`;

export const ContactBlockAnchor = styled.a`
  font-size: 36px;
  display: flex;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  border: 1px solid ${theme.colors.white};
  color: ${theme.colors.white};
  transition: 1s;
  align-items: center;
  justify-content: center;
  ${breakpoint.md`
    width: 80px;
    height: 80px;
  `}
  &:after {
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    content: "";
    box-sizing: content-box;
    box-shadow: 0 0 0 1px ${theme.colors.white};
    top: 0;
    left: 0;
    opacity: 0;
    transition: 300ms;
    ${breakpoint.md`
      box-shadow: 0 0 0 1px  ${theme.colors.white};
    `}
  }
  ${ContactSVG} {
    width: 45px;
    height: 45px;
    ${breakpoint.md`
      width: 60px;
      height: 60px;
    `}
  }
  &:hover {
    @media (hover: hover) and (pointer: fine) {
      background-color: ${theme.colors.white};
      color: ${theme.colors.black};
      ${ContactSVG} {
        path {
          stroke: ${theme.colors.black};
        }
      }
      &:after {
        opacity: 1;
        transform: scale(1.15);
      }
    }
  }
`;

export const ContactContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 150px 0 50px;
  margin: 20px;
  ${breakpoint.md`
    gap: 30px;
  `}
`;
