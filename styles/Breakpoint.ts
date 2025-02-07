/* eslint-disable no-unused-vars */
import theme from "./Theme";

export const breakpoint = Object.keys(theme.breakpoints).reduce(
  (acc, label) => {
    acc[label] = (
      styles: TemplateStringsArray, // Rename to styles (no _ prefix)
      ...args: any[] // Rename to args (no _ prefix)
    ) => ` 
      @media (min-width: ${theme.breakpoints[label]}) {
        ${String.raw(styles, ...args)}
      }
    `;
    return acc;
  },
  {} as Record<string, (styles: TemplateStringsArray, ...args: any[]) => string>,
);
