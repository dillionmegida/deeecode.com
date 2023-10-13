import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"
import AnchorLink from "../components/anchor-link"
import { LINKS } from "../constants"
import HomeLanding from "../components/landing"

const Container = styled.div`
  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  a {
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.4);
    font-weight: 800;
    font-size: 20px;
    line-height: 20px;
    --default-color: var(--color-regular);
  }

  .links,
  .social-links {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  .links {
    margin: 40px 0;

    a {
      font-size: 25px;
      line-height: 25px;
    }

    .yt-link {
      --default-color: yellow;
    }
  }

  .social-links {
    margin: 100px 0;
    p {
      margin: 0;
      width: 100%;
      text-align: center;
    }
  }
`

const Bio = styled.div`
  font-size: 20px;
  margin-bottom: var(--spacing-16);
`

const IndexPage = ({ location }) => {
  return (
    <Layout location={location} theme="regular">
      <Container>
        <HomeLanding />

        <div className="container-md">
          <div className="links">
            <AnchorLink
              iconSize={25}
              className="yt-link"
              newTab
              link={LINKS.youtube}
            >
              deeecode
            </AnchorLink>
            <AnchorLink iconSize={25} link={LINKS.cssDemos}>
              ✨ CSS Demos
            </AnchorLink>
            <AnchorLink iconSize={25} link={LINKS.regexCourse}>
              🧑🏽‍💻 Regex Course
            </AnchorLink>
          </div>
          <div className="social-links">
            <p>You can also find me on</p>
            <AnchorLink
              iconSize={15}
              className="yt-link"
              newTab
              link={LINKS.tiktok}
            >
              iamdillion
            </AnchorLink>
            <AnchorLink newTab iconSize={15} link={LINKS.instagram}>
              deeecode
            </AnchorLink>
            <AnchorLink newTab iconSize={15} link={LINKS.twitter}>
              iamdillion
            </AnchorLink>
          </div>
          <div className="social-links">
            <AnchorLink
              iconSize={200}
              className="yt-link"
              newTab
              link={LINKS.buymeacoffee}
            >
              {/* buymeacoffee */}
            </AnchorLink>
            
          </div>
          <Bio>
            {/* <p>
              Simplifying the web, one video at a time. Videos on JavaScript,
              React, CSS, and other languages.
            </p>
            <p>
              Check out my{" "}
              <Link to="/courses/regex">
                Simplified Regular Expressions Course
              </Link>
            </p> */}
          </Bio>
        </div>
      </Container>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <Seo title="Simplify The Web" />
