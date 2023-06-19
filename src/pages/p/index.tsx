import React from "react"
import Layout from "../../components/layout"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Seo from "../../components/seo"
import { LINKS } from "../../constants"

const Container = styled.div<{ theme: any }>`
  font-size: 20px;

  .articles {
    display: grid;
    --grid-columns: 2;
    grid-template-columns: repeat(var(--grid-columns), 1fr);
    column-gap: 20px;
    row-gap: 30px;

    @media (max-width: 600px) {
      --grid-columns: 1;
    }
  }

  .article {
    --main-color: var(--color-regular-light);

    &--javascript {
      --main-color: var(--color-javascript);
    }

    &--css {
      --main-color: var(--color-css);
    }

    &:hover {
      text-decoration: none;

      .article-cover {
        border-color: var(--main-color);
      }

      h2 {
        color: var(--main-color);
      }
    }

    &-cover {
      width: 100%;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid transparent;
      transition: border-color 300ms;

      img {
        width: 100%;
      }
    }

    h2 {
      margin: 10px 0 0;
      font-size: 25px;
      transition: color 300ms;
    }
  }
`

export default function Articles({ location, data }) {
  const { allArticles } = data

  return (
    <Layout location={location}>
      <Container className="container">
        <h1>Articles</h1>

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

export const Head = () => <Seo title="Articles" />

export const pageQuery = graphql`
  {
    allArticles: allMdx(
      sort: { frontmatter: { date: ASC } }
      limit: 1000
      filter: { fields: { slug: { regex: "//p//" } } }
    ) {
      nodes {
        id
        frontmatter {
          title
          date
          description
          cover
          category
        }
        fields {
          slug
        }
      }
    }
  }
`
