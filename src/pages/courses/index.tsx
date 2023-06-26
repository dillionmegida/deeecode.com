import React from "react"
import Layout from "../../components/layout"
import { Link } from "gatsby"
import styled from "styled-components"
import Seo from "../../components/seo"
import { LINKS } from "../../constants"

const Container = styled.div`
  font-size: 20px;

  .courses-list {
    display: grid;
    --columns: 2;
    grid-template-columns: repeat(var(--columns), 1fr);
    grid-gap: 20px;
  }
`

const CourseBlock = styled.li<{ linkClass }>`
  a {
    color: white;
    border: 1px solid transparent;
    display: block;
    padding-bottom: 15px;

    &:hover {
      border-color: var(${({ linkClass }) => linkClass});
      text-decoration: none;
    }
  }

  .course-cover {
    width: 100%;

    img {
      width: 100%;
    }
  }

  .course-title {
    display: block;
    margin-top: 10px;
    margin-left: 10px;
    font-size: 16px;
  }
`

const COURSES = [
  {
    label: "Regular Expressions Simplified",
    path: LINKS.courses.regex.path,
    cover: "/regex/regex-course-cover.png",
    linkClass: "--color-regex",
  },
  {
    label: "JavaScript Simplified for Beginners",
    path: LINKS.courses.javascript.path,
    cover: "/javascript/js-course-cover.png",
    linkClass: "--color-javascript",
  },
]

export default function Courses({ location }) {
  return (
    <Layout location={location}>
      <Container className="container">
        <h1>Courses</h1>
        <p>
          Here are all the courses I've created to help you understand the web
          better.
        </p>
        <ul className="courses-list">
          {COURSES.map(({ label, path, cover, linkClass }) => (
            <CourseBlock linkClass={linkClass}>
              <Link to={path}>
                <div className="course-cover">
                  <img src={`/courses${cover}`} alt={label} />
                </div>
                <span className="course-title">{label}</span>
              </Link>
            </CourseBlock>
          ))}
        </ul>
      </Container>
    </Layout>
  )
}

export const Head = () => <Seo title="Courses" />
