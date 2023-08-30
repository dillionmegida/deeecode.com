import React from "react"
import { Script } from "gatsby"
import styled from "styled-components"
import Seo from "../components/seo"
import Layout from "../components/layout"
import NewTabLink from "../components/new-tab-link"

const Container = styled.div<{ theme: any }>`
  .codepen {
    margin-bottom: 30px;

    .info-block {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #eceaea;

      .codepen-title,
      .video-link {
        padding: 5px 10px;
      }

      .codepen-title {
        font-size: 16px;
        margin: 0;
        color: black;
        font-weight: bold;
      }

      .video-link a {
        display: block;
        border-radius: 5px;
        font-size: 15px;
        padding: 3px 6px;
        background-color: black;
        color: white;
        text-decoration: none;

        &:hover {
          color: yellow;
        }
      }
    }

    iframe {
      width: 100%;
    }
  }
`

const PROJECTS = [
  {
    id: "GRwaNVK",
    title: "Apple Dock Animation",
    video: "https://youtu.be/AERByfmKMok",
  },
  { id: "gOZrQga", title: "Input Error Shake", video: "" },
  { id: "yLGORPJ", title: "Label Input Animations", video: "" },
]

function CodepenEmbed() {
  return (
    <>
      {PROJECTS.map(p => (
        <div className="codepen">
          <div className="info-block">
            <h2 className="codepen-title">{p.title}</h2>
            {p.video && (
              <span className="video-link">
                <NewTabLink href={p.video}>Tutorial</NewTabLink>
              </span>
            )}
          </div>
          <iframe
            height="300"
            scrolling="no"
            src={`https://codepen.io/Dillion/embed/preview/${p.id}?default-tab=result&editable=true`}
            frameBorder="no"
            loading="lazy"
            allowTransparency={true}
            allowFullScreen={true}
          ></iframe>
        </div>
      ))}
      <Script src="https://cpwebassets.codepen.io/assets/embed/ei.js"></Script>
    </>
  )
}

export default function CSSProjects({ location }) {
  return (
    <Layout location={location}>
      <Container className="container-md">
        <h1>Mini CSS Projects</h1>
        <p>
          Here are some fun projects, which includes different CSS Tips you can
          apply in your code.
          <br />
          You can also watch the "Tutorial" videos.
        </p>
        <CodepenEmbed />
      </Container>
    </Layout>
  )
}

export const Head = () => (
  <Seo imageCard="/css-projects-cover.png" title="Fun Mini CSS Projects" />
)
