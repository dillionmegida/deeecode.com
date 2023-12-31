const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { LINKS } = require("./src/constants")

const articlePageTemplate = path.resolve(`./src/templates/article-page.tsx`)
const seriesPageTemplate = path.resolve(`./src/templates/series-page.tsx`)
// const coursePageTemplate = path.resolve("./src/templates/course-page/index.tsx")

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode })
    if (value.startsWith("/regex") || value.startsWith("/javascript")) {
      //   const filepathRegex = /^\/(\w+)\/([\d\.]+)-([\w-]+)/
      //   const [, courseLabel, courseOrder, coursePath] =
      //     value.match(filepathRegex)
      //   const courseRelativePath = LINKS.courses[courseLabel].sub[coursePath]
      //   createNodeField({
      //     name: `slug`,
      //     node,
      //     value: courseRelativePath,
      //   })
      //   createNodeField({
      //     name: "orderId",
      //     node,
      //     value: courseOrder,
      //   })
    } else {
      const articlePath = value.replace(/^\/\d+-/, "") // replace the number prefix

      createNodeField({
        name: `slug`,
        node,
        value: `/p/${articlePath.toLowerCase()}`,
      })
    }
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions

  createRedirect({ fromPath: '/css-projects', toPath: '/css-demos', isPermanent: true });

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allArticles: allMdx(
        sort: { frontmatter: { date: ASC } }
        limit: 1000
        filter: { fields: { slug: { regex: "//p//" } } }
      ) {
        nodes {
          id
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }

      allSeries: allMdx {
        group(field: { frontmatter: { series: SELECT } }) {
          fieldValue
          nodes {
            id
            frontmatter {
              title
              date
              description
              cover
              category
              series
            }
          }
        }
      }

      #   allSeries: allMdx()

      #   allCourses: allMdx(
      #     sort: { fields: { orderId: ASC } }
      #     filter: { fields: { slug: { regex: "//courses//" } } }
      #   ) {
      #     nodes {
      #       id
      #       fields {
      #         slug
      #         orderId
      #       }
      #       internal {
      #         contentFilePath
      #       }
      #     }
      #   }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts and courses`,
      result.errors
    )
    return
  }

  const articles = result.data.allArticles.nodes
  const series = result.data.allSeries
  //   const courses = result.data.allCourses.nodes

  if (articles.length > 0) {
    articles.forEach((article, index) => {
      const previousArticleId = index === 0 ? null : articles[index - 1].id
      const nextArticleId =
        index === articles.length - 1 ? null : articles[index + 1].id

      createPage({
        path: article.fields.slug,
        component: `${articlePageTemplate}?__contentFilePath=${article.internal.contentFilePath}`,
        context: {
          id: article.id,
          previousArticleId,
          nextArticleId,
        },
      })
    })
  }

  if (series.group.length > 0) {
    series.group.forEach(item => {
      const { fieldValue: seriesId } = item
      console.log(seriesId)

      createPage({
        path: `/series/${seriesId}`,
        component: `${seriesPageTemplate}`,
        context: {
          id: seriesId,
        },
      })
    })
  }

  //   if (courses.length > 0) {
  //     courses.forEach((course, index) => {
  //       const previousCourseId = index === 0 ? null : courses[index - 1].id
  //       const nextCourseId =
  //         index === courses.length - 1 ? null : courses[index + 1].id

  //       createPage({
  //         path: course.fields.slug,
  //         component: `${coursePageTemplate}?__contentFilePath=${course.internal.contentFilePath}`,
  //         context: {
  //           id: course.id,
  //           previousCourseId,
  //           nextCourseId,
  //         },
  //       })
  //     })
  //   }
}
