import styled, { keyframes, css } from "styled-components";
import { breakpoint } from "./Breakpoint";
import theme from "./Theme";

export const InnerBody = styled.div``;

export const BackgroundWrapper = styled.div`
  opacity: 0;
  width: 100%;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  z-index: -99;
  display: none;
  ${breakpoint.md`
    opacity: 0.16;
    display:flex;
  `}
`;

export const BackgroundImage = styled.img<{
  left?: string;
  width?: string;
}>`
  width: 100%;
  height: auto;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  z-index: -99;
  display: none;
  aspect-ratio: auto;
  left: ${(props) => (props.left ? props.left : 0)};
  ${breakpoint.md`
    opacity: 0.2;
    display: flex;
  `}
  &.effect {
    height: "100vh", // You can set this to any value as required
    width: "100%",
    objectFit: "cover", // This ensures that the image doesn't stretch and stays proportional
    position: "absolute", // Keep it fixed in place during scrolling
    top: 0,
    left: 0,
    z-index: -1, // Make sure the background is behind the content
  }
`;

export const ComponentSection = styled.section`
  min-height: 400px;
  width: 100%;
  padding: 0 20px;
  overflow-x: hidden;
  padding-bottom: 150px;
  position: relative;
  &.bannerComponent {
    svg {
      width: 165px;
      height: auto;
      display: flex;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 50px;
    }
    img {
      display: flex;
    }
    ${breakpoint.md`
      padding-top: 180px;
    `}
  }
  &.experienceComponent {
    img {
      left: -52px;
      z-index: 999;
      width: 100%;
      aspect-ratio: auto;
      top: -180px;
    }
  }
  &.contactComponent {
    img {
      right: 0;
      left: auto;
      bottom: 0;
      aspect-ratio: auto;
    }
    overflow: hidden;
  }
  ${breakpoint.md`
    overflow-x: initial;
    min-height: 600px;
    padding: 100px 50px;
  `}
  ${breakpoint.lg`
    min-height: 700px;
  `}
  &:nth-child(5) {
    min-height: 300px;
  }
  input,
  textarea {
    color: ${theme.colors.black};
  }
`;

export const HeaderGeneral = `
  font-kerning: normal;
  font-size: 26px;
  font-weight: 600;
  line-height: 3;
  text-align: center;
  padding: 20px 20px 0;
  color: ${theme.colors.white};
 
`;

export const Header = styled.h2`
  ${HeaderGeneral};
  ${breakpoint.sm`
    font-size: 40px;
    font-weight: 600;
    margin-top: 100px;
    padding: 20px;
  `}
  ${breakpoint.md`
    font-size: 46px;
  `}
  ${breakpoint.xl`
    font-size: 54px;
    padding: 80px 0 0;
  `}
`;

export const SubHeader = styled.p`
  color: ${theme.colors.white};
  font-weight: 500;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  font-size: 15px;
  line-height: 1.6;
  text-align: center;

  ${breakpoint.md`
    color: ${theme.colors.grey};
    width: 700px;
    line-height: 1.7;
    font-size: 18px;
    margin-bottom: 50px;
  `}
  ${breakpoint.xl`
    width: 700px;
    line-height: 1.8;
  `}
`;

export const DisplayFlex = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px auto;
  ${breakpoint.sm`
    gap: 30px;
  `}
`;

export const TilesProps = `
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
  rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
  rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  background-color: #212121;
  border-radius: 15px;
`;

export const TitleBlockProps = `
  color: ${theme.colors.white};
  font-weight: 600;
  line-height: 1.8;
  text-transform: capitalize;
  ${breakpoint.sm`
    font-weight: 600;
  `}
  ${breakpoint.md`
    font-weight: 600;
  `}
`;

export const ComponentRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-bottom: 180px;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  gap: 30px;
  padding: 10px;
  ${breakpoint.md`
    max-width: 750px;
    gap: 60px;
    align-content: space-around;
  `}
  ${breakpoint.lg`
    max-width: 1200px;
    gap: 40px;
  `}
`;

export const SectionPopUpText = styled.div`
  bottom: 50px;
  background-color: grey;
  z-index: 99;
  transition: 1s;
`;

const openPill = keyframes`
  1% {
    width: 0px;
    height: 0px;
    transform: translateY(20px);
    border-radius: 25px;
    color: #fff;
    box-shadow: 0 0 2px #fff, 0 0 10px #fff, 0 0 20px #0ba9ca, 0 0 30px #0ba9ca,
      0 0 40px #0ba9ca, 0 0 50px #0ba9ca;
    animation: blink 0.1s forwards;
  }
 15% {
    transform: translateY(-10px);
    width: 2px;
    height: 2px;
    border-radius: 50px;
  }
  45% {
    transform: translateY(-10px);
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }
  100%{
    transform: translateY(-10px);
    width: 300px;
    height: 50px;
    border-radius: 50px;
    ${SectionPopUpText} {
      border: 10px solid red;
      span {
        display: block;
      }
    }
  }
`;

const animatePills = css`
  ${openPill} 1.5s linear forwards
`;

export const SectionPopUp = styled.div<{
  isInView: boolean;
  bottomElement: boolean;
}>`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  transform: transition;
  overflow: hidden;
  padding: 5px 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${SectionPopUpText} {
    display: flex;
    align-items: center;
    justify-content: center;
    ${(props) => {
    if (props.bottomElement) {
      return css`
          position: absolute;
          animation: ${animatePills};
        `;
    }
    if (props.isInView) {
      return css`
          position: fixed;
          animation: ${animatePills};
        `;
    }

    return css``;
  }}
  }
`;
