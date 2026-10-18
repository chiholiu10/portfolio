import Head from "next/head";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import styled from "styled-components";
import { HeroActions } from "@/components/organisms/Banner/Banner.styles";
import { premiumEase } from "@/components/atoms/Motion/motion.config";
import { breakpoint } from "@/styles/Breakpoint";

const NotFoundLayout = styled.main.attrs({ className: "ui-main" })`
  box-sizing: border-box;
  width: min(1120px, calc(100% - 40px));
  min-height: 100svh;
  margin: 0 auto;
  padding: 32px 0 48px;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 48px;

  ${breakpoint.xl`
    width: min(1120px, calc(100% - 64px));
    padding-top: 48px;
    padding-bottom: 64px;
    gap: 64px;
  `}
`;

const BrandLink = styled(Link).attrs({ className: "ui-a" })`
  width: fit-content;
  color: var(--text-heading);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
  text-decoration: none;

  &:focus-visible {
    outline: 2px solid #14213d;
    outline-offset: 6px;
    border-radius: 4px;
  }
`;

const NotFoundContent = styled.div.attrs({ className: "ui-div" })`
  align-self: center;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 36px;
  align-items: center;
  padding-bottom: 48px;

  ${breakpoint.xl`
    grid-template-columns: minmax(0, 1fr) minmax(300px, 0.72fr);
    gap: 72px;
    padding-bottom: 72px;
  `}
`;

const NotFoundCopy = styled(m.div).attrs({ className: "ui-div" })`
  min-width: 0;

  .error-label {
    margin: 0 0 16px;
    color: #245ce0;
    font-size: 13px;
    font-weight: 750;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }

  .error-heading {
    max-inline-size: 13ch;
    margin: 0;
    color: var(--text-heading);
    font-size: clamp(46px, 14vw, 76px);
    font-weight: 620;
    line-height: 0.98;
    letter-spacing: -0.055em;
    text-wrap: balance;
  }

  .error-description {
    max-inline-size: 54ch;
    margin: 24px 0 0;
    color: var(--text-body);
    font-size: var(--font-body);
    line-height: 1.75;
    text-wrap: pretty;
  }

  ${breakpoint.xl`
    .error-heading {
      font-size: clamp(64px, 7vw, 96px);
    }
  `}
`;

const ErrorVisual = styled(m.div).attrs({
  className: "ui-div",
  "aria-hidden": "true",
})`
  position: relative;
  isolation: isolate;
  min-height: 260px;
  display: grid;
  place-items: center;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.82);
  border-radius: 28px;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.72),
    rgba(225, 235, 255, 0.46)
  );
  box-shadow:
    0 28px 70px rgba(20, 33, 61, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.98);

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    filter: blur(1px);
  }

  &::before {
    width: 220px;
    height: 220px;
    top: -92px;
    right: -58px;
    background: rgba(36, 92, 224, 0.22);
  }

  &::after {
    width: 150px;
    height: 150px;
    bottom: -70px;
    left: -30px;
    background: rgba(67, 190, 205, 0.22);
  }

  ${breakpoint.xl`
    min-height: 400px;
  `}
`;

const ErrorCode = styled.div.attrs({ className: "ui-div" })`
  position: relative;
  z-index: 1;
  color: #14213d;
  font-size: clamp(92px, 30vw, 152px);
  font-weight: 720;
  line-height: 1;
  letter-spacing: -0.09em;
  text-indent: -0.09em;
  text-shadow: 0 18px 40px rgba(36, 92, 224, 0.16);

  ${breakpoint.xl`
    font-size: clamp(128px, 14vw, 190px);
  `}
`;

export default function NotFoundPage() {
  const reduceMotion = useReducedMotion();
  const transition = {
    duration: reduceMotion ? 0 : 0.7,
    ease: premiumEase,
  };

  return (
    <>
      <Head>
        <title>Page not found | Chiho Liu</title>
        <meta
          name="description"
          content="This page does not exist. Explore Chiho Liu's frontend and applied AI work instead."
        />
        <meta name="robots" content="noindex, follow" />
      </Head>
      <NotFoundLayout>
        <BrandLink href="/" aria-label="Back to Chiho Liu's homepage">
          Chiho Liu
        </BrandLink>
        <NotFoundContent>
          <NotFoundCopy
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
          >
            <p className="ui-p error-label">Error 404</p>
            <h1 className="ui-h1 error-heading">This route goes nowhere.</h1>
            <p className="ui-p error-description">
              The page may have moved or the address may be incorrect. Continue
              with my selected work or start a conversation.
            </p>
            <HeroActions>
              <Link className="ui-a" href="/#portfolio">
                Explore my work
              </Link>
              <Link className="ui-a" href="/#contact">
                Let’s talk
              </Link>
            </HeroActions>
          </NotFoundCopy>
          <ErrorVisual
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.08 }}
          >
            <ErrorCode>404</ErrorCode>
          </ErrorVisual>
        </NotFoundContent>
      </NotFoundLayout>
    </>
  );
}
