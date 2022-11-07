import styled from "styled-components";
import { breakpoint } from "../../../styles/Breakpoint";
import theme from "../../../styles/Theme";

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

export const ToolInnerBlock = styled.div`
  background-color: ${theme.colors.black};
`;

export const ToolsHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  background-color: ${theme.colors.lightBlack};
`;

export const ToolsBlock = styled.div`
  width: 130px;
  height: 160px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  ${breakpoint.md`
    width: 190px;
    height: 200px;
  `}
  ${ToolInnerBlock} {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1
  }
  img {
    width: 60px;
    ${breakpoint.md`
      max-width: 100px;
      width: 80px;
    `}
  }
  h2 {
    line-height: 1;
    font-size: 13px;
    width: 100%;
  }

  ${breakpoint.md`
    h2 {
      text-transform: uppercase;
      line-height: 2.8;
      margin: 5px 0;
    }
    ${ToolInnerBlock} {
      padding: 15px 0 25px;
    }
  `}
`;