import React from "react"
import { Script } from "gatsby"
import styled from "styled-components"
import Seo from "../components/seo"
import Layout from "../components/layout"
import NewTabLink from "../components/new-tab-link"
import LinkIcon from "../components/Icon/Link"

const Container = styled.div<{ theme: any }>`
  .codepen {
    margin-bottom: 30px;
    padding: 20px 0;

    .info-block {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #eceaea;

      .codepen-title {
        padding: 5px 10px;
      }

      .codepen-title {
        font-size: 16px;
        margin: 0;
        color: black;
        font-weight: bold;
      }

      .video-link a {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 15px;
        padding: 10px 20px;
        background-color: black;
        color: white;
        text-decoration: none;
        border: 2px solid white;

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

const DEMOS = [
  {
    id: "GRwaNVK",
    title: "Apple Dock Animation",
    video: "https://youtu.be/AERByfmKMok",
  },
  {
    id: "mdaEryr",
    title: "Question Flip Flashcard",
  },
  {
    id: "GRPpdod",
    title: "Animated Switcher/Toggler",
    video: "https://youtu.be/nDJMpHByUZE",
  },
  {
    id: "vYvKgMN",
    title: "Image Zoom Animation",
    video: "https://www.tiktok.com/@iamdillion/video/7274274594209434886"
  },
  {
    id: "gOZrQga",
    title: "Input Error Shake",
  },
  { id: "yLGORPJ", title: "Label Input Animations", video: "https://www.tiktok.com/@iamdillion/video/7273507094643461382" },
  { id: "wvRojMW", title: "Loading Circle Animation", video: "https://www.tiktok.com/@iamdillion/video/7275760017997892870" },
  { id: "xxmgZRa", title: "CSS Filter Samples", video: "" },
  { id: "yLGgpeM", title: "Image With Text Animation", video: "" },
  { id: "wvRgpOJ", title: "Submit Button Check Animation", video: "" },
]

function CodepenEmbed() {
  return (
    <>
      {DEMOS.map(p => (
        <div id={`codepen-${p.id}`} className="codepen">
          <div className="info-block">
            <h2 className="codepen-title">{p.title}</h2>
            {p.video && (
              <span className="video-link">
                <NewTabLink href={p.video}>
                  <LinkIcon color="white" /> Tutorial
                </NewTabLink>
              </span>
            )}
          </div>
          <iframe
            height="450"
            scrolling="no"
            src={`https://codepen.io/Dillion/embed/${p.id}?default-tab=result&editable=true`}
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

export default function CSSDemos({ location }) {
  return (
    <Layout location={location}>
      <Container className="container-md">
        <h1>CSS Demos</h1>
        <p>
          Here are some fun demos, which includes different CSS Tips you can
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
  <Seo imageCard="/css-demos-cover.png" title="Fun CSS Demos" />
)
