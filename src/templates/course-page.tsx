import * as React from "react"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Seo from "../components/seo"
import { MDXProvider } from "@mdx-js/react"
import CodeBlock from "./code-block"
import YouTube from "react-youtube"
import { LINKS } from "../constants"

const Container = styled.div`
  font-size: 20px;
  padding-bottom: 50px;

  .part-block {
    text-transform: uppercase;
    background-color: var(--color-regex-course);
    color: var(--color-dark-regex);
    padding: 5px;
    font-size: 14px;
    font-family: var(--font-heading);
  }

  a {
    color: var(--color-regex-course);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  ul,
  ol {
    padding-left: 20px;
    li {
      margin-bottom: 10px;
    }
  }

  ol {
    list-style: decimal;
  }

  h1 {
    margin-top: 10px;
  }

  h2 {
    color: var(--color-regex-course);
  }

  .youtube-iframe {
    margin-bottom: 30px;

    iframe {
      width: 100%;
      min-height: 300px;
    }
  }

  .course-nav {
    margin: 20px var(--spacing-5);
    font-size: 18px;
    display: flex;
    justify-content: space-between;

    &--just-next {
      justify-content: flex-end;
    }

    &--prev,
    &--next {
      margin-bottom: 10px;
    }

    &--prev {
      justify-self: flex-start;
      text-align: left;
    }

    &--next {
      justify-self: flex-end;
      text-align: right;
    }
  }
`

const Cover = styled.div`
  width: 100%;
  margin-bottom: var(--spacing-10);

  img {
    width: 100%;
  }
`

function CourseLink({ course, path, label }) {
  const link = LINKS.courses[course][path]

  return <Link to={link}>{label}</Link>
}

const components = {
  code: CodeBlock,
  CourseLink,
}

function CourseNav({ prevCourse, nextCourse }) {
  return (
    <div className={`course-nav ${prevCourse ? "" : "course-nav--just-next"}`}>
      {prevCourse && (
        <div className="course-nav--prev">
          <Link to={prevCourse.fields.slug}>
            &lt; {prevCourse.frontmatter.title}
          </Link>
        </div>
      )}
      {nextCourse && (
        <div className="course-nav--next">
          <Link to={nextCourse.fields.slug}>
            {nextCourse.frontmatter.title} &gt;
          </Link>
        </div>
      )}
    </div>
  )
}

export default function CoursePageTemplate({ location, data, children }) {
  const {
    frontmatter: { title, date, cover, youtubeId },
    fields: { orderId },
  } = data.currentCourse

  const { prevCourse, nextCourse } = data

  return (
    <Layout location={location} theme={{ bg: "--color-dark-regex" }}>
      <Container>
        {/* <Cover className="page-cover">
          <img src={`/courses/regex/${cover}`} alt={`${title} cover`} />
        </Cover> */}
        <CourseNav prevCourse={prevCourse} nextCourse={nextCourse} />
        <div className="container">
          <span className="part-block">Part {orderId}</span>
          <h1> {title}</h1>
          <YouTube className="youtube-iframe" videoId={youtubeId} />
          <MDXProvider components={components}>{children}</MDXProvider>
        </div>
        <CourseNav prevCourse={prevCourse} nextCourse={nextCourse} />
      </Container>
    </Layout>
  )
}

export const Head = ({ data }) => (
  <Seo
    description={data.currentCourse.frontmatter.description}
    imageCard={`/courses/regex/${data.currentCourse.cover}`}
    title={data.currentCourse.frontmatter.title}
  />
)

export const pageQuery = graphql`
  query ($id: String!, $previousCourseId: String, $nextCourseId: String) {
    currentCourse: mdx(id: { eq: $id }) {
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
        cover
        youtubeId
      }
      fields {
        slug
        orderId
      }
    }
    nextCourse: mdx(id: { eq: $nextCourseId }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
    prevCourse: mdx(id: { eq: $previousCourseId }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`
