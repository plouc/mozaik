import React from 'react'
import Link from 'gatsby-link'
import styled, { css } from 'styled-components'
import GitHubIcon from 'react-icons/lib/fa/github'
import TwitterIcon from 'react-icons/lib/fa/twitter'
import media from '../styles/media'

const Root = styled.nav`
    height: ${props => props.theme.headerHeight}px;
    display: flex;
    align-items: center;
    
    ${media.mobile`
        display: none;
    `}
`

const itemStyle = css`
    text-decoration: none;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    padding: 7px 10px;
    display: block;
    line-height: 1em;
`

const StyledLink = styled(Link)`
    ${itemStyle}
`

const StyledA = styled.a`
    ${itemStyle}
`

const DemoLink = styled(StyledA)`
    background: #fff;
    color:      #13aae3;
    border-radius: 2px;
    margin-left: 10px;
    
    &:hover {
        background: #13aae3;
        color:      #fff;
    }
`

const HeaderNav = () => (
    <Root>
        <StyledLink to="/docs">
            Docs
        </StyledLink>
        <StyledLink to="/architecture">
            How it works
        </StyledLink>
        <StyledLink to="/extensions">
            Extensions
        </StyledLink>
        <StyledLink to="/blog">
            News
        </StyledLink>
        <StyledLink to="/faq">
            FAQ
        </StyledLink>
        <StyledA
            href="https://github.com/plouc/mozaik"
            target="_blank"
            title="github"
        >
            <GitHubIcon size={22}/>
        </StyledA>
        <StyledA
            href="https://twitter.com/benitteraphael"
            target="_blank"
            title="twitter"
        >
            <TwitterIcon size={22}/>
        </StyledA>
        <DemoLink
            href="http://mozaik.herokuapp.com/"
            target="_blank"
        >
            demo
        </DemoLink>
    </Root>
)

export default HeaderNav
