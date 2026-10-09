import Head from "next/head";
import { RevealSessionProvider } from "@/components/atoms/Motion/RevealSession";
import { StarBackground } from "@/components/atoms/StarBackground/StarBackground";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { CSSreset } from "@/styles/CssReset";
import theme from "@/styles/Theme";
import { LazyMotion, MotionConfig } from "motion/react";

const loadMotionFeatures = () =>
  import("@/lib/motion-features").then((module) => module.default);

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <MotionConfig reducedMotion="user">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
        />
      </Head>
      <LazyMotion features={loadMotionFeatures} strict>
        <ThemeProvider theme={theme}>
          <CSSreset />
          <StarBackground />
          <RevealSessionProvider>
            <Component {...pageProps} />
          </RevealSessionProvider>
        </ThemeProvider>
      </LazyMotion>
    </MotionConfig>
  );
};
export default MyApp;
