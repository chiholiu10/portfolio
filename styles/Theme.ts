import { DefaultTheme } from "styled-components";
import token from "./token";

const theme: DefaultTheme = {
  colors: token.colors,
  typoGraphy: {
    fontWeights: token.typoGraphy.fontWeights,
    fonts: token.typoGraphy.fonts,
  },
  breakpoints: token.breakpoints,
};

export default theme;
