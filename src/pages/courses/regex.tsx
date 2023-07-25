import * as React from "react"
import { graphql } from "gatsby"

import Seo from "../../components/seo"
import CourseMainPage from "../../templates/course-main-page"

const COURSE_COVER = "/courses/regex-course-cover.png"

const RegexCoursePage = ({ location, data }) => {
  return (
    <CourseMainPage
      location={location}
      course={{
        cover: COURSE_COVER,
        type: "regex",
        title: "simpleregex.com",
        text: `<p>
        Here's my free course on Simplified Regular Expressions. In this
        course, I teach you how to interpret and understand regular
        expressions, so you can create patterns for your different needs.
        <br />
        <br />
        The video version is live on my 
        <a href="https://www.youtube.com/playlist?list=PLLdz3KlabJv1UVT8cZ-h4iI7fRqC_rArb">
          YouTube channel @deeecode
        </a>
        and you can find the written parts on <a href="https://simpleregex.com">simpleregex.com</a>.
      </p>`,
      }}
    />
  )
}

export default RegexCoursePage

export const Head = () => (
  <Seo
    description="Learn regular expressions in this simplified course"
    imageCard={COURSE_COVER}
    title="Simplified Regular Expressions Course"
  />
)
