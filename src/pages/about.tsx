import Container from "@/components/Container"

const About = () => {
  return (
    <Container>
      <main tw="h-full max-w-full mx-auto">
        <article tw="prose prose-sm mx-auto pt-8 px-4 md:(prose) lg:(prose-lg px-0) dark:(prose-dark) pb-16">
          <h1>About</h1>
          <strong> Full stack web developer</strong>
          <ul>
            <li>Javascript, TypeScript</li>
            <li>React, Next.js, Gatsby</li>
            <li>Node.js</li>
            <li>PHP, Laravel, Wordpress</li>
            <li>HTML, CSS</li>

            <li>Graphic design (Adobe products)</li>
          </ul>
        </article>
      </main>
    </Container>
  )
}

export default About
