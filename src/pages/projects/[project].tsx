import { MDXRemote } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"

import { CONTENT_DIR, WORK_DIR } from "@/constants"
import Container from "@/components/Container"
import path from "path"
import fs from "fs"
import matter from "gray-matter"

export default function SingleProjectPage({ source }) {
  return (
    <Container>
      <main tw="flex-auto max-w-full">
        <article tw="prose prose-sm mx-auto pt-8 px-4 md:(prose) lg:(prose-lg px-0) light:(prose-thin) dark:(prose-dark prose-thin) pb-16">
          <MDXRemote {...source} />
          <hr />
        </article>
      </main>
    </Container>
  )
}

export const getStaticProps = async context => {
  const contentPath = `${CONTENT_DIR}/${WORK_DIR}`
  const slug = String(context.params?.project)
  const filePath = path.join(process.cwd(), `${contentPath}/${slug}/index.mdx`)
  const rawContents = fs.readFileSync(filePath, "utf8")

  const { content }: { content: string } = matter(rawContents)
  const mdxSource = await serialize(content)

  return {
    props: {
      source: mdxSource,
    },
  }
}

export const getStaticPaths = async () => {
  const contentPath = `${CONTENT_DIR}/${WORK_DIR}`
  const projectsDirectory = path.join(process.cwd(), contentPath)
  const folderNames = fs.readdirSync(projectsDirectory)

  const paths = folderNames
    .filter(path => fs.existsSync(`${process.cwd()}/${contentPath}/${path}/index.mdx`))
    .map(path => {
      const project = path.split(".")[0]

      return {
        params: {
          project,
        },
      }
    })

  return {
    paths,
    fallback: false,
  }
}
