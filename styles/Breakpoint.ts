 
import theme from "./Theme";

export const breakpoint = Object.keys(theme.breakpoints).reduce(
  (acc, label) => {
    acc[label] = (
      styles: TemplateStringsArray,
      ...args: (string | number | boolean)[]
    ) => ` 
      @media (min-width: ${theme.breakpoints[label]}) {
        ${String.raw(styles, ...args)}
      }
    `;
    return acc;
  },
  {} as Record<
    string,
    (
      styles: TemplateStringsArray,
      ...args: (string | number | boolean)[]
    ) => string
  >,
);
