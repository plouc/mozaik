import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import styled from 'styled-components'
import PreviousIcon from 'react-icons/lib/md/keyboard-arrow-left'
import NextIcon from 'react-icons/lib/md/keyboard-arrow-right'

const Root = styled.section`
    background: ${props => props.theme.contentBackgroundHighlightColor};
    text-align: center;
    border-top: 1px solid ${props => props.theme.borderColor};
`

const Inner = styled.div`
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    justify-content: space-between; 
`

const StyledLink = styled(Link)`
    text-decoration: none;
    padding: 20px 0;
    display: flex;
    max-width: 35%;
    align-items: flex-start;
    color: inherit;
`

const StyledPreviousIcon = styled(PreviousIcon)`
    margin-top: 3px;
    margin-right: 4px;
    font-size: 24px;
`

const StyledNextIcon = styled(NextIcon)`
    margin-top: 3px;
    margin-left: 4px;
    font-size: 24px;
`

const LinkText = styled.span`
    display: flex;
    flex-direction: column;
    color: ${props => props.theme.accentTextColor};
`

const Description = styled.span`
    color: #777;
    font-size: 14px;
`

const Previous = styled(StyledLink)`
    text-align: left;
`

const Next = styled(StyledLink)`
    text-align: right;
`

const Pager = ({ currentPath, navigation }) => {
    let index
    navigation.forEach((item, i) => {
        if (item.path === currentPath) {
            index = i
        }
    })

    let previous
    let next
    if (index !== undefined) {
        previous = navigation[index - 1]
        next = navigation[index + 1]
    }

    return (
        <Root>
            <Inner>
                {previous ? (
                    <Previous to={previous.path}>
                        <StyledPreviousIcon/>
                        <LinkText>
                            <span>{previous.title}</span>
                            <Description>{previous.description}</Description>
                        </LinkText>
                    </Previous>
                ) : <span/>}
                {next && (
                    <Next to={next.path}>
                        <LinkText>
                            <span>{next.title}</span>
                            <Description>{next.description}</Description>
                        </LinkText>
                        <StyledNextIcon/>
                    </Next>
                )}
            </Inner>
        </Root>
    )
}

Pager.propTypes = {
    currentPath: PropTypes.string.isRequired,
    navigation: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string.isRequired,
    })).isRequired,
}

export default Pager
