import Document, { Html, Head, Main, NextScript } from "next/document"
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta httpEquiv="Content-type" content="text/html; charset=utf-8" />
          <link
            rel="preload"
            href="/assets/fonts/Nunito[wght]-subset.woff2"
            as="font"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/assets/fonts/Nunito-Italic[wght]-subset.woff2"
            as="font"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <script type="text/javascript" src="/assets/scripts/theme.js" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
