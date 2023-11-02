import React, { useEffect, useRef } from "react"
import { LINKS } from "../constants"
import styled from "styled-components"
import Seo from "../components/seo"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #5865f2;
`

export default function Discord() {
  const linkRef = useRef(null) as any
  useEffect(() => {
    if (linkRef.current) linkRef.current.click()
  }, [])

  return (
    <Container>
      <a ref={linkRef} rel="noopener noreferrer" href={LINKS.discord}></a>
    </Container>
  )
}

export const Head = () => (
    <Seo imageCard="/discord-cover.png" title="Join my Discord Server!" />
  )