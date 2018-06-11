import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
import '../styles/index.css'

const Container = styled.div`
    color: ${props => props.theme.textColor};
    font-family: ${props => props.theme.fontFamily};
    font-size: ${props => props.theme.fontSize};
    line-height: ${props => props.theme.lineHeight};
`

const Global = ({ children, siteTitle }) => (
    <ThemeProvider theme={theme}>
        <Container>
            <Helmet
                title={siteTitle}
            />
            {children}
        </Container>
    </ThemeProvider>
)

Global.propTypes = {
    children: PropTypes.node.isRequired,
    siteTitle: PropTypes.string.isRequired,
}

export default Global
