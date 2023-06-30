import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

const Aside = styled.div`
  overflow-y: auto;
  --border-color: var(--color-regex-dark-2);
  border: 1px solid var(--border-color);
  width: 200px;
  font-size: 16px;
  padding: 80px 0;
  height: 100%;

  ol {
    /* padding: 0; */
    padding: 0;
    width: 100%;
  }

  .links-list,
  .link-item {
    /* padding-left: 50px; */
    width: 100%;
    padding: 0;
    margin: 0;

    a {
      line-height: 20px;
      display: block;
      padding: 15px 20px;
      color: white;
      width: 100%;
      text-align: left;

      &:hover,
      &.active {
        text-decoration: none;
        background-color: var(--color-regex-dark-2);
      }
    }
  }

  .link-item:not(:last-child) a {
    border-bottom: 1px solid var(--border-color);
  }
`

export default function SideBar({ links = [] }) {
  return (
    <Aside>
      <ol className="links-list">
        {links.map(({ label, href }) => (
          <li className="link-item" key={label}>
            <Link activeClassName="active" to={href}>
              {label}
            </Link>
          </li>
        ))}
      </ol>
    </Aside>
  )
}
