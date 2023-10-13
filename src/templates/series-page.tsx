import * as React from "react"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Seo from "../components/seo"
import Share from "../components/mdx/Share"
import CodeBlock from "../components/mdx/CodeBlock"
import { MDXProvider } from "@mdx-js/react"
import HeadingLink from "../components/mdx/HeadingLink"
import QuestionBlock from "../components/mdx/QuestionBlock"
import ImportantBlock from "../components/mdx/ImportantBlock"
import CodePreview from "../components/mdx/CodePreview"
import { SERIES } from "../constants"

const Container = styled.div`
  ul {
    list-style: disc;
    padding-left: 20px;
    line-height: 20px;
  }

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

      &.container-md {
        padding-top: 0;
      }

      img {
        width: 100%;
      }
    }

    h1 {
      color: var(--main-color);
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

export default function SeriesPageTemplate({ location, data, children }) {
  const { currentSeries: allArticles } = data

  const seriesId = allArticles.nodes[0].frontmatter.series

  return (
    <Layout location={location}>
      <Container className="container-md">
        <h1>{SERIES[seriesId].title}</h1>
        <div className="articles">
          {allArticles.nodes.map(({ frontmatter, fields }) => {
            const { category } = frontmatter

            return (
              <Link to={fields.slug} className={`article article--${category}`}>
                <div className="article-cover">
                  <img
                    src={`/articles/${frontmatter.cover}`}
                    alt={frontmatter.title}
                  />
                </div>
                <h2>{frontmatter.title}</h2>
              </Link>
            )
          })}
        </div>
      </Container>
    </Layout>
  )
}

// export const Head = ({ data }) => (
//   <Seo
//     description={data.currentArticle.frontmatter.description}
//     imageCard={`/articles/${data.currentArticle.frontmatter.cover}`}
//     title={data.currentArticle.frontmatter.title}
//   />
// )

export const pageQuery = graphql`
  query ($id: String!) {
    currentSeries: allMdx(filter: { frontmatter: { series: { eq: $id } } }) {
      nodes {
        id
        frontmatter {
          title
          date
          description
          cover
          category
          series
        }
        fields {
          slug
        }
      }
    }
  }
`
