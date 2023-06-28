import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"

const Container = styled.div`
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
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
    font-weight: 800;
  }
`

const IndexPage = ({ location }) => {
  return (
    <Layout location={location} theme="regular">
      <Container>
        <Cover className="page-cover">
          <img src="/banner.png" alt="Deeecode cover" />
        </Cover>
        <div className="container">
          <h1>Simplify the Web</h1>
          <Bio>
            <p>
              Simplifying the web, one video at a time. Check out my{" "}
              <a href="https://youtube.com/@deeecode">
                YouTube channel @deeecode
              </a>{" "}
              for videos I've made on JavaScript, React, CSS, and other
              languages.
            </p>
            <p>
              Check out my{" "}
              <Link to="/courses/regex">
                Simplified Regular Expressions Course
              </Link>
            </p>
            <p>
              Managed, by Dillion. Check me out on{" "}
              <a href={`https://twitter.com/iamdillion`}>Twitter @iamdillion</a>
            </p>
          </Bio>
        </div>
      </Container>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <Seo title="Simplify The Web" />
