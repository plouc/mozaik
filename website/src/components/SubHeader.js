import React from 'react'
import styled from 'styled-components'
import Container from './Container'
import media from '../styles/media'

const Root = styled(Container)`
    box-shadow: 0 -1px 1px rgba(0,0,0,0.2) inset;
    
    ${media.mobile`
        & {
            padding: 30px 0 20px;
        }
    `}
    
    ${media.tablet`
        & {
            padding: 30px 0;
        }
    `}
    
    ${media.desktop`
        & {
            padding: 50px 0;
        }
    `}
`

const Title = styled.h1`
    color: #fff;
    font-family: 'Montserrat','Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;
    font-weight: 400;
    font-size: 28px;
    text-shadow: 0 1px 1px rgba(0,0,0,0.35);
    margin: 0;
    padding: 0;
`

const Description = styled.div`
    margin: 10px 0 0;
    color: #012939;
`

const SubHeader = ({ title, description, isDocPage }) => (
    <Root size={isDocPage ? 'medium' : 'large'}>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
    </Root>
)

export default SubHeader
