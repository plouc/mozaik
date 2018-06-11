module.exports = {
  siteMetadata: {
    title: 'Mozaïk',
  },
  plugins: [
      'gatsby-transformer-yaml',
      {
          resolve: 'gatsby-source-filesystem',
          options: {
              name: 'src',
              path: `${__dirname}/src/`,
          },
      },
      {
          resolve: `gatsby-transformer-remark`,
          options: {
              plugins: [
                  'gatsby-remark-prismjs',
                  {
                      resolve: `gatsby-remark-images`,
                      options: {
                          // It's important to specify the maxWidth (in pixels) of
                          // the content container as this plugin uses this as the
                          // base for generating different widths of each image.
                          maxWidth: 590,
                      },
                  },
              ]
          },
      },
      'gatsby-plugin-catch-links',
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-styled-components',
      'gatsby-remark-copy-linked-files',
      {
          resolve: 'gatsby-remark-images',
          options: {
              maxWidth: 1080,
          },
      },
  ],
}
