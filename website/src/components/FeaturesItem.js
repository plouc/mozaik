import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import styled from 'styled-components'
import media from '../styles/media'

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    
    ${media.mobile`
        padding: 20px 0;
        border-top: 1px solid ${props => props.theme.borderColor};
        
        &: first-child {
            border-top: 0;
        }
    `}
    
    ${media.tablet`
        padding: 20px 0;
        border-top: 1px solid ${props => props.theme.borderColor};
        
        &: first-child {
            border-top: 0;
        }
    `}
    
    ${media.desktop`
        padding: 0;
        border-top: 0;
    `}
`

const Illustration = styled.div`
    margin-right: 20px;
    flex-shrink: 0;
    
    ${media.mobile`
        display: none;
    `}
    
    ${media.tablet`
        display: block;
        width: 120px;
        height: 120px;
    `}
    
    ${media.desktop`
        display: block;
        width: 160px;
        height: 160px;
    `}
    
    & img {
        max-width: 100%;
        max-height: 100%;
    }
`

const Title = styled.h2`
    margin: 0;
    font-weight: bold;
    font-size: 18px;
`

const Description = styled.div`
    margin-top: 12px;
    line-height: 1.8em;

    p {
        display: inline;
    }

    strong {
        font-weight: 700;
        color: ${props => props.theme.accentTextColor};
    }
`

const StyledLink = styled(Link)`
    line-height: 1em;
    padding: 3px 7px;
    font-size: 13px;
    font-weight: 700;
    color: ${props => props.theme.accentTextColor};
    text-decoration: none;
    display: inline-block;
    border: 2px solid ${props => props.theme.accentTextColor};
    
    &:hover {
        background-color: ${props => props.theme.accentTextColor};
        color: #fff;
    }
`

const FeaturesItem = ({ title, image, children: description, link }) => (
    <Container>
        <Illustration>
            <img src={image}/>
        </Illustration>
        <div>
            <Title>{title}</Title>
            <Description>
                {description}{' '}
                {link && (
                    <StyledLink to={link}>
                        more
                    </StyledLink>
                )}
            </Description>
        </div>
    </Container>
)

FeaturesItem.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    link: PropTypes.string,
}

export default FeaturesItem
