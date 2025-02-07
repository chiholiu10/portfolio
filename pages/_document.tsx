"use client";

import { Head, Html, Main, NextScript } from "next/document";
import { Providers } from "../app/providers";
import StyledComponentRegistry from "../app/registry";
import HeadBlock from "./headblock";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <HeadBlock />
      </Head>
      <body>
        <StyledComponentRegistry>
          <Providers>
            <Main />
            <NextScript />
          </Providers>
        </StyledComponentRegistry>
      </body>
    </Html>
  );
}
