import { Link } from "gatsby"
import React from "react"

export default function CourseNav({ prevCourse, nextCourse }) {
  return (
    <div className={`course-nav ${prevCourse ? "" : "course-nav--just-next"}`}>
      {prevCourse && (
        <div className="course-nav--prev">
          <Link to={prevCourse.fields.slug}>
            &lt; {prevCourse.frontmatter.title}
          </Link>
        </div>
      )}
      {nextCourse && (
        <div className="course-nav--next">
          <Link to={nextCourse.fields.slug}>
            {nextCourse.frontmatter.title} &gt;
          </Link>
        </div>
      )}
    </div>
  )
}
