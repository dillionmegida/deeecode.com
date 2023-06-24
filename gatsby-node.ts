const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { LINKS } = require("./src/constants")

const articlePageTemplate = path.resolve(`./src/templates/article-page.tsx`)
const coursePageTemplate = path.resolve("./src/templates/course-page/index.tsx")

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode })

    if (value.startsWith("/regex") || value.startsWith("/javascript")) {
      const filepathRegex = /^\/(\w+)\/([\d\.]+)-([\w-]+)/

      const [, courseLabel, courseOrder, coursePath] =
        value.match(filepathRegex)

      const courseRelativePath = LINKS.courses[courseLabel].sub[coursePath]

      createNodeField({
        name: `slug`,
        node,
        value: courseRelativePath,
      })

      createNodeField({
        name: "orderId",
        node,
        value: courseOrder,
      })
    } else {
      const articlePath = value.replace(/^(\/\d+-\s)/, "") // replace the number prefix

      createNodeField({
        name: `slug`,
        node,
        value: `/p${articlePath.toLowerCase()}`,
      })
    }
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

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

      allCourses: allMdx(
        sort: { fields: { orderId: ASC } }
        filter: { fields: { slug: { regex: "//courses//" } } }
      ) {
        nodes {
          id
          fields {
            slug
            orderId
          }
          internal {
            contentFilePath
          }
        }
      }
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
  const courses = result.data.allCourses.nodes

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

  if (courses.length > 0) {
    courses.forEach((course, index) => {
      const previousCourseId = index === 0 ? null : courses[index - 1].id
      const nextCourseId =
        index === courses.length - 1 ? null : courses[index + 1].id

      createPage({
        path: course.fields.slug,
        component: `${coursePageTemplate}?__contentFilePath=${course.internal.contentFilePath}`,
        context: {
          id: course.id,
          previousCourseId,
          nextCourseId,
        },
      })
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
