import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import styled from "styled-components"
import { LINKS } from "../../constants"

const COURSE_COVER = "/courses/javascript/js-course-cover.png"

const Container = styled.div`
  font-size: 20px;
  color: white;

  .container {
    padding-top: 0;
  }

  a {
    color: var(--color-javascript);
  }
`

const Cover = styled.div`
  width: 100%;
  margin-bottom: var(--spacing-10);

  img {
    width: 100%;
  }

  &.container-md {
    padding-top: 0;
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

const JavaScriptCoursePage = ({ location, data }) => {
  const courses = data.allMdx.nodes

  return (
    <Layout location={location} theme="javascript">
      <Container>
        <Cover className="cover container-md">
          <img src={COURSE_COVER} alt="Regular Expressions Course cover" />
        </Cover>
        <div className="container-md">
          <h1>JavaScript Simplified for Beginners Course</h1>
          <Bio>
            <p>
              Here's a course I'm working on--JavaScript for Beginners. In this
              course, I will teach you all you need to know about JavaScript
              from the ground to the top.
              <br />
              <br />
              When published, the video version will be live on my{" "}
              <a href={LINKS.youtube}>YouTube channel @deeecode</a> and the
              written parts here.
            </p>
          </Bio>
        </div>
      </Container>
    </Layout>
  )
}

export default JavaScriptCoursePage

export const Head = () => (
  <Seo
    description="Learn JavaScript in this simplified course"
    imageCard={COURSE_COVER}
    title="JavaScript Simplified for Beginners Course"
  />
)

export const pageQuery = graphql`
  {
    allMdx(
      sort: { fields: { orderId: ASC } }
      filter: { fields: { slug: { regex: "//courses/javascript/" } } }
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
