import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Body = styled.div`
    position: absolute;
    top: ${props => (props.isHeaderless ? 0 : props.theme.widget.body.top)};
    right: 0;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    ${props =>
        props.disablePadding ? '' : `padding: ${props.theme.widget.body.padding};`} ${props =>
        props.theme.widget.body.extend.trim()};
`

export default class WidgetBody extends Component {
    static propTypes = {
        style: PropTypes.object,
        children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
            .isRequired,
        disablePadding: PropTypes.bool.isRequired,
        isHeaderless: PropTypes.bool.isRequired,
    }

    static defaultProps = {
        disablePadding: false,
        isHeaderless: false,
        style: {},
    }

    render() {
        const { children, disablePadding, isHeaderless, style } = this.props

        return (
            <Body disablePadding={disablePadding} isHeaderless={isHeaderless} style={style}>
                {children}
            </Body>
        )
    }
}
