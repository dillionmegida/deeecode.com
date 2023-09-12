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
    path: LINKS.courses,
  },
  {
    label: "Articles",
    path: LINKS.articles,
  },
]

const Block = styled.nav<{ pageType: string }>`
  background-color: var(--color-${({ pageType }) => pageType}-dark-2);
  width: 100%;

  .nav-list,
  .nav {
    padding: 0;
    list-style-type: none;
  }

  .nav-list {
    display: flex;
    justify-content: space-between;
    width: 100%;

    &.container-md {
      padding: 0;
    }
  }

  .rest {
    display: flex;
    justify-content: flex-end;
  }

  .nav {
    margin: 0;
    /* flex: 1;
    width: 100%; */

    a {
      color: white;
      text-decoration: none;
      flex: 1;
      width: 100%;
      display: inline-block;
      padding: 20px;
      text-align: center;

      &.active-link,
      &:hover {
        background-color: var(--color-${({ pageType }) => pageType}-dark-3);
        transition: background-color 300ms;
        text-decoration: none;
        font-weight: 800;
      }
    }
  }
`

export default function Nav({ location, pageType = "regular" }) {
  //   const pageType = location?.pathname?.startsWith("/courses/regex")
  //     ? "regex"
  //     : location?.pathname?.startsWith("/courses/javascript")
  //     ? "javascript"
  //     : "regular"

  return (
    <Block pageType={pageType}>
      <nav>
        <ul className="nav-list container-md">
          <li className="nav">
            <Link activeClassName="active-link" to={NAV_LINKS[0].path}>
              {NAV_LINKS[0].label}
            </Link>
          </li>
          <div className="rest">
            {NAV_LINKS.slice(1).map(({ label, path }) => (
              <li className="nav">
                <Link activeClassName="active-link" to={path}>
                  {label}
                </Link>
              </li>
            ))}
          </div>
        </ul>
      </nav>
    </Block>
  )
}
