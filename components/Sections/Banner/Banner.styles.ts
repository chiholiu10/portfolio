import styled, { css } from "styled-components";
import { breakpoint } from "styles/Breakpoint";
import { HeaderGeneral, TilesProps } from "styles/General.styles";
import theme from "styles/Theme";

export const HeaderH1 = styled.h1`
  ${HeaderGeneral}
`;

export const BannerBlocks = styled.div(
  (props) => css`
    padding: 20px;
    line-height: 1.5;
    text-align: center;
    color: ${theme.colors.grey};
    ${breakpoint.md`
        padding: 30px;
        line-height: 1.6;
        text-align: unset;
        ${TilesProps};
        color: ${theme.colors.white};
      `}
    ${props.bannerProps === "banner-block-0" &&
    css`
      ${breakpoint.md`
        grid-column: 1 / span 2;
      `}
    `}
    ${props.bannerProps === "banner-block-1" &&
    css`
      ${breakpoint.md`
        grid-row: 1 / span 2;
      `}
    `}
    ${props.bannerProps === "banner-block-2" &&
    css`
      ${breakpoint.md`
        grid-column: 1;
        grid-row: 2;
      `}
    `}
    ${props.bannerProps === "banner-block-3" &&
    css`
      ${breakpoint.md`
        grid-column: 2;
        grid-row: 2;
      `}
    `}
  `
);

export const BannerBlocksHeader = styled.h2`
  text-transform: uppercase;
  font-weight: 600;
  color: ${theme.colors.blue};
`;

export const ComponentGridContainer = styled.div`
  display: grid;
  grid-gap: 50px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 100px;
  ${breakpoint.md`
    padding: 20px;
    max-width: 900px;
    margin-top: 100px;
  `}
`;
