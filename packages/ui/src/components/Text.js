import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import typography from '../theming/typography'

export default class Text extends Component {
    static propTypes = {
        tag: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['default', 'display', 'mono']).isRequired,
        variant: PropTypes.oneOf(['strong', 'small']).isRequired,
        children: PropTypes.node.isRequired,
    }

    static defaultProps = {
        tag: 'span',
        type: 'default',
        variant: 'default',
    }

    render() {
        const { tag, type, variant, children, ...rest } = this.props

        const StyledText = styled(tag)`
            ${props => typography(props.theme, props.type, props.variant)};
        `

        return (
            <StyledText type={type} variant={variant} {...rest}>
                {children}
            </StyledText>
        )
    }
}
