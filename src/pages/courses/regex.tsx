import * as React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import styled from "styled-components"

const Container = styled.div`
  color: white;
`

const Cover = styled.div`
  width: 100%;
  margin-bottom: var(--spacing-10);
  border: 1px solid #8f8f8f;

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

const IndexPage = () => {
  return (
    <Layout title="Regular Expressions Simplified Course">
      <Container>
        <Cover className="cover">
          <img src="/courses/regex-course-cover.png" alt="Deeecode cover" />
        </Cover>
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

export default IndexPage

export const Head = () => <Seo title="Simplified Regular Expressions Course" />
