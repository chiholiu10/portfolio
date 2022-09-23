import 'styled-components';

export type ThemeMode = 'light' | 'dark';

type ObjectOfStrings = Record<string | number, any>;

interface Breakpoints extends Array<number> {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ObjectOfStrings;
    fontWeights: {
      regular?: string | number;
      normal?: string | number;
      semiBold?: string | number;
      bold?: string | number;
      extraBold?: string | number;
      black?: string | number;
    };
    fonts: {
      heading: string;
      body: string;
    };
    breakpoints: Breakpoints;
  }
}