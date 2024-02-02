import React from "react"
import styled from "styled-components"

const Container = styled.div`
  background-color: color-mix(in srgb, var(--color-regular), transparent 70%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px ;
  min-height: 50vh;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  clip-path: polygon(0 0, 100% 0, 100% 89%, 0% 100%);

  &::after {
    content: "";
    position: absolute;
    filter: grayscale(100%) opacity(0.1);
    scale: 1.4;
    z-index: -1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /* background-color: #e5e5f7; */
    opacity: 0.8;
    background: radial-gradient(
        circle,
        transparent 20%,
        #e5e5f7 20%,
        #e5e5f7 80%,
        transparent 80%,
        transparent
      ),
      radial-gradient(
          circle,
          transparent 20%,
          #e5e5f7 20%,
          #e5e5f7 80%,
          transparent 80%,
          transparent
        )
        25px 25px,
      linear-gradient(#444cf7 2px, transparent 2px) 0 -1px,
      linear-gradient(90deg, #444cf7 2px, #e5e5f7 2px) -1px 0;
    background-size: 50px 50px, 50px 50px, 25px 25px, 25px 25px;
  }

  h1 {
    font-size: clamp(2rem, 10vw, 5rem);
    font-weight: 800;
    font-family: Raleway;
    text-align: center;
    margin: 20px;

    .simplify-text {
      color: yellow;
      position: relative;

      &::after,
      &::before {
        content: "✨";
        position: absolute;
        font-size: 20px;
      }

      &::before {
        left: 0px;
        top: -5px;
      }

      &::after {
        top: -10px;
        right: 0px;
      }
    }
  }

  .short-text {
    text-align: center;
    max-width: 500px;
    font-size: clamp(1rem, 7vw, 1.8rem);
    line-height: 1.3;
    width: 100%;
    margin: 20px auto 50px;

    .highlight {
      background-color: yellow;
      color: var(--color-text);
      border-radius: 2px;
      font-weight: bold;
      padding: 4px 8px;
      /* background-color: / */
    }
  }

  .arrow-down {
    margin: 100px auto 0;
    max-width: 40px;
    /* position: absolute; */
    left: 0;
    position: relative;
    top: 100px;
    right: 0;
    width: 100%;
  }

  .languages {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 20px;

    img {
      width: 50px;

      &:nth-child(1) {
        --top: 50px;
      }
      &:nth-child(2) {
        --top: 50px;
        --right: 20px;
      }
    }
  }
`

const LANGUAGES = [
  {
    name: "javascript",
    image: "/logos/js.png",
  },
  {
    name: "react",
    image: "/logos/react.png",
  },
  {
    name: "git",
    image: "/logos/git.png",
  },
  {
    name: "typescript",
    image: "/logos/ts.png",
  },
  {
    name: "css",
    image: "/logos/css.png",
  },
  {
    name: "html",
    image: "/logos/html.png",
  },
  {
    name: "node",
    image: "/logos/node.png",
  },
]

export default function HomeLanding() {
  return (
    <Container>
      <div className="page-cover container">
        <h1>
          <span className="simplify-text">Simplify</span> the Web
        </h1>
        <p className="short-text">
          {/* My goal is to break down topics, languages and concepts related to the
          web in the simplest way possible, through articles and videos 😄 */}
          I create <span className="highlight">simplified</span> resources on
          web and software development 😄
        </p>
        {/* <img src="/icons/arrow-down.svg" className="arrow-down" /> */}
        {/* <div className="languages">
          {LANGUAGES.map(l => {
            return <img src={l.image} alt={l.name} />
          })}
        </div> */}
        {/* <img src="/banner.png" alt="Deeecode cover" /> */}
      </div>
    </Container>
  )
}
