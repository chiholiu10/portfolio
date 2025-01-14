import { css } from "styled-components";
import theme from "./Theme";

export const breakpoint: Record<string, (strings: TemplateStringsArray, ...args: string[]) => ReturnType<typeof css>> = Object.keys(theme.breakpoints).reduce(
  (accumulator, label) => {
    accumulator[label] = (strings, ...args) => css`
      @media (min-width: ${theme.breakpoints[label]}) {
        ${css(strings, ...args)};
      }
    `;
    return accumulator;
  },
  {} as Record<string, (strings: TemplateStringsArray, ...args: string[]) => ReturnType<typeof css>>
);
