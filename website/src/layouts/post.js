import React from 'react'
import PropTypes from 'prop-types'
import Global from '../components/Global'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Layout = ({ children, data }) => (
    <Global>
        <Header siteTitle={data.site.siteMetadata.title} isFullWidth={false}/>
        {children()}
        <Footer isFullWidth={true}/>
    </Global>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query PostSiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
