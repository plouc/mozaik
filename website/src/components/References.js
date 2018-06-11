import React from 'react'
import styled from 'styled-components'
import Container from './Container'
import media from '../styles/media'

const Root = styled(Container)`
    background: ${props => props.theme.contentBackgroundHighlightColor};
    border-top:  1px solid ${props => props.theme.borderColor};
    border-bottom: 1px solid ${props => props.theme.borderColor};
    padding-bottom: 25px; 
`

const Title = styled.h2`
    font-weight: 700;
    font-size: 22px;
    margin: 30px 0 30px 0;
    text-transform: uppercase;
    
    ${media.mobile`
        & {
            text-align: center;
        }
    `}
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    
    ${media.mobile`
        & {
            flex-wrap: wrap;
        }
    `}
    
    ${media.tablet`
        & {
            flex-wrap: wrap;
        }
    `}
    
    ${media.desktop`
        & {
            flex-wrap: nowrap;
        }
    `}
`

const Item = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    padding: 0 15px;
    height: 60px;
    
    & img {
        max-width:  100%;
        max-height: 100%;
    }
    
    ${media.mobile`
        & {
            width: 48%;
        }
    `}
    
    ${media.tablet`
        & {
            width: 31%;
        }
    `}
    
    ${media.desktop`
        & {
            width: 24%;
        }
    `}
`

const References = ({ references, images }) => (
    <Root size="large">
        <Title>Who's using it</Title>
        <Wrapper>
            {references.map(reference => {
                const image = images.find(i => i.base === reference.image)

                return (
                    <Item
                        key={reference.label}
                        href={reference.link}
                        title={reference.label}
                    >
                        <img
                            src={image.publicURL}
                            alt={reference.label}
                        />
                    </Item>
                )
            })}
        </Wrapper>
    </Root>
)

export default References

