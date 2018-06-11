import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import styled from 'styled-components'
import logoWhite from '../assets/mozaik-logo-white.png'
import logoBlack from '../assets/mozaik-logo.png'
import Pattern from '../assets/mozaik-pattern.png'
import HeaderNav from './HeaderNav'

const HeaderRoot = styled.header`
    position: fixed;
    z-index: 200;
    top: 0;
    right: 0;
    left: 0;
    color: #fff;
    height: ${props => props.theme.headerHeight}px;
    background-image: url("${Pattern}");
    background-size: 255px 128px;
    background-color: #08a0db;
`

const HeaderWrapper = styled.div`
    ${props => {
        if (props.isFullWidth) {
            return `
                padding: 0 20px 0 0;
            `
        }    
        
        return `
            padding: 0 20px;
            max-width: 1200px;
            margin: 0 auto;  
        `
    }}
    height: ${props => props.theme.headerHeight}px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const LogoWrapper = styled(Link)`
    height: ${props => props.theme.headerHeight}px;
    display: flex;
    ${props => {
        if (props.isFullWidth) {
            return `
                border-right: 1px solid #ddd;
                background: ${props => props.theme.contentBackgroundHighlightColor};
                width: ${props.theme.sidebarWidth}px;
                padding: 0 20px;
            `
        }    
        
        return ''
    }}
`

const Logo = styled.div`
    font-size: 0;
    background-repeat: no-repeat;
    background-position: 0 17px;
    background-size: contain;
    width: 100px;
    height: ${props => props.theme.headerHeight}px;
    display: inline-block;
    ${props => {
        if (props.isFullWidth) {
            return `
                background-image: url(${logoBlack});
            `
        }    
        
        return `
            background-image: url(${logoWhite});
        `
    }}
`

const Header = (props) => {
    const { siteTitle, isFullWidth } = props

    return (
        <HeaderRoot>
            <HeaderWrapper isFullWidth={isFullWidth}>
                <LogoWrapper to="/" isFullWidth={isFullWidth}>
                    <Logo isFullWidth={isFullWidth}>{siteTitle}</Logo>
                </LogoWrapper>
                <HeaderNav/>
            </HeaderWrapper>
        </HeaderRoot>
    )
}

Header.propTypes = {
    siteTitle: PropTypes.string.isRequired,
    isFullWidth: PropTypes.bool.isRequired,
}

Header.defaultProps = {
    isFullWidth: false,
}

export default Header
