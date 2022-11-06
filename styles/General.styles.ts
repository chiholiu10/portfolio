import styled from 'styled-components';
import { breakpoint } from './Breakpoint';
import theme from './Theme';

export const InnerBody = styled.div`
`;

export const BackgroundImage = styled.img < { left: number; width: number; height: number; }>`
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
  overflow-x: hidden;
  &:first-child {
    margin-top: 50px;
  }
  ${breakpoint.md`
    overflow-x: initial;
    min-height: 600px;
    padding: 0 50px 50px;
  `}
    ${breakpoint.lg`
    min-height: 700px;
  `}
  &:nth-child(5) {
    min-height: 300px;
  }
`;

export const Header = styled.h2`
  font-kerning: normal;
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  line-height: 3;
  color: ${theme.colors.white};
  ${breakpoint.sm`
    font-size: 40px;
    font-weight: 600;
    text-align: center;
    margin-top: 100px;
  `}
  ${breakpoint.md`
    font-size: 48px;
    // padding-bottom: 10px;
  `}
  ${breakpoint.xl`
    font-size: 54px;
    padding: 80px 0 0;
  `}
`;

export const SubHeader = styled.p`
  color: ${theme.colors.grey};
  font-weight: 500;
  font-size: 18px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-bottom: 50px;
  padding: 20px;
  ${breakpoint.sm`
    width: 90%;
    line-height: 1.6;
  `}
  ${breakpoint.md`
    width: 700px;
    line-height: 1.7;
  `}
  ${breakpoint.xl`
    width: 700px;
    line-height: 1.8;
  `}
`;