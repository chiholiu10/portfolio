import { LazyMotion, MotionConfig } from "motion/react";
import Head from "next/head";

const loadMotionFeatures = () =>
  import("../lib/motion-features").then((module) => module.default);

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Chi Ho Liu | Front-End Developer in the Netherlands</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Chi Ho Liu",
              url: "https://www.chiholiu.com/",
              jobTitle: "Front-End Developer",
              address: { "@type": "PostalAddress", addressCountry: "NL" },
              knowsAbout: ["React", "Next.js", "TypeScript", "Vue.js", "UX/UI"],
            }).replace(/</g, "\\u003c"),
          }}
        />
      </Head>
      <MotionConfig reducedMotion="user">
        <LazyMotion features={loadMotionFeatures} strict>
          <Component {...pageProps} />
        </LazyMotion>
      </MotionConfig>
    </>
  );
};
export default MyApp;
