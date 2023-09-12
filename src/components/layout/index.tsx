import * as React from "react"
import styled from "styled-components"
import Nav from "./nav"
import NewTabLink from "../new-tab-link"
import AnchorLink from "../anchor-link"
import { LINKS } from "../../constants"

type Theme = {
  bg: string
  headerBg: string
}

const Wrapper = styled.div<{ theme: Theme }>`
  background-color: var(${({ theme }) => theme.bg});
  margin: var(--spacing-0) auto;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 50px;
  color: white;

  .container,
  footer {
    /* padding: var(--spacing-5) 0; */
    max-width: 1000px;
    margin: 0 auto;
  }

  footer {
    text-align: right;

    a {
      color: var(${({ theme }) => theme.link});
      padding: 5px 10px;
      top: 4px;
      font-weight: 800;
    }
  }

  .container-md {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--spacing-5);
  }

  .header {
    text-transform: uppercase;
    display: flex;
    align-items: center;
    position: relative;
    background-color: var(${({ theme }) => theme.headerBg});
  }
`

const Container = styled.div`
  width: 100%;
  margin: 0 auto;

  .main {
    padding-bottom: 50px;
    min-height: 500px;
  }
`

type Props = {
  location: Location
  children: React.ReactNode
  theme?: "regular" | "regex" | "javascript"
}

const Layout = ({ location, children, theme = "regular" }: Props) => {
  const themeObj = {
    bg: `--color-${theme}-dark`,
    headerBg: `--color-${theme}-dark-2`,
    link: `--color-${theme}-light`,
  }

  return (
    <Wrapper theme={themeObj}>
      <Container>
        <header className="header">
          <Nav pageType={theme} location={location} />
          {/* <Link className="header-link-home" to="/">
          <h1>{title}</h1>
        </Link> */}
        </header>
        <main className="main">{children}</main>
        <footer className="container-md">
          Managed by{" "}
          <AnchorLink newTab link={LINKS.twitter}>
            @iamdillion
          </AnchorLink>
          &nbsp;&nbsp;|&nbsp;&nbsp; © {new Date().getFullYear()}
        </footer>
      </Container>
    </Wrapper>
  )
}

export default Layout
