import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  // Next.js requires this instance render method for custom Documents.
  render() {
    return (
      <Html className="ui-html" lang="en-NL">
        <Head>
          <link
            rel="preload"
            href="/fonts/misans/MiSansLatin-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <meta name="format-detection" content="telephone=no" />
          <link rel="icon" href="/favicon.ico?v=cl" sizes="16x16 32x32 48x48" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <meta name="theme-color" content="#245ce0" />
        </Head>
        <body className="ui-body">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
