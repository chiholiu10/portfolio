import styled from "styled-components";
import Image from "next/image";
import { breakpoint } from "../../../styles/Breakpoint";
import { AIGlassMorph } from "../../../styles/General.styles";

export const ExperienceInnerBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-inline: auto;

  ${breakpoint.lg`
    flex-direction: row;
    align-items: center;
    width: calc(100% - 64px);
    max-width: 1320px;
    margin-top: 150px;
    gap: clamp(40px, 6vw, 80px);
  `}
`;

export const ExperienceBlockLeft = styled.div`
  position: relative;
  display: flex;
  min-width: 0;
  text-align: left;

  ${breakpoint.md`
    justify-content: center;
    align-items: center;
    font-size: var(--font-body);
    padding: 50px;
  `}

  ${breakpoint.lg`
    flex: 1 1 0;
    justify-content: flex-start;
    padding: 0;
  `}
`;

export const ExperienceBlockRight = styled.div`
  position: relative;
  margin: 0;
  min-width: 0;

  ${breakpoint.md`
    display: flex;
    justify-content: center;
  `}

  ${breakpoint.lg`
    flex: 1 1 0;
  `}
`;

export const ExperienceFigure = styled.figure``;

export const ExperienceImage = styled(Image)`
  width: 100%;
  height: auto;
  ${AIGlassMorph}
`;

export const ExperienceContent = styled.div`
  max-width: 680px;
  margin: 0 auto;
  color: var(--text-body);
  font-size: var(--font-body);
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: 0.008em;
  text-align: center;
  text-wrap: pretty;
  padding: 20px;
  ${breakpoint.md`
    margin: 0;
    font-size: var(--font-body);
  `}
  ${breakpoint.md`
    text-align: left;
    padding-left: 50px;
  `}
`;
