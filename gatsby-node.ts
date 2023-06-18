const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { LINKS } = require("./src/constants")

// Define the template for blog post
const blogPost = path.resolve(`./src/templates/blog-post.tsx`)

const coursePageTemplate = path.resolve("./src/templates/course-page/index.tsx")

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          fields {
            slug
          }
        }
      }

      allMdx(sort: { fields: { orderId: ASC } }) {
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

  const posts = result.data.allMarkdownRemark.nodes
  const courses = result.data.allMdx.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
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
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    const postPath = value.replace(/^(\/\d+\.\s)/, "") // replace the number prefix

    createNodeField({
      name: `slug`,
      node,
      value: postPath,
    })
  }

  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode })

    const filepathRegex = /^\/(\w+)\/(\d+)-([\w-]+)/

    const [, courseLabel, courseOrder, coursePath] = value.match(filepathRegex)

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