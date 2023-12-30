"use client";

import { Html, Head, Main, NextScript } from "next/document";
import HeadBlock from "./headblock";
import StyledComponentRegistry from "../app/registry";
import { Providers } from "../app/providers";

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
