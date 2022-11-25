import { Html, Head, Main, NextScript } from 'next/document';
import HeadBlock from './headblock';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <HeadBlock />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}