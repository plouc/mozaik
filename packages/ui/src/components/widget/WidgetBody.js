import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Body = styled.div`
    position: absolute;
    top: ${props => props.theme.widget.body.top};
    right: 0;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    ${props => props.theme.widget.body.extend.trim()};
`

export default class WidgetBody extends Component {
    static propTypes = {
        style: PropTypes.object,
        children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    }

    static defaultProps = {
        style: {},
    }

    render() {
        const { children, style } = this.props

        return (
            <Body style={style}>
                {children}
            </Body>
        )
    }
}
