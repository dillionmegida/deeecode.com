import * as React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import styled from "styled-components"
import Seo from "../components/seo"
import Share from "../components/mdx/Share"
import CodeBlock from "../components/mdx/CodeBlock"
import { MDXProvider } from "@mdx-js/react"
import HeadingLink from "../components/mdx/HeadingLink"

const Container = styled.div`
  .article {
    --main-color: var(--color-regular-light);
    --font-size: 19px;
    font-size: var(--font-size);
    color: #dfdbdb;

    .inline-code {
      font-size: calc(var(--font-size) - 3px);
    }

    .multiline-code {
      font-size: calc(var(--font-size) - 2px);
    }

    &--javascript {
      --main-color: var(--color-javascript-light);
    }

    &--css {
      --main-color: var(--color-css-light);
    }

    &-cover {
      width: 100%;

      img {
        width: 100%;
      }
    }

    h1 {
      color: var(--main-color);
    }

    ul {
      list-style: disc;
      padding-left: 20px;
      line-height: 20px;
    }

    img {
      width: 100%;
      margin-bottom: 30px;
    }

    h2 {
      line-height: 40px;
      font-size: 30px;

      .inline-code {
        font-size: 24px;
      }
    }

    a {
      color: var(--main-color);
    }
  }
`

export default function BlogArticleTemplate({ location, data, children }) {
  const {
    currentArticle: { frontmatter },
  } = data

  const components = {
    Share,
    code: props => <CodeBlock category={frontmatter.category} {...props} />,
    h2: props => <HeadingLink Tag="h2" {...props} />,
    h3: props => <HeadingLink Tag="h3" {...props} />,
  }

  return (
    <Layout location={location} theme={frontmatter.category}>
      <Container>
        <div className="article-cover">
          <img src={`/articles/${frontmatter.cover}`} />
        </div>
        <div className={`container article article--${frontmatter.category}`}>
          <h1>{frontmatter.title}</h1>
          <MDXProvider components={components}>{children}</MDXProvider>
        </div>
      </Container>
    </Layout>
  )
}

export const Head = ({ data }) => (
  <Seo
    description={data.currentArticle.frontmatter.description}
    imageCard={`/articles/${data.currentArticle.frontmatter.cover}`}
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
        category
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
