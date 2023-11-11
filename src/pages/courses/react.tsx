import * as React from "react"
import { graphql } from "gatsby"

import Seo from "../../components/seo"
import CourseMainPage from "../../templates/course-main-page"
import { LINKS } from "../../constants"

const COURSE_COVER = "/courses/react-course-cover.png"

const ReactCoursePage = ({ location, data }) => {
  return (
    <CourseMainPage
      location={location}
      course={{
        cover: COURSE_COVER,
        type: "react",
        title: "simplereactjs.com",
        link: "https://simplereactjs.com",
        text: `<p>
        Here's my free course on <b>Simplified ReactJS</b>. In this
        course, I do not only teach you how to build applications with React,
        but also help you understand the fundamentals and inner workings of React.
        <br />
        <br />
        The video version is live on my 
        <a href="${LINKS.reactYouTubePlaylist}">
          YouTube channel @deeecode
        </a>
        .
      </p>`,
      }}
    />
  )
}

export default ReactCoursePage

export const Head = () => (
  <Seo
    description="Learn regular expressions in this simplified course"
    imageCard={COURSE_COVER}
    title="Simplified Regular Expressions Course"
  />
)
