import { LazyMotion, MotionConfig } from "motion/react";
import Head from "next/head";

const loadMotionFeatures = () =>
  import("../lib/motion-features").then((module) => module.default);

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Frontend Developer Amsterdam | Chi Ho Liu</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://www.chiholiu.com/#person",
                  name: "Chi Ho Liu",
                  url: "https://www.chiholiu.com/",
                  jobTitle: "Frontend Developer",
                  homeLocation: {
                    "@type": "City",
                    name: "Amsterdam",
                  },
                  knowsAbout: [
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Vue.js",
                    "Frontend performance",
                    "Web accessibility",
                    "UX/UI",
                  ],
                },
                {
                  "@type": "Service",
                  "@id": "https://www.chiholiu.com/#frontend-development",
                  name: "Freelance frontend development",
                  serviceType: "Frontend web development",
                  provider: { "@id": "https://www.chiholiu.com/#person" },
                  areaServed: {
                    "@type": "City",
                    name: "Amsterdam",
                  },
                  url: "https://www.chiholiu.com/",
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.chiholiu.com/#website",
                  url: "https://www.chiholiu.com/",
                  name: "Chi Ho Liu — Freelance Frontend Developer Amsterdam",
                  inLanguage: "en-NL",
                },
              ],
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
