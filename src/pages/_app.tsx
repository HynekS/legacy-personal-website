import type { AppProps } from "next/app"

import { GlobalStyles } from "twin.macro"
import { MDXProvider } from "@mdx-js/react"
import { MDXEmbedProvider } from "mdx-embed"

import Lightbox from "@/components/Lightbox"
import DevstackItem from "@/components/DevstackItem"
import Note from "@/components/Note"
import { ThemeProvider } from "@/components/Theme"

import "../../public/assets/styles/base.css"
import "html5-device-mockups/dist/device-mockups.min.css"

const components = {
  Lightbox,
  DevstackItem,
  Note,
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider>
        <GlobalStyles />
        <MDXProvider components={components}>
          <MDXEmbedProvider>
            <Component {...pageProps} />
          </MDXEmbedProvider>
        </MDXProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
