import { Html, Head, Main, NextScript } from 'next/document';
import HeadBlock from './headblock';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <HeadBlock />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}