import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

const Container = styled.div`
  margin: 20px var(--spacing-5);
  font-size: 18px;
  display: flex;
  justify-content: space-between;

  &.just-next {
    justify-content: flex-end;
  }

  .prev,
  .next {
    margin-bottom: 10px;
    max-width: 300px;
    line-height: 20px;

    a {
      display: flex;
    }
  }

  .prev {
    justify-self: flex-start;
    text-align: left;
    .icon {
      margin-right: 10px;
    }
  }

  .next {
    justify-self: flex-end;
    text-align: right;

    .icon {
      margin-left: 10px;
    }
  }
`

export default function CourseNav({ prevCourse, nextCourse }) {
  return (
    <Container className={`${prevCourse ? "" : "just-next"}`}>
      {prevCourse && (
        <div className="prev">
          <Link to={prevCourse.fields.slug}>
            <span className="icon">&lt;</span>
            {prevCourse.frontmatter.title}
          </Link>
        </div>
      )}
      {nextCourse && (
        <div className="next">
          <Link to={nextCourse.fields.slug}>
            {nextCourse.frontmatter.title} <span className="icon">&gt;</span>
          </Link>
        </div>
      )}
    </Container>
  )
}
