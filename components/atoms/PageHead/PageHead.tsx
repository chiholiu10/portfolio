import Head from "next/head";

const profileSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://www.chiholiu.com/#profile",
      url: "https://www.chiholiu.com/",
      name: "Chiho Liu | Senior Front-end Developer",
      mainEntity: { "@id": "https://www.chiholiu.com/#person" },
    },
    {
      "@type": "Person",
      "@id": "https://www.chiholiu.com/#person",
      name: "Chiho Liu",
      url: "https://www.chiholiu.com/",
      image:
        "https://res.cloudinary.com/dh7tnzzxm/image/upload/v1681677951/Frame_1_1_mh4oma.png",
      jobTitle: "Senior Front-end Developer",
      description:
        "Senior front-end developer in the Netherlands focused on React, Next.js, TypeScript, accessibility and product quality.",
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
      ],
      sameAs: ["https://github.com/chiholiu10"],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.chiholiu.com/#website",
      url: "https://www.chiholiu.com/",
      name: "Chiho Liu | Senior Front-end Developer",
      inLanguage: "en-NL",
    },
  ],
};

const HeadBlock = () => (
  <Head>
    <title>Senior Front-end Developer | React &amp; TypeScript | Chiho Liu</title>
    <meta
      name="description"
      content="Senior front-end developer in the Netherlands specialising in React, Next.js, TypeScript, accessibility and scalable, user-friendly products."
    />
    <link rel="canonical" href="https://www.chiholiu.com/" />
    <link rel="alternate" hrefLang="en-NL" href="https://www.chiholiu.com/" />
    <link
      rel="alternate"
      hrefLang="x-default"
      href="https://www.chiholiu.com/"
    />
    <meta name="author" content="Chiho Liu" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta
      property="og:title"
      content="Senior Front-end Developer | React & TypeScript | Chiho Liu"
    />
    <meta
      property="og:description"
      content="Senior front-end developer in the Netherlands specialising in React, Next.js, TypeScript, accessibility and scalable products."
    />
    <meta property="og:url" content="https://www.chiholiu.com/" />
    <meta
      property="og:image"
      content="https://res.cloudinary.com/dh7tnzzxm/image/upload/v1681677951/Frame_1_1_mh4oma.png"
    />
    <meta property="og:image:alt" content="Chiho Liu portfolio avatar" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Chiho Liu | Senior Front-end Developer" />
    <meta property="og:locale" content="en_NL" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content="Senior Front-end Developer | React & TypeScript | Chiho Liu"
    />
    <meta
      name="twitter:description"
      content="React, Next.js and TypeScript development focused on performance, accessibility and refined UX."
    />
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
