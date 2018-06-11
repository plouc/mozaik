import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Root = styled.footer`
    color: #fff;
    position: relative;
    text-align: center;
    line-height: 1.4;
    //font-family: font-title    
    
    @media print {
        display: none;
    }
    
    ${props => {
        if (props.isFullWidth) {
            return `
                padding: 40px 0 40px 300px;
            `
        }  
        
        return `
            padding: 40px 0;
        `
    }}
`

const Inner = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`

const Link = styled.a`
    color: inherit;
    text-decoration: none;
    transition: 0.2s;
    font-weight: bold;
    
    &:hover {
        color: #fff;
    }
`

/*
@media only screen and (min-width: 769px) {
    #footer {
        text-align: left;
    }

    #footer-copyright {
        float: left;
    }

    #footer-links {
        float: right;
        margin-top: 0;
    }
}
*/

const Footer = ({ isFullWidth }) => (
    <Root isFullWidth={isFullWidth}>
        <Inner>
            <div id="footer-copyright">
                <Link href="https://github.com/plouc/mozaik">Mozaïk</Link> | Distributed under MIT License |
                crafted by <Link href="https://github.com/plouc" target="_blank">Raphaël Benitte</Link> aka <Link
                href="https://github.com/plouc">plouc</Link> |
                Found an issue with the docs? Report it <Link
                href="https://github.com/plouc/mozaik-website/issues/new">here</Link>
            </div>
        </Inner>
    </Root>
)

Footer.propTypes = {
    isFullWidth: PropTypes.bool.isRequired,
}

Footer.defaultProps = {
    isFullWidth: false
}

export default Footer
