import type { ThemeBreakpoints } from "@/styles/breakpoint-values";
import "styled-components";

type ThemeColors = {
  white: string;
  darkBlack: string;
  black: string;
  lightBlack: string;
  ultraLightBlack: string;
  grey: string;
  blue: string;
  transparent: string;
};

type Typography = {
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
};

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ThemeColors;
    typoGraphy: Typography;
    breakpoints: ThemeBreakpoints;
  }
}
