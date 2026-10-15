import Head from "next/head";

const professionalTitle =
  "Senior Frontend Developer | Product-minded, AI-enabled";
const pageTitle = `${professionalTitle} | Chiho Liu`;
const profileDescription =
  "Product-minded senior frontend developer in the Netherlands, combining React, TypeScript, UX and practical AI integration to build valuable digital products.";

const profileSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://www.chiholiu.com/#profile",
      url: "https://www.chiholiu.com/",
      name: pageTitle,
      mainEntity: { "@id": "https://www.chiholiu.com/#person" },
    },
    {
      "@type": "Person",
      "@id": "https://www.chiholiu.com/#person",
      name: "Chiho Liu",
      url: "https://www.chiholiu.com/",
      image:
        "https://res.cloudinary.com/dh7tnzzxm/image/upload/v1681677951/Frame_1_1_mh4oma.png",
      jobTitle: professionalTitle,
      description: profileDescription,
      homeLocation: {
        "@type": "Place",
        name: "Hoorn, Netherlands",
      },
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "Vue.js",
        "Web accessibility",
        "Frontend performance",
        "Design systems",
        "User experience",
        "AI integration",
        "Product engineering",
      ],
      sameAs: ["https://github.com/chiholiu10"],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.chiholiu.com/#website",
      url: "https://www.chiholiu.com/",
      name: pageTitle,
      inLanguage: "en-NL",
    },
  ],
};

const HeadBlock = () => (
  <Head>
    <title>{pageTitle}</title>
    <meta name="description" content={profileDescription} />
    <link rel="canonical" href="https://www.chiholiu.com/" />
    <link rel="alternate" hrefLang="en-NL" href="https://www.chiholiu.com/" />
    <link
      rel="alternate"
      hrefLang="x-default"
      href="https://www.chiholiu.com/"
    />
    <meta name="author" content="Chiho Liu" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={profileDescription} />
    <meta property="og:url" content="https://www.chiholiu.com/" />
    <meta
      property="og:image"
      content="https://res.cloudinary.com/dh7tnzzxm/image/upload/v1681677951/Frame_1_1_mh4oma.png"
    />
    <meta property="og:image:alt" content="Chiho Liu portfolio avatar" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={professionalTitle} />
    <meta property="og:locale" content="en_NL" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={pageTitle} />
    <meta name="twitter:description" content={profileDescription} />
    <meta
      name="twitter:image"
      content="https://res.cloudinary.com/dh7tnzzxm/image/upload/v1681677951/Frame_1_1_mh4oma.png"
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(profileSchema).replace(/</g, "\\u003c"),
      }}
    />
  </Head>
);

export default HeadBlock;
