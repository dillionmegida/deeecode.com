import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Container = styled.div`
  .global-header {
    margin-bottom: var(--spacing-4);
    text-transform: uppercase;
  }
`

const Layout = ({ title, children }) => {
  return (
    <Container className="global-wrapper">
      <header className="global-header">
        <Link className="header-link-home" to="/">
          <h1>{title}</h1>
        </Link>
      </header>
      <main>{children}</main>
      <footer>© {new Date().getFullYear()}</footer>
    </Container>
  )
}

export default Layout
