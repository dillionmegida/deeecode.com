import * as React from "react"

import Seo from "../../components/seo"
import { LINKS } from "../../constants"
import CourseMainPage from "../../templates/course-main-page"

const COURSE_COVER = "/courses/git-course-cover.png"

const GitCoursePage = ({ location, data }) => {
  return (
    <CourseMainPage
      location={location}
      course={{
        type: "git",
        title: "Git Simplified for Beginners Course",
        cover: COURSE_COVER,
        text: `<p>
        I'm currently working 
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

export default GitCoursePage

export const Head = () => (
  <Seo
    description="Learn JavaScript in this simplified course"
    imageCard={COURSE_COVER}
    title="JavaScript Simplified for Beginners Course"
  />
)
