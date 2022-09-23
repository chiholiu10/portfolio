import styled from "styled-components";
import { breakpoint } from "../../../styles/Breakpoint";

export const ComponentRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-bottom: 180px;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  gap: 20px;
  padding: 50px;
  ${breakpoint.md`
    width: 650px;
    gap: 30px;
    justify-content: unset;
    padding: 0;
  `}
`;

export const ToolInnerBlock = styled.div`

`;

export const ToolsBlock = styled.div`
  width: 130px;
  height: 150px;
  border: 1px solid grey;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  line-height: 3;
  ${breakpoint.md`
    width: 190px;
    height: 210px; 
  `}
  ${ToolInnerBlock} {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;

  }
  img {
    width: 60px;
    ${breakpoint.md`
      max-width: 150px;
      width: 100px;
    `}
  }
  h2 {
    line-height: 1;
    font-size: 16px;
    padding: 15px 0 2px;
  }

  ${breakpoint.md`
    h2 {
      font-size: 18px;
      line-height: 2.8;
    }
    ${ToolInnerBlock} {
      padding: 15px 0;
    }
  `}
`;