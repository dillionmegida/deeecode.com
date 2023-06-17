import * as React from "react"
import styled from "styled-components"
import Nav from "./nav"

type Theme = {
  bg: string
}

const Wrapper = styled.div<{ theme: Theme }>`
  background-color: var(${({ theme }) => theme.bg});
  margin: var(--spacing-0) auto;
  width: 100%;
  min-height: 100vh;
  color: white;

  @media (min-width: 800px) {
    padding-top: var(--spacing-10);
  }

  .container,
  footer {
    padding: var(--spacing-5) var(--spacing-5);
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
  theme?: Theme
}

const Layout = ({
  location,
  children,
  theme = { bg: "--color-dark-regular" },
}: Props) => {
  return (
    <Wrapper className="global-wrapper" theme={theme}>
      <Container>
        <header className="global-header">
          <Nav location={location} />
          {/* <Link className="header-link-home" to="/">
          <h1>{title}</h1>
        </Link> */}
        </header>
        <main className="main">{children}</main>
        <footer>© {new Date().getFullYear()}</footer>
      </Container>
    </Wrapper>
  )
}

export default Layout
