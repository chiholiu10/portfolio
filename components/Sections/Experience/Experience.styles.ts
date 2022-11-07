import styled, { keyframes } from "styled-components";
import { breakpoint } from "../../../styles/Breakpoint";
import theme from "../../../styles/Theme";

export const ExperienceInnerBlock = styled.div`
  flex-direction: row;
  position: relative;
  margin-top: 50px;
  ${breakpoint.md`
    max-width: 980px;
    margin-left: auto;
    margin-right: auto;
  `}
  ${breakpoint.lg`
    margin-top: 100px;
  `}
`;

const steam = keyframes`
	0% {
		background-position: 0 0;
	}
	50% {
		background-position: 150% 0;
	}
	100% {
		background-position: 0 0;
	}
`;

export const ExperienceBlockLeft = styled.div`
  position: relative;
  display: flex;
  padding: 50px 20px 0;

  ${breakpoint.md`
    background: ${theme.colors.black};
    justify-content: center;
    align-items: center;
    align-items: center;
    font-size: 16px;
  `}
`;

export const ExperienceBlockRight = styled.div`
  position: relative;
  ${breakpoint.md`
    position: absolute;
    width: 50%;
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
    height: 80px;
    left: 0;
    background-color: ${theme.colors.black};
    ${breakpoint.md`
      background-color: ${theme.colors.darkBlack};
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
  font-size: 18px;
  color: ${theme.colors.grey};
  font-weight: 500;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-bottom: 50px;
  padding: 20px;
  line-height: 1.6;
  ${breakpoint.md`  
    padding-top: 50px;
    text-align: left;
    line-height: 1.8;
    font-size: 16px;
    width: calc(50% - 40px);
    margin-left: 40px; 
    margin-right: auto;
  `}
    ${breakpoint.xl` 
    font-size: 18px;
  `}
`;
