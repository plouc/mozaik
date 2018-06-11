const path = require('path')
const dateFns = require('date-fns')
const { sortBy, deburr, lowerCase, kebabCase } = require('lodash')

const createDocumentationPages = (graphql, createPage) => {
    const query = `{
        allMarkdownRemark(filter: {
            fileAbsolutePath: {
                regex: "//docs/"
            }
        }) {
            edges {
                node {
                    fileAbsolutePath
                    frontmatter {
                        title
                        description
                        sectionTitle
                        path
                        position
                    }
                }
            }
        }
    }`

    const template = path.resolve(`src/templates/documentation.js`)

    return graphql(query)
        .then(result => {
            if (result.errors) return Promise.reject(result.errors)

            const pages = result.data.allMarkdownRemark.edges

            pages.forEach(({ node }) => {
                createPage({
                    path: node.frontmatter.path,
                    component: template,
                    layout: 'documentation',
                    context: {
                        navigation: sortBy(pages.map(({ node }) => node.frontmatter), 'position')
                    },
                })
            })
        })
}

const slugify = str => kebabCase(lowerCase(deburr(str)))

const createBlogPages = (graphql, createPage, createRedirect) => {
    const query = `{
        posts: allMarkdownRemark(
            filter: {
                fileAbsolutePath: { regex: "//posts/" }
            },
            sort: {
                fields: [frontmatter___date],
                order: DESC
            }
        ) {
            edges {
                node {
                    fileAbsolutePath
                    frontmatter {
                        title
                        date
                    }
                }
            }
        }
    }`

    const template = path.resolve(`src/templates/post.js`)

    return graphql(query)
        .then(result => {
            if (result.errors) return Promise.reject(result.errors)

            const allPosts = result.data.posts.edges
                .map(({ node: post }, i) => {
                    const date = new Date(post.frontmatter.date)

                    return {
                        title: post.frontmatter.title,
                        sectionTitle: i === 0 ? 'Recent posts' : undefined,
                        path: `/blog/${dateFns.format(date, 'YYYY/MM/DD')}/${slugify(post.frontmatter.title)}`
                    }
                })

            result.data.posts.edges.forEach(({ node: post }, i) => {
                const date = new Date(post.frontmatter.date)

                const page = {
                    path: `/blog/${dateFns.format(date, 'YYYY/MM/DD')}/${slugify(post.frontmatter.title)}`,
                    component: template,
                    layout: 'documentation',
                    context: {
                        date: `${dateFns.format(date, 'YYYY-MM-DD')}*`,
                        allPosts,
                    },
                }

                createPage(page)

                if (i === 0) {
                    createRedirect({
                        fromPath: '/blog',
                        isPermanent: true,
                        redirectInBrowser: true,
                        toPath: page.path,
                    })
                }
            })
        })
}

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage, createRedirect } = boundActionCreators

  return Promise.all([
      createDocumentationPages(graphql, createPage),
      createBlogPages(graphql, createPage, createRedirect)
  ])
}

exports.onCreatePage = async ({ page, boundActionCreators }) => {
    const { createPage } = boundActionCreators

    return new Promise(resolve => {
        if (page.path.match(/\/docs/)) {
            page.layout = 'documentation'

            createPage(page)
        }

        resolve()
    })
}