import React from 'react'
import PropTypes from 'prop-types'
import Global from '../components/Global'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Layout = ({ children, data }) => (
    <Global siteTitle={data.site.siteMetadata.title}>
        <Header siteTitle={data.site.siteMetadata.title} isFullWidth={false}/>
        {children()}
        <Footer/>
    </Global>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

