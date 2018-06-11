import React from 'react'
import styled from 'styled-components'
import Container from './Container'
import media from '../styles/media'

const Root = styled(Container)`
    background: ${props => props.theme.contentBackgroundColor};
    padding-bottom: 30px;
`

const Title = styled.h2`
    font-weight: 700;
    font-size: 22px;
    margin: 30px 0 0;
    padding-bottom: 15px;
    text-transform: uppercase;
    border-bottom: 1px solid ${props => props.theme.borderColor};
    
    ${media.mobile`
        & {
            text-align: center;
        }
    `}
`

const Item = styled.a`
    text-decoration: none;
    color: ${props => props.theme.textColor} !important;
    display: block;
    padding: 10px 0;
    border-bottom: 1px solid ${props => props.theme.borderColor};
    
    &:last-child {
        border-bottom: 0;
    }
`

const ExternalPosts = ({ posts }) => (
    <Root size="large">
        <Title>Use cases/posts</Title>
        {posts.map(post => (
            <Item key={post.link} href={post.link}>
                {post.title}
            </Item>
        ))}
    </Root>
)

export default ExternalPosts
