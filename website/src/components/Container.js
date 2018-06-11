import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Root = styled.div`
    width: 100%;
    &:before {
        content: "";
        display: table;
    }
    &:after {
        clear: both;
    }
`

const Inner = styled.div`
    max-width: ${props => props.size === 'large' ? 1200 : 900}px;
    margin: 0 auto;
    padding: 0 20px;
`

const Container = ({ children, style, innerStyle, size, ...rest }) => (
    <Root style={style} {...rest}>
        <Inner size={size} innerStyle={innerStyle}>
            {children}
        </Inner>
    </Root>
)

Container.propTypes = {
    style: PropTypes.object.isRequired,
    innerStyle: PropTypes.object.isRequired,
    size: PropTypes.oneOf(['medium', 'large']).isRequired,
}

Container.defaultProps = {
    style: {},
    innerStyle: {},
    size: 'medium'
}

export default Container