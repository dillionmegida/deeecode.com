import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import styled from "styled-components"

const COURSE_COVER = "/courses/regex/regex-course-cover.png"

const Container = styled.div`
  font-size: 20px;
  color: white;

  a {
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
    <Layout location={location} theme={{ bg: "--color-dark-regex" }}>
      <Container>
        <Cover className="cover">
          <img src={COURSE_COVER} alt="Regular Expressions Course cover" />
        </Cover>
        <h1>Regular Expressions Simplified Course</h1>
        <Bio>
          <p>
            Watch out for my Simplified Regular Expression Course. It would be
            published on my{" "}
            <a href="https://youtube.com/@deeecode">
              YouTube channel @deeecode
            </a>{" "}
            and the written part will be published on this website.
          </p>
        </Bio>
        <Outline>
          <h2>Outline</h2>
          <ol>
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
    allMdx {
      nodes {
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
        }
        fields {
          slug
        }
      }
    }
  }
`
