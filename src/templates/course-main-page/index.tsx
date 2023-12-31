import React from "react"
import styled from "styled-components"
import Layout from "../../components/layout"
import { Link } from "gatsby"
import { NewTabLink } from "../../components/anchor-link"

const Container = styled.div<{ type }>`
  font-size: 20px;
  color: white;
  /* min-height: 100%; */

  .container {
    padding-top: 0;
  }

  a {
    color: var(--color-${({ type }) => type}-light);
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }

  b {
    font-weight: bold;
  }

  h1 a {
    text-decoration: underline;
  }
`

const Cover = styled.div`
  width: 100%;
  margin-bottom: var(--spacing-10);

  img {
    width: 100%;
    height: auto;
  }

  &.container-md {
    padding-top: 0;
  }
`

const Outline = styled.div`
  ol {
    padding-left: 20px;
  }

  li {
    list-style-type: decimal;
    padding-left: 5px;
  }
`

const Bio = styled.div`
  margin-bottom: var(--spacing-16);
`

export default function CourseMainPage({ location, course }) {
  const { cover, type, title, text, link } = course

  return (
    <Layout location={location} theme={type}>
      <Container type={type}>
        <Cover className="cover container-md">
          <img src={cover} alt="Course cover" />
        </Cover>
        <div className="container-md">
          <h1>
            <NewTabLink link={link}>{title}</NewTabLink>
          </h1>
          <Bio dangerouslySetInnerHTML={{ __html: text }}></Bio>
          {/* {courses.length > 0 && (
            <Outline>
              <h2>Outline</h2>
              <ol start={0}>
                {courses.map(course => {
                  const {
                    frontmatter: { title },
                    fields: { slug },
                  } = course

                  return (
                    <li>
                      <Link to={slug}>{title}</Link>
                    </li>
                  )
                })}
              </ol>
            </Outline>
          )} */}
        </div>
      </Container>
    </Layout>
  )
}
