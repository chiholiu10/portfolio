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
  background: black;
  ${breakpoint.md`
    justify-content: center;
    align-items: center;
    align-items: center;
    font-size: 16px;
  `}
  ${breakpoint.md`
    &:before {
      content: '';
      position: absolute;
      left: -2px;
      top: -2px;
      background: linear-gradient(25deg, 	#FFD700, #FFD700, 	#FF8C00,#D2691E, #FFD700, 	#CD853F, 
        #FFD700, 	#CD853F,	#FF8C00, #ffff00);
      background-size: 400%;
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      z-index: -1;
      animation: ${steam} 5s linear infinite;
    }
    &:after {
      content: '';
      position: absolute;
      left: -2px;
      top: -2px;
      background: linear-gradient(25deg, #DAA520, #ffff00, 	#FF8C00,#ffff00, 	#CD853F, #FFD700, 
        #FFD700, #FFD700,#D2691E, #CD853F);
      background-size: 400%;
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      z-index: -1;
      animation: ${steam} 20s linear infinite;
    }
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
    height: 120px;
    left: 0;
    background-color: ${theme.colors.black};
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
  height: 100%;
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
  color: white;
  ${breakpoint.md`
    text-align: left;
    line-height: 1.8;
    width: 50%;
    margin-left: 10px; 
    margin-right: auto;
  `}
`;
