import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const Container = styled.div`
  margin-bottom: var(--spacing-16);
  color: white;
  font-size: 20px;

  a {
    color: var(--color-primary-light);
  }
`

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <Container>
      {author?.name && (
        <p>
          Simplifying the web, one video at a time. Check out my{" "}
          <a href="https://youtube.com/@deeecode">YouTube channel @deeecode</a>{" "}
          for videos I've made on JavaScript, React, CSS, and other languages.
        </p>
      )}
      <br />
      {social && (
        <p>
          Owned, by Dillion. Check me out on{" "}
          <a href={`https://twitter.com/${social.twitter}`}>
            Twitter @{social.twitter}
          </a>
        </p>
      )}
    </Container>
  )
}

export default Bio
