import React from "react"
import styled from "styled-components"
import NewTabLink from "../new-tab-link"

const Container = styled.div`
  .share-btn,
  .share-link {
    padding: 15px 25px;
    border: 1px solid var(--color-regex-dark-2);
    border-radius: 2px;
    color: white;
    transition: border-color 300ms;

    &:hover {
      border-color: white;
      text-decoration: none;
    }
  }

  .share-btn {
    background: none;
  }

  .share-link {
    display: inline-block;
  }
`

const checkGlobal = () => typeof window !== `undefined`

const checkNativeShare = () => checkGlobal() && navigator.share

const nativeShare = (url: string, title: string) => {
  navigator
    .share({
      title,
      url,
      text: `${title} by @iamdillion`,
    })
    .then(() => {
      console.log("Successful shared article.")
    })
    .catch(err => console.log("Couldn't share article because ", err))
}

export default function Share({ url, title }) {
  return (
    <Container>
      {checkNativeShare() !== undefined ? (
        <button
          className="share-btn"
          title="Share article via your applications"
          onClick={() => nativeShare(url, title)}
        >
          Share 🔗
        </button>
      ) : (
        <NewTabLink
          className="share-link"
          href={`https://twitter.com/intent/tweet?text=${title} by @iamdillion - ${url}`}
        >
          <span>Share on Twitter</span>
        </NewTabLink>
      )}
    </Container>
  )
}
