import path from "path"
import fs from "fs"
import "html5-device-mockups/dist/device-mockups.min.css"
import { css } from "@emotion/react"
import { IPhone7, Macbook2015 } from "react-device-mockups"

import { CONTENT_DIR, WORK_DIR } from "@/constants"
import Container from "@/components/Container"

import type { Meta } from "../blog/[slug]"
import matter from "gray-matter"
import Link from "next/link"

const MockupTest = () => {
  return (
    <Container>
      <div
        css={css`
          & .device .screen {
            pointer-events: all;
          }
        `}
      >
        <IPhone7
          width={300}
          orientation="portrait"
          color="white"
          buttonProps={{
            onClick: () => alert("Home Button Clicked!"),
          }}
        >
          <iframe
            title="showcase"
            src="http://pueblo-ops.cz"
            style={{
              width: "100%",
              height: "100%",
              margin: 0,
              //resize: "both",
            }}
          />
        </IPhone7>
        <Macbook2015
          width={600}
          color="white"
          buttonProps={{
            onClick: () => alert("Home Button Clicked!"),
          }}
        >
          <iframe
            title="showcase"
            src="http://pueblo-ops.cz"
            style={{
              width: "400%",
              height: "400%",
              margin: 0,
              //resize: "both",
              transform: "scale(0.25)",
              transformOrigin: "0 0",
            }}
          />
        </Macbook2015>
      </div>
    </Container>
  )
}

export default function WorkPage({ links = [] }) {
  if (!links.length) {
    return <p>No projects yet!</p>
  }
  return (
    <Container>
      <div tw="h-full px-4 mx-auto max-w-prose light:(text-secondary)">
        <h1 tw="text-4xl font-bold">Projects</h1>
        <ul tw="mt-4 list-none">
          {links.map(link => (
            <li key={link.slug} tw="my-8">
              <h2 tw="text-3xl font-semibold">
                <Link href={`/work/${link.slug}`}>{link.title}</Link>
              </h2>
              {!!link.categories && (
                <ul>
                  {link.categories.map(category => (
                    <li key={category}>{category}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}

export const getStaticProps = async () => {
  const contentPath = `${CONTENT_DIR}/${WORK_DIR}`
  const postsDirectory = path.join(process.cwd(), contentPath)
  const filenames = fs.readdirSync(postsDirectory)

  const links = filenames
    .filter(path => fs.existsSync(`${process.cwd()}/${contentPath}/${path}/index.mdx`))
    .map(path => {
      const rawContents = fs.readFileSync(
        `${process.cwd()}/${contentPath}/${path}/index.mdx`,
        "utf8",
      )
      const { data: meta }: { data: Meta } = matter(rawContents)
      return { ...meta, slug: path }
    })

  return {
    props: {
      links,
    },
  }
}
