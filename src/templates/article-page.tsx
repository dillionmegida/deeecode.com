import * as React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import styled from "styled-components"
import Seo from "../components/seo"

const Container = styled.div`
  .article {
    &:hover {
      text-decoration: none;

      .article-cover {
        border-color: var(--color-regular-light);
      }

      h2 {
        color: var(--color-regular-light);
      }
    }
    &-cover {
      width: 100%;

      img {
        width: 100%;
      }
    }
  }
`

export default function BlogArticleTemplate({ location, data, children }) {
  const {
    currentArticle: { frontmatter },
  } = data

  return (
    <Layout location={location}>
      <Container>
        <div className="article-cover">
          <img src={`/articles/${frontmatter.cover}`} />
        </div>
        <div className="container">
          <h1>{frontmatter.title}</h1>
          {children}
        </div>
      </Container>
    </Layout>
  )
}

export const Head = ({ data }) => (
  <Seo
    description={data.currentArticle.frontmatter.description}
    imageCard={`/articles/${data.currentArticle.cover}`}
    title={data.currentArticle.frontmatter.title}
  />
)

export const pageQuery = graphql`
  query ($id: String!, $previousArticleId: String, $nextArticleId: String) {
    currentArticle: mdx(id: { eq: $id }) {
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
        cover
        youtubeId
      }
      fields {
        slug
      }
    }
    nextArticle: mdx(id: { eq: $nextArticleId }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
    prevArticle: mdx(id: { eq: $previousArticleId }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`
