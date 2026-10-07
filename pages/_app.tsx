import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { CSSreset } from "../styles/CssReset";
import theme from "../styles/Theme";
import { LazyMotion, MotionConfig } from "motion/react";

const loadMotionFeatures = () =>
  import("../lib/motion-features").then((module) => module.default);

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadMotionFeatures} strict>
        <ThemeProvider theme={theme}>
          <CSSreset />
          <Component {...pageProps} />
        </ThemeProvider>
      </LazyMotion>
    </MotionConfig>
  );
};
export default MyApp;
