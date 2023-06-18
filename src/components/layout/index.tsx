import * as React from "react"
import styled from "styled-components"
import Nav from "./nav"
import NewTabLink from "../new-tab-link"

type Theme = {
  bg: string
}

const Wrapper = styled.div<{ theme: Theme }>`
  background-color: var(${({ theme }) => theme.bg});
  margin: var(--spacing-0) auto;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 50px;
  color: white;

  @media (min-width: 800px) {
    padding-top: var(--spacing-10);
  }

  .container,
  footer {
    padding: var(--spacing-5) var(--spacing-5);
  }

  footer {
    a {
      color: var(${({ theme }) => theme.link});
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .global-header {
    text-transform: uppercase;
  }
`

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`

type Props = {
  location: Location
  children: React.ReactNode
  theme?: "regular" | "regex" | "javascript"
}

const Layout = ({ location, children, theme = "regular" }: Props) => {
  const themeObj = {
    bg: `--color-${theme}-dark`,
    link: `--color-${theme}`,
  }

  return (
    <Wrapper className="global-wrapper" theme={themeObj}>
      <Container>
        <header className="global-header">
          <Nav location={location} />
          {/* <Link className="header-link-home" to="/">
          <h1>{title}</h1>
        </Link> */}
        </header>
        <main className="main">{children}</main>
        <footer>
          Managed by{" "}
          <NewTabLink href="https://twitter.com/iamdillion">Dillion</NewTabLink>{" "}
          &nbsp;&nbsp;|&nbsp;&nbsp; © {new Date().getFullYear()}
        </footer>
      </Container>
    </Wrapper>
  )
}

export default Layout
