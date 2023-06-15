import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"

const Container = styled.div`
  color: white;
`

const Cover = styled.div`
  width: 100%;

  img {
    width: 100%;
  }
`

const Bio = styled.div`
  font-size: 20px;
  margin-bottom: var(--spacing-16);

  a {
    color: var(--color-primary-light);
  }
`

const IndexPage = () => {
  return (
    <Layout title="Deeecode The Web">
      <Container>
        <Cover className="cover">
          <img src="/banner.png" alt="Deeecode cover" />
        </Cover>
        <Bio>
          <p>
            Simplifying the web, one video at a time. Check out my{" "}
            <a href="https://youtube.com/@deeecode">
              YouTube channel @deeecode
            </a>{" "}
            for videos I've made on JavaScript, React, CSS, and other languages.
          </p>
          <p>
            Check out my{" "}
            <Link to="/courses/regex">
              Simplified Regular Expressions Course
            </Link>
          </p>
          <p>
            Owned, by Dillion. Check me out on{" "}
            <a href={`https://twitter.com/iamdillion`}>Twitter @iamdillion</a>
          </p>
        </Bio>
      </Container>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <Seo title="Simplify The Web" />
