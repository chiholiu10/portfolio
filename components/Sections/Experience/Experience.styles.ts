import { breakpoint } from "../../../styles/Breakpoint";
import styled from "styled-components";
import theme from "../../../styles/Theme";

export const ExperienceInnerBlock = styled.div`
  flex-direction: row;
  position: relative;
  margin-top: 50px;
  width: calc(100% + 40px);
  margin-left: -20px;
  z-index: 99;
  overflow: hidden;
  ${breakpoint.md`
    max-width: 980px;
    margin-left: auto;
    margin-right: auto;
    width: unset;

    border-left: none;
    border-right: none;
    border-radius: 15px;
  `}
  ${breakpoint.lg`
    margin-top: 100px;
  `}
`;

export const ExperienceBlockLeft = styled.div`
  position: relative;
  display: flex;
  padding: 50px 20px 0;
  text-align: left;
  ${breakpoint.md`
    background: #2c2c2c;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: white;
  `}
`;

export const ExperienceBlockRight = styled.div`
  position: relative;
  margin: 0;
  ${breakpoint.md`
    position: absolute;
    width: 50%;
    margin: 20px 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
  `}
`;

export const ExperienceFigure = styled.figure`
  top: 0;
  ${breakpoint.md`
    height: 100%;
    position: absolute;
  `}
  &:before,
	&:after {
    transform: skewY(-3.5deg);
    content: "";
    display: block;
    width: 100%;
    height: 50px;
    left: 0;
    background-color: ${theme.colors.lightBlack};
    ${breakpoint.md`
      height: 80px;
      background-color: ${theme.colors.lightBlack};
    `}
  }

  &:before {
    top: -80px;
    transform-origin: right bottom;
    ${breakpoint.md`
      display: none;
    `}
  }

  &:after {
    bottom: -110px;
    transform-origin: left top;
    ${breakpoint.md`
      height: 100%;
		  transform: skew(-20deg);
      top: 0;
      bottom: 0;
      left: 0;
      width: 215px;
      position: absolute;
    `}
  }
`;

export const ExperienceImage = styled.img`
  width: 100%;
  height: calc(100% - 1%);
  object-fit: cover;
  width: 100%;
  transform-origin: left bottom;
  ${breakpoint.md`
    transform: unset;
    object-position: center;
  `}
`;

export const ExperienceContent = styled.div`
  font-size: 14px;
  color: ${theme.colors.white};
  font-weight: 500;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
  padding: 20px;
  line-height: 1.6;
  text-align: center;
  ${breakpoint.md`  
    line-height: 1.8;
    text-align: unset;
    width: calc(50% - 20px);
    margin-left: 40px; 
    padding: 10px;
    margin-right: auto;
  `}
  ${breakpoint.lg`
    font-size: 16px;
    padding: 40px 20px 10px;
    padding-top: 40px;
    width: calc(50% - 40px);
  `}  
`;
