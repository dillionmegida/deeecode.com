import { Link } from "gatsby"
import React from "react"
import Children from "react-children-utilities"
import styled from "styled-components"

const Block = styled.div`
  /* margin-left: -30px; */

  a {
    /* margin-right: 10px; */
    font-size: 20px;
    visibility: hidden;
    position: relative;
    bottom: -15px;

    &:hover {
      visibility: visible;
    }
  }

  h2,
  h3 {
    /* display: inline-block; */
  }

  &:hover a {
    visibility: visible;
  }
`

function getAnchor(text) {
  return text.toLowerCase().replace(/\s/g, "-")
}

export default function HeadingLink({ Tag, children }) {
  const textContent = Children.onlyText(children)
  const anchor = getAnchor(textContent)

  return (
    <Block>
      <Link to={`#${anchor}`}>🔗</Link>
      <Tag id={anchor}>{children}</Tag>
    </Block>
  )
}
