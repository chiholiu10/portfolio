import { createGlobalStyle } from "styled-components";
import theme from "@/styles/Theme";

export const CSSreset = createGlobalStyle`
  @font-face {
    font-family: "MiSans Latin";
    src: url("/fonts/misans/MiSansLatin-Regular.woff2") format("woff2");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "MiSans Latin";
    src: url("/fonts/misans/MiSansLatin-Medium.woff2") format("woff2");
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "MiSans Latin";
    src: url("/fonts/misans/MiSansLatin-Semibold.woff2") format("woff2");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "MiSans Latin";
    src: url("/fonts/misans/MiSansLatin-Bold.woff2") format("woff2");
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  :root {
    --accent: #166778;
    --accent-rgb: 22, 103, 120;
    --accent-warm: #ffb49d;
    --accent-lilac: #c2b1ff;
    --surface: #ffffff;
    --text-heading: #173341;
    --text-body: #435b68;
    --text-muted: #526a78;
    --font-hero: clamp(40px, 4.5vw, 64px);
    --font-section: clamp(30px, 3.8vw, 44px);
    --font-subheading: 20px;
    --font-body: 16px;
    --font-label: 12px;
    --font-small: 14px;
  }
  ::selection {
    background: #85f2cf;
    color: #101629;
  }
  :where(.ui-html) {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    overflow-x: hidden;
    width: min(100%, 100vw);
  }
  :where(.ui-body) {
    position: relative;
    isolation: isolate;
    margin: 0;
    overflow-x: hidden;
    font-family: ${theme.typoGraphy.fonts.body};
    max-inline-size: 100vw;
    color: #173341;
    background: #f4f7f8;
  }
  #__next {
    position: relative;
    z-index: 1;
    min-height: 100vh;
  }
`;
