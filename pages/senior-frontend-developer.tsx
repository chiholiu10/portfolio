import Head from "next/head";
import { ThemeProvider } from "styled-components";
import {
  Actions,
  Brand,
  Card,
  ContactLink,
  Container,
  Eyebrow,
  Grid,
  Hero,
  Lead,
  Nav,
  Page,
  PrimaryAction,
  SecondaryAction,
  Section,
  Skills,
  Title,
} from "../components/RecruiterProfile/RecruiterProfile.styles";
import { CSSreset } from "../styles/CssReset";
import theme from "../styles/Theme";

const pageUrl = "https://www.chiholiu.com/senior-frontend-developer";
const title = "Senior Front-end Developer Netherlands | React & TypeScript | Chiho Liu";
const description =
  "Senior front-end developer in the Netherlands with React, Next.js, TypeScript, Vue, accessibility, testing and product-focused UX experience.";

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  url: pageUrl,
  description,
  about: { "@id": "https://www.chiholiu.com/#person" },
  inLanguage: "en-NL",
};

export default function SeniorFrontendDeveloperPage() {
  return (
    <ThemeProvider theme={theme}>
      <CSSreset />
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pageSchema).replace(/</g, "\\u003c"),
          }}
        />
      </Head>

      <Page>
        <Container>
          <Nav aria-label="Recruiter page navigation">
            <Brand href="/">Chiho Liu</Brand>
            <ContactLink href="/#contact">Contact</ContactLink>
          </Nav>

          <Hero>
            <Eyebrow>Hoorn, Netherlands · Senior Front-end Developer</Eyebrow>
            <Title>I turn complex products into clear, dependable experiences.</Title>
            <Lead>
              My strongest work sits between engineering, UX and product. I build
              accessible front ends, improve existing systems and help teams make
              decisions that work for both users and the business.
            </Lead>
            <Actions>
              <PrimaryAction href="/#portfolio">View selected work</PrimaryAction>
              <SecondaryAction href="/#contact">Start a conversation</SecondaryAction>
            </Actions>
          </Hero>

          <Section>
            <Eyebrow>What I bring</Eyebrow>
            <h2>Senior front-end depth, with a broader product view.</h2>
            <p>
              I am strongest in React, Next.js and TypeScript. I also have
              experience with Vue, testing strategies, accessibility and backend
              integrations. I do not pretend to know everything. I ask questions,
              make trade-offs visible and leave the code easier for the next person.
            </p>
            <Skills>
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Vue.js",
                "Accessibility (WCAG)",
                "Jest",
                "Cypress",
                "Playwright",
                "Design systems",
                "Core Web Vitals",
                "AI integration",
              ].map((skill) => <li key={skill}>{skill}</li>)}
            </Skills>
          </Section>

          <Section>
            <Eyebrow>Evidence</Eyebrow>
            <h2>Improvements that users and teams could actually notice.</h2>
            <Grid>
              <Card>
                <strong>+25%</strong>
                <h3>Organic traffic</h3>
                <p>Improved semantics, responsive behaviour and SEO at Gemeente Amsterdam.</p>
              </Card>
              <Card>
                <strong>+75%</strong>
                <h3>Release frequency</h3>
                <p>Helped improve front-end quality and delivery at VodafoneZiggo.</p>
              </Card>
              <Card>
                <strong>+42%</strong>
                <h3>Accessibility</h3>
                <p>Raised accessibility quality as part of broader product improvements at Momants.ai.</p>
              </Card>
            </Grid>
          </Section>

          <Section>
            <Eyebrow>How I work</Eyebrow>
            <h2>Curious, direct and comfortable with change.</h2>
            <p>
              I enjoy new challenges and adapt quickly, but I am not interested in
              change for its own sake. I want to understand the problem, work closely
              with design, product and engineering, and build something that remains
              useful after the initial release. I am open-minded, not afraid to learn
              from mistakes and highly aware of the people affected by technical decisions.
            </p>
            <Actions>
              <PrimaryAction href="/#contact">Contact Chiho</PrimaryAction>
              <SecondaryAction href="/">Explore the full portfolio</SecondaryAction>
            </Actions>
          </Section>
        </Container>
      </Page>
    </ThemeProvider>
  );
}
