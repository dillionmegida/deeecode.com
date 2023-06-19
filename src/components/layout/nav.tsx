import React from "react"
import { Link } from "gatsby"

import styled from "styled-components"
import { LINKS } from "../../constants"

const NAV_LINKS = [
  {
    label: "Deeecode",
    path: "/",
  },
  {
    label: "Courses",
    path: LINKS.courses.path,
  },
  {
    label: "Articles",
    path: LINKS.articles,
  },
]

const Block = styled.nav<{ pageType: string }>`
  background-color: var(--color-${({ pageType }) => pageType}-dark-2);

  ul,
  li {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  ul {
    display: flex;
    justify-content: space-around;
  }

  li {
    flex: 1;
    width: 100%;

    a {
      color: white;
      text-decoration: none;
      flex: 1;
      width: 100%;
      display: inline-block;
      padding: 20px 15px;
      text-align: center;

      &.active-link,
      &:hover {
        background-color: var(--color-${({ pageType }) => pageType}-dark-3);
        transition: background-color 300ms;
        text-decoration: none;

        &:not(:hover) {
          font-weight: 800;
        }
      }
    }
  }
`

export default function Nav({ location }) {
  const pageType = location?.pathname?.startsWith("/courses/regex")
    ? "regex"
    : location?.pathname?.startsWith("/courses/javascript")
    ? "javascript"
    : "regular"

  return (
    <Block pageType={pageType}>
      <ul>
        {NAV_LINKS.map(({ label, path }) => (
          <li>
            <Link activeClassName="active-link" to={path}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </Block>
  )
}
