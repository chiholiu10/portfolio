import { LazyMotion, MotionConfig } from "motion/react";

const loadMotionFeatures = () =>
  import("../lib/motion-features").then((module) => module.default);

const MyApp = ({ Component, pageProps }) => {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadMotionFeatures} strict>
        <Component {...pageProps} />
      </LazyMotion>
    </MotionConfig>
  );
};
export default MyApp;
