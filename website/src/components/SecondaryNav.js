import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

const Root = styled.aside`
    position: fixed;
    top: ${props => props.theme.headerHeight}px;
    width: ${props => props.theme.sidebarWidth}px;
    background: ${props => props.theme.contentBackgroundColor};
    height: calc(100vh - ${props => props.theme.headerHeight}px);
    overflow-y: auto;
    padding-bottom: 20px;
    border-right: 1px solid ${props => props.theme.borderColor}; 
    z-index: 2;
    
    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    &::-webkit-scrollbar-track {
        background: #bdd7f4;
    }
    &::-webkit-scrollbar-thumb {
        background: #08a0db;
    }
`

const Title = styled.h3`
    margin: 20px 0 0;
    padding: 8px 20px 2px;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 400;
    color: ${props => props.theme.accentTextColor};
`

const StyledLink = styled(Link)`
    display: block;
    font-weight: 500;
    padding: 3px 20px;
    text-decoration: none;
    color: ${props => props.theme.textColor};
    
    &.isActive {
        background: ${props => props.theme.contentBackgroundHighlightColor};
        color: ${props => props.theme.accentTextColor};
    }
`

const SecondaryNav = ({ items }) => (
    <Root>
        <nav role="navigation">
            {items.map((item, i) => {
                return (
                    <div key={i}>
                        {item.sectionTitle && (
                            <Title>{item.sectionTitle}</Title>
                        )}
                        <StyledLink to={item.path} activeClassName="isActive" exact={true}>
                            {item.title}
                        </StyledLink>
                    </div>
                )
            })}
        </nav>
    </Root>
)

export default SecondaryNav
