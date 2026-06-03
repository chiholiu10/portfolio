const HeadBlock = () => (
  <>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=5"
    />
    <meta name="format-detection" content="telephone=no" />

    <meta
      name="description"
      content="Explore the portfolio of Chi Ho Liu, a Front End Developer in the Netherlands with expertise in ReactJS, VueJS, NextJS, Nuxt, TypeScript, and Styled-Components. Delivering exceptional user experiences and modern web solutions."
    />

    <meta
      name="keywords"
      content="ReactJS, React, TypeScript, Styled-Components, CSS, JavaScript, Front end, Frontend, Developer, Amsterdam, Nederland, Hong Kong, China, Germany, Europe"
    />

    <link rel="canonical" href="https://www.chiholiu.com" />

    <meta name="author" content="Chi Ho Liu" />
    <meta name="robots" content="index, follow" />

    <meta
      property="og:title"
      content="Chi Ho Liu | Front End Developer Portfolio"
    />
    <meta
      property="og:description"
      content="Discover the professional portfolio of Chi Ho Liu, a skilled Front End Developer in the Netherlands with expertise in modern web technologies and UX/UI design."
    />
    <meta property="og:url" content="https://www.chiholiu.com" />
    <meta
      property="og:image"
      content="https://www.chiholiu.com/portfolio-thumbnail.jpg"
    />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />

    <meta name="title" content="Chiho Liu Front End Developer"></meta>

    {/* Twitter Metadata */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content="Chi Ho Liu | Front End Developer Portfolio"
    />
    <meta
      name="twitter:description"
      content="Explore the portfolio of Chi Ho Liu, showcasing modern web development projects using ReactJS, VueJS, and more."
    />
    <meta
      name="twitter:image"
      content="https://www.chiholiu.com/portfolio-thumbnail.jpg"
    />

    <link rel="icon" href="/favicon.ico" />

    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        mainEntity: {
          "@type": "Person",
          name: "Chi Ho Liu",
          jobTitle: "Front-End & Full-Stack Developer",
          url: "https://chiholiu.com",
          image: "https://chiholiu.com/jouw-profielfoto.jpg",
          description:
            "Ervaren Front-End & Full-Stack Developer op zoek naar een uitdaging in loondienst in regio Amsterdam, Utrecht, Hoofddorp of Amstelveen. Specialist in React, Vue, NextJS en Python.",
          jobBenefits: "Beschikbaar voor loondienst / Fulltime / Parttime",
          workLocation: [
            { "@type": "Place", name: "Amsterdam" },
            { "@type": "Place", name: "Utrecht" },
            { "@type": "Place", name: "Hoofddorp" },
            { "@type": "Place", name: "Amstelveen" },
          ],
          knowsAbout: [
            "Front-End Development",
            "Full-Stack Development",
            "React",
            "Vue",
            "NextJS",
            "Nuxt",
            "TypeScript",
            "Python",
            "Angular",
            "Web Development",
          ],
          inLanguage: "nl-NL",
        },
      })}
    </script>
  </>
);

export default HeadBlock;
