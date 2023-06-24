import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import styled from "styled-components"

const COURSE_COVER = "/courses/regex/regex-course-cover.png"

const Container = styled.div`
  font-size: 20px;
  color: white;

  .container {
    padding-top: 0;
  }

  a {
    color: var(--color-regex);
  }
`

const Cover = styled.div`
  width: 100%;
  margin-bottom: var(--spacing-10);

  img {
    width: 100%;
  }
`

const Bio = styled.div`
  margin-bottom: var(--spacing-16);
`

const Outline = styled.div`
  ol {
    padding-left: 20px;
  }

  li {
    list-style-type: decimal;
    padding-left: 5px;
  }
`

const RegexCoursePage = ({ location, data }) => {
  const courses = data.allMdx.nodes

  return (
    <Layout location={location} theme='regex'>
      <Container>
        <Cover className="cover">
          <img src={COURSE_COVER} alt="Regular Expressions Course cover" />
        </Cover>
        <div className="container">
          <h1>Regular Expressions Simplified Course</h1>
          <Bio>
            <p>
              Here's my free course on Simplified Regular Expressions. In this
              course, I teach you how to interpret and understand regular
              expressions, so you can create patterns for your different needs.
              <br />
              <br />
              The video version is live on my{" "}
              <a href="https://www.youtube.com/playlist?list=PLLdz3KlabJv1UVT8cZ-h4iI7fRqC_rArb">
                YouTube channel @deeecode
              </a>{" "}
              and you can find the written parts below.
            </p>
          </Bio>
          <Outline>
            <h2>Outline</h2>
            <ol start={0}>
              {courses.map(course => {
                const {
                  frontmatter: { title },
                  fields: { slug },
                } = course

                return (
                  <li>
                    <Link to={slug}>{title}</Link>
                  </li>
                )
              })}
            </ol>
          </Outline>
        </div>
      </Container>
    </Layout>
  )
}

export default RegexCoursePage

export const Head = () => (
  <Seo
    description="Learn regular expressions in this simplified course"
    imageCard={COURSE_COVER}
    title="Simplified Regular Expressions Course"
  />
)

export const pageQuery = graphql`
  {
    allMdx(
      sort: { fields: { orderId: ASC } }
      filter: { fields: { slug: { regex: "/\/courses/regex\/" } } }
    ) {
      nodes {
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
    }
  }
`
