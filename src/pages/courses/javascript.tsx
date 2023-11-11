import * as React from "react"

import Seo from "../../components/seo"
import { LINKS } from "../../constants"
import CourseMainPage from "../../templates/course-main-page"

const COURSE_COVER = "/courses/js-course-cover.png"

const JavaScriptCoursePage = ({ location, data }) => {
  return (
    <CourseMainPage
      location={location}
      course={{
        type: "javascript",
        title: "JavaScript Simplified for Beginners Course",
        cover: COURSE_COVER,
        link: "#",
        text: `<p>
        Here's a course I'm working on--JavaScript for Beginners. In this
        course, I will teach you all you need to know about JavaScript
        from the ground to the top.
        <br />
        <br />
        When published, the video version will be live on my
        <a href="${LINKS.youtube}">YouTube channel @deeecode</a> and the
        written parts here.
      </p>`,
      }}
    />
  )
}

export default JavaScriptCoursePage

export const Head = () => (
  <Seo
    description="Learn JavaScript in this simplified course"
    imageCard={COURSE_COVER}
    title="JavaScript Simplified for Beginners Course"
  />
)
