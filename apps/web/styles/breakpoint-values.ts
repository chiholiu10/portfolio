/** Shared mobile-first size scale. Names describe width, not devices. */
export const breakpointValues = {
  xxs: 390,
  xs: 420,
  sm: 620,
  md: 700,
  lg: 768,
  xl: 850,
  xxl: 1024,
  xxxl: 1440,
} as const;

export type BreakpointName = keyof typeof breakpointValues;

export type ThemeBreakpoints = {
  [Name in BreakpointName]: `${(typeof breakpointValues)[Name]}px`;
};

export const themeBreakpoints = Object.fromEntries(
  Object.entries(breakpointValues).map(([name, width]) => [name, `${width}px`]),
) as ThemeBreakpoints;
