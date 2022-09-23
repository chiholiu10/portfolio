import styled from "styled-components";
import { breakpoint } from "../../../styles/Breakpoint";
import theme from "../../../styles/Theme";

export const ExperienceInnerBlock = styled.div`
  flex-direction: row;
  position: relative;
  margin-top: 50px;
  ${breakpoint.md`
    height: 300px;
  `}
`;

export const ExperienceBlockLeft = styled.div`
  position: relative;
  display: flex;
  color: lightgrey;
  font-size: 1.0rem;
  font-weight: 500;
  padding: 50px 20px 0;
  ${breakpoint.md`
    justify-content: center;
    align-items: center;
    padding: 5% 50px 50px 50px;
    width: 50%;
  `}
`;

export const ExperienceBlockRight = styled.div`
  position: relative;
  padding: 20px 20px 100px;
`;

export const ExperienceFigure = styled.figure`
  transform-origin: left bottom;
  height: 100%;
  right: 0;
  margin-right: 0;
  margin-left: auto;
  z-index: 1;
  overflow: hidden;
  padding: 0;
  transform-origin: top bottom;
  transform: skewY(-12deg);
  ${breakpoint.md`
    width: 50%;
    transform-origin: unset;
    transform: skewX(-25deg);
  `}
`;

export const ExperienceImageLayer = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: skewX(0deg);
  background: rgba(50, 70, 80, 0.3);
`;

export const ExperienceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  width: 100%;
  transform: skewY(10deg);
  transform-origin: left bottom;
  ${breakpoint.md`
    transform-origin: left bottom;
    transform: skewX(25deg);
  `}
`;

export const ExperienceContent = styled.div`
  font-size: 18px;
  color: #999999;
  font-weight: 500;
  font-size: 18px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-bottom: 50px;
  padding: 20px;
  ${breakpoint.md`
    text-align: left;
  `}
`;