import * as React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import styled from "styled-components"
import Seo from "../components/seo"
import { MDXProvider } from "@mdx-js/react"
import CodeBlock from "./code-block"

const LESSON_COVER = "/courses/regex/terms-cover.png"

const Container = styled.div`
  h2 {
    color: var(--color-regex-course);
  }
`

const Cover = styled.div`
  width: 100%;
  margin-bottom: var(--spacing-10);

  img {
    width: 100%;
  }
`

const components = {
  code: CodeBlock,
}

export default function CoursePageTemplate({ location, data, children }) {
  const {
    frontmatter: { title },
  } = data.mdx

  return (
    <Layout location={location}>
      <Container>
        <Cover className="cover">
          <img src={LESSON_COVER} alt={`${title} cover`} />
        </Cover>
        <h1>{title}</h1>
        <MDXProvider components={components}>{children}</MDXProvider>
      </Container>
    </Layout>
  )
}

export const Head = ({ data }) => (
  <Seo
    description={data.mdx.frontmatter.description}
    imageCard={LESSON_COVER}
    title={data.mdx.frontmatter.title}
  />
)

export const pageQuery = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
      }
      body
      fields {
        slug
      }
    }
  }
`
