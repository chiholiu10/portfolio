import { DefaultTheme } from "styled-components";

const token: DefaultTheme = {
  // colors
  colors: {
    white: "#FFFFFF",
    darkBlack: "#000000",
    black: "#101629",
    lightBlack: "#2c2c2c",
    ultraLightBlack: "#2c2c2cf2",
    grey: "#aeb9ca",
    blue: "#85f2cf",
    transparent: "transparent",
  },
  typoGraphy: {
    fontWeights: {
      regular: 300,
      normal: 400,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
      black: 900,
    },
    fonts: {
      heading: "\"TWKEverett\", sans-serif",
      body: "\"TWKEverett\", sans-serif",
    },
  },
  breakpoints: {
    xs: "360px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1440px",
  },
};

export default token;
