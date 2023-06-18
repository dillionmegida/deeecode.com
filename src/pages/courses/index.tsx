import React from "react"
import Layout from "../../components/layout"
import { Link } from "gatsby"
import styled from "styled-components"
import Seo from "../../components/seo"
import { LINKS } from "../../constants"

const Container = styled.div`
  font-size: 20px;
`

const COURSES = [
  {
    label: "Regular Expressions Simplified",
    path: LINKS.courses.regex.path
  },
  {
    label: "JavaScript Simplified for Beginners",
    path: LINKS.courses.javascript.path
  },
]

export default function Courses({ location }) {
  return (
    <Layout location={location}>
      <Container>
        <h1>Courses</h1>
        <p>
          Here are all the courses I've created to help you understand the web
          better.
        </p>
        <ul>
          {COURSES.map(({ label, path }) => (
            <li>
              <Link to={path}>{label}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  )
}

export const Head = () => <Seo title="Courses" />
