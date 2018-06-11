import React from 'react'
import Link from 'gatsby-link'
import styled, { css } from 'styled-components'
import Container from './Container'
import media from '../styles/media'

const Root = styled(Container)`
    text-align: center;
    color: #fff;
    
    ${media.mobile`
        & {
            padding: 20px 0;
        }
    `}
    
    ${media.tablet`
        & {
            padding: 40px 0;
        }
    `}
    
    ${media.desktop`
        & {
            padding: 50px 0;
        }
    `}
`

const Intro = styled.p`
    margin-bottom: 30px;
    font-size: 18px;
    font-weight: 600;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.35);
`

const buttonCss = css`
    display: inline-block;
    background: #13aae3;
    color:      #fff;
    font-size: 15px;
    text-decoration: none;
    margin: 0;
    border: 2px solid #fff;
    transition: background 0.2s, color 0.2s;
    text-align: center;
    font-weight: 700;
    text-transform: uppercase;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    
    &:hover {
        background: #fff;
        color: #13aae3;
    }
    
    ${media.mobile`
        & {
            width: 100%;
            padding: 7px 16px;
        }
        
        &:first-child {
            margin-bottom: 12px;
        }
    `}
    
    ${media.tablet`
        & {
            width: 47%;
            padding: 12px 16px;
        }
        
        &:first-child {
            margin-right: 4%;
        }
    `}
    
    ${media.desktop`
        & {
            width: 18%;
            padding: 12px 16px;
        }
        
        &:first-child {
            margin-right: 2%;
        }
    `}
`

const DemoButton = styled.a`
    ${buttonCss}
`

const DocsButton = styled(Link)`
    ${buttonCss}
`

const HomeBanner = () => (
    <Root>
        <Intro>
            Mozaïk is a tool based on nodejs / react / d3 / stylus to easily craft beautiful dashboards.
        </Intro>
        <div>
            <DemoButton href="http://mozaik.herokuapp.com/" target="_blank">
                demo
            </DemoButton>
            <DocsButton to="/docs/">
                get started
            </DocsButton>
        </div>
    </Root>
)

export default HomeBanner
