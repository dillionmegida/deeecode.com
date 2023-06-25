import * as React from "react"
import Layout from "../../components/layout"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Seo from "../../components/seo"
import { MDXProvider } from "@mdx-js/react"
import CodeBlock from "../../components/mdx/CodeBlock"
import YouTube from "react-youtube"
import CourseNav from "./course-nav"
import CourseLink from "./course-link"
import HeadingLink from "../../components/mdx/HeadingLink"
import RegexBlock from "../../components/mdx/RegexBlock"
import ImportantBlock from "../../components/mdx/ImportantBlock"

const Container = styled.div`
  --font-size: 19px;
  font-size: var(--font-size);
  color: #dfdbdb;

  .inline-code {
    font-size: calc(var(--font-size) - 3px);
  }

  .multiline-code {
    font-size: calc(var(--font-size) - 2px);
  }

  .part-block {
    text-transform: uppercase;
    background-color: var(--color-regex);
    color: var(--color-regex-dark);
    padding: 5px;
    font-size: 14px;
    font-family: var(--font-heading);
  }

  a {
    color: var(--color-regex);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  ul,
  ol {
    padding-left: 20px;
    list-style-position: initial;
    li {
      margin-bottom: 10px;
      padding-left: 10px;
    }
  }

  ol {
    list-style: decimal;
  }

  ul {
    list-style: disc;
    padding-left: 20px;
    line-height: 20px;
  }

  h1 {
    margin-top: 10px;
  }

  h2 {
    color: var(--color-regex);
  }

  .youtube-iframe {
    margin-bottom: 30px;

    iframe {
      width: 100%;
      min-height: 300px;
    }
  }
`

// const Cover = styled.div`
//   width: 100%;
//   margin-bottom: var(--spacing-10);

//   img {
//     width: 100%;
//   }
// `

const components = {
  code: CodeBlock,
  CourseLink,
  Regex: RegexBlock,
  Important: ImportantBlock,
  h2: props => <HeadingLink Tag="h2" {...props} />,
  h3: props => <HeadingLink Tag="h3" {...props} />,
}

export default function CoursePageTemplate({ location, data, children }) {
  const {
    frontmatter: { title, youtubeId },
    fields: { orderId, slug },
  } = data.currentCourse

  const { prevCourse, nextCourse } = data

  const courseTypeRegex = /(?<=\/courses\/)\w+/

  const [courseType] = slug.match(courseTypeRegex)

  return (
    <Layout location={location} theme={courseType}>
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
    imageCard={`/courses/regex/${data.currentCourse.frontmatter.cover}`}
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
