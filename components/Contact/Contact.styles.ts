import styled, { keyframes } from "styled-components";
import { breakpoint } from "../../styles/Breakpoint";
import theme from "../../styles/Theme";
import { ContactSVG } from "../ContactSvg/Contact.styles";
import { AIGlassMorph } from "../../styles/General.styles";

const float = keyframes`
  0% {
    transform: translateY(0);
     filter: brightness(1);
  }

  50% {
    transform: translateY(-14px);
    filter: brightness(1.02);
  }

  100% {
    transform: translateY(0);
    filter: brightness(1.08);
  }
`;

const hoverStyles = `
  @media (hover: hover) and (pointer: fine) {
    cursor: pointer;
  }
`;

const durations = [6.3, 7.8, 6.9, 8.6];
const delays = [-2.1, -5.7, -1.3, -4.4];

export const ContactBlock = styled.div`
  animation-name: ${float};
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation: ${float} ${({ $index }) => durations[$index % durations.length]}s
    ease-in-out ${({ $index }) => delays[$index % delays.length]}s infinite;
  will-change: transform;
  @media (max-width: 767px) {
    animation: none;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    &:hover {
      ${hoverStyles}
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
  align-items: center;
  justify-content: center;
  ${AIGlassMorph}
  ${breakpoint.md`
    width: 80px;
    height: 80px;
  `}
  border: 1px solid rgba(255, 255, 255, 0.1);
  &::after {
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
    `};
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
      ${AIGlassMorph}
      ${ContactSVG} {
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
