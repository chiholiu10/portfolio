import styled from "styled-components";
import Image from "next/image";
import { breakpoint } from "../../../styles/Breakpoint";
import theme from "../../../styles/Theme";
import { AIGlassMorph } from "../../../styles/General.styles";

export const ExperienceInnerBlock = styled.div`
  display: flex;
  flex-direction: column;
  ${breakpoint.lg`
    flex-direction: row;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 150px;
  `}
`;

export const ExperienceBlockLeft = styled.div`
  position: relative;
  display: flex;
  text-align: left;
  ${breakpoint.md`
    justify-content: center;
    align-items: center;
    font-size: 16px;
    padding: 50px;
  `}
`;

export const ExperienceBlockRight = styled.div`
  position: relative;
  margin: 0;
  ${breakpoint.md`
    display: flex;
    justify-content: center;
  `}
`;

export const ExperienceFigure = styled.figure`
  ${breakpoint.md`  
    min-width: 500px;
  `}
`;

export const ExperienceImage = styled(Image)`
  width: 100%;
  height: auto;
  ${AIGlassMorph}
`;

export const ExperienceContent = styled.div`
  font-size: 16px;
  line-height: 1.8;
  text-align: center;
  padding: 20px;
  ${breakpoint.md`
    color: ${theme.colors.grey};
    text-align: left;
      font-size: 18px;
    padding: 40px 20px 10px;
  `}
`;
