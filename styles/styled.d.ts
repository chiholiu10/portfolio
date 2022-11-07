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

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ObjectOfStrings | Color;
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