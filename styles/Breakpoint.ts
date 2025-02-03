import theme from "./Theme";

export const breakpoint = Object.keys(theme.breakpoints).reduce(
  (acc, label) => {
    acc[label] = (styles) => `
    @media (min-width: ${theme.breakpoints[label]}) {
      ${styles}
    }
  `;
    return acc;
  },
  {}
);
