import styled from "styled-components";
import { breakpoint } from "./Breakpoint";
import theme from "./Theme";

export const InnerBody = styled.div``;

export const BackgroundImage = styled.img<{
  left: number;
  width: number;
  height: number;
}>`
  opacity: 0;
  width: 100%;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  z-index: -99;
  display: none;
  left: ${(props) => (props.left ? props.left : 0)};
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.width ? props.height : "1000px")};
  ${breakpoint.md`
    opacity: 0.16;
    display:flex;
  `}
`;

export const ComponentSection = styled.section`
  min-height: 400px;
  width: 100%;
  padding: 0 20px;
  overflow-x: hidden;
  &:first-child {
    margin-top: 50px;
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

export const Header = styled.h2`
  ${HeaderGeneral}
`;

export const SubHeader = styled.p`
  color: ${theme.colors.grey};
  font-weight: 500;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  font-size: 16px;
  line-height: 1.6;
  text-align: center;
  ${breakpoint.md`
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
  gap: 30px;
  margin: 20px auto;
  ${breakpoint.md`
    gap: 30px;
  `}
`;

export const TilesProps = `
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
  rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
  rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  background-color: ${theme.colors.lightBlack};
`;

export const TitleBlockProps = `
  color: ${theme.colors.blue};
  font-weight: 600;
  line-height: 1.8;
  text-transform: capitalize;
  ${breakpoint.sm`
    font-weight: 600;
    font-size: 24px;
  `}
  ${breakpoint.md`
    font-weight: 600;
    font-size: 28px;
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
`;
