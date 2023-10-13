import React from "react"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import { SERIES } from "../constants"
import styled from "styled-components"

const Container = styled.div`
  color: white;

  &.container {
    max-width: 800px;
    margin: 0 auto;
  }
`

export default function Series({ data }) {
  const { allSeries } = data

  console.log(allSeries)

  return (
    <Layout>
      <Container className="container-md">
        <h1>All series</h1>
        {allSeries.group.map(({ fieldValue: seriesId }) => {
          console.log(seriesId)
          return (
            <div>
              <Link to={`/series/${seriesId}`}>{SERIES[seriesId]?.title}</Link>
            </div>
          )
        })}
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  {
    allSeries: allMdx {
      group(field: { frontmatter: { series: SELECT } }) {
        fieldValue
      }
    }
  }
`
