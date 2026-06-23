import styled, { css, keyframes } from "styled-components";
import { breakpoint } from "./Breakpoint";
import theme from "./Theme";

export const AIGlassMorph = css`
  background: rgba(10, 25, 50, 0.4);
  backdrop-filter: blur(24px);
  border-radius: 12px;
  box-shadow:
    0 20px 40px -15px rgba(0, 0, 0, 0.9),
    0 0 30px -5px rgba(14, 165, 233, 0.2);
  background: rgba(15, 37, 75, 0.55);
  /* Rand licht feller op bij hover (Cyaan/Blauw) */
  border: 1px solid rgba(56, 189, 248, 0.5);
  /* De blauwe AI-glow wordt intenser */
  box-shadow:
    0 20px 40px -5px rgba(0, 0, 0, 0.9),
    0 0 35px 2px rgba(14, 165, 233, 0.25);
  /* Optioneel: lift het blokje een heel klein beetje omhoog */
  transform: translateY(-2px);
`;

export const AIGlassMorphStatic = css`
  background: rgba(10, 25, 50, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 12px;
  box-shadow:
    0 20px 40px -15px rgba(0, 0, 0, 0.9),
    0 0 30px -5px rgba(14, 165, 233, 0.2);
`;

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

export const BackgroundImage = styled.div<{
  left?: string;
  width?: string;
}>`
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

interface ComponentSectionProps {
  paddingLarge?: boolean;
}

export const ComponentSection = styled.section<ComponentSectionProps>`
  min-height: 650px;
  width: 100%;
  overflow-x: hidden;
  padding-bottom: 150px;
  position: relative;
  backdrop-filter: blur(4px);

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
    position: relative;

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
  `}
  input,
  textarea {
    color: ${theme.colors.black};
  }
`;

export const HeaderGeneral = `
  font-kerning: normal;
  font-size: 26px;
  font-weight: 600;
  line-height: 1.4;
  text-align: center;
  padding: 20px 20px 0;
  color: ${theme.colors.white};
  ${breakpoint.md`
    line-height: 3;
  `}
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
  margin: 0 auto;
  padding: 20px 20px 80px;
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
  flex-wrap: wrap;
  padding-bottom: 180px;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  gap: 30px;
  ${breakpoint.md`
    max-width: 1800px;
    gap: 50px;
  `}
`;

export const TilesProps = ` 
  background-image: linear-gradient(
    to bottom right,
    var(--gradient-from),
    var(--gradient-to)
  );
  border-color: #fff3;
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
  100% {
    transform: translateY(-10px);
    width: 300px;
    height: 50px;
    border-radius: 50px;
    ${SectionPopUpText} {
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
