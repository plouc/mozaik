import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Avatar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;
`

export default class WidgetAvatar extends Component {
    static propTypes = {
        children: PropTypes.node,
        size: PropTypes.oneOfType([
            PropTypes.number,
            // supports string because of vmin, rem…
            // CSS calc() is used to compute relative sizes
            PropTypes.string,
        ]).isRequired,
        style: PropTypes.object,
    }

    static defaultProps = {
        size: 36,
        style: {},
    }

    render() {
        const { children, size, style: _style } = this.props

        const style = {
            fontSize: `calc(${size} / 2)`,
            height: size,
            width: size,
            ..._style,
        }

        return <Avatar style={style}>{children}</Avatar>
    }
}
