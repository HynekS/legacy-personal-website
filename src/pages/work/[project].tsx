import { MDXRemote } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"

import { CONTENT_DIR, WORK_DIR } from "@/constants"
import Container from "@/components/Container"
import path from "path"
import fs from "fs"
import { execSync } from "child_process"
import matter from "gray-matter"

export default function SingleProjectPage({ source }) {
  return (
    <Container>
      <main tw="flex-auto max-w-full margin-right[calc((50% - 30ch)/2)]">
        <article tw="prose prose-sm mx-auto pt-8 px-4 md:(prose) lg:(prose-lg px-0) light:(prose-thin) dark:(prose-dark prose-thin) pb-16">
          <MDXRemote {...source} />
          <hr />
        </article>
      </main>
    </Container>
  )
}

export const getStaticProps = async context => {
  console.log({ context })

  const contentPath = `${CONTENT_DIR}/${WORK_DIR}`
  const slug = String(context.params?.project)
  const filePath = path.join(process.cwd(), `${contentPath}/${slug}/index.mdx`)
  const rawContents = fs.readFileSync(filePath, "utf8")

  // const gihubFileLink = `https://github.com/HynekS/personal-website/edit/main/__content__/__blog__/${slug}/index.mdx`

  const allAuthorDates = execSync(
    `git log --follow --name-status --pretty=format:%aI -- ${filePath}`,
  ).toString()

  // const [lastEditExceptPathChangeDate] = allAuthorDates.match(/20[\d-T:.Z+]+$(?!\r?\nR)/m) || []

  const { content, data: meta }: { content: string; data: Meta } = matter(rawContents)
  const mdxSource = await serialize(content, {
    scope: meta,
  })

  return {
    props: {
      source: mdxSource,
    },
  }
}

export const getStaticPaths = async context => {
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
