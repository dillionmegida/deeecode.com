import * as React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import styled from "styled-components"

const COURSE_COVER = "/courses/regex-course-cover.png"

const Container = styled.div`
  color: white;
`

const Cover = styled.div`
  width: 100%;
  margin-bottom: var(--spacing-10);

  img {
    width: 100%;
  }
`

const Bio = styled.div`
  font-size: 20px;
  margin-bottom: var(--spacing-16);

  a {
    color: var(--color-regex-course);
  }
`

const RegexCoursePage = ({ location }) => {
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
      </Container>
    </Layout>
  )
}

export default RegexCoursePage

export const Head = () => (
  <Seo imageCard={COURSE_COVER} title="Simplified Regular Expressions Course" />
)
