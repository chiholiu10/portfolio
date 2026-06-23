import styled from "styled-components";
import { breakpoint } from "../../../styles/Breakpoint";
import theme from "../../../styles/Theme";
import { AIGlassMorph } from "../../../styles/General.styles";

export const ToolInnerBlock = styled.div`
  position: relative;
  margin: 25px;
  border-radius: 15px;
  height: 40px;
  ${breakpoint.md`
    margin: 30px;

  `}
`;

export const ToolsHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-top: -20px;
  background-color: ${theme.colors.light};
`;

export const ToolsBlock = styled.div`
  width: 140px;
  height: 140px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  border-radius: 12px;

  ${AIGlassMorph}

  ${breakpoint.sm`
    width: 160px;
    height: 160px;
  `}
  ${breakpoint.md`
    width: 200px;
    height: 190px;
  `}
  ${ToolInnerBlock} {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
  }
  img {
    width: 60px;
    height: auto;
    aspect-ratio: auto;
    ${breakpoint.md`
      width: 70px;
    `}
  }
  h2 {
    line-height: 1;
    font-size: 13px;
    width: 100%;
    color: #ffffff; /* Zorg voor goed contrast op donker glas */
  }

  ${breakpoint.md`
    h2 {
      text-transform: capitalize;
      line-height: 2.8;
      margin: 0 0 15px;
      font-size: 16px;
    }
    ${ToolInnerBlock} {
      margin: 30px 0
    }
  `}
`;
