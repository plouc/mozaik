import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'

const Ship = styled.span`
    display: block;
    border-radius: 50%;
`

const colorMapping = {
    success: ['success', 'passed', 'ok'],
    warning: ['warning'],
    failure: ['error', 'failed', 'ko'],
}

const getColorKey = status => {
    for (let c in colorMapping) {
        if (colorMapping[c].includes(status)) return c
    }

    return 'unknown'
}

class WidgetStatusChip extends Component {
    static propTypes = {
        size: PropTypes.number,
        status: PropTypes.string.isRequired,
        theme: PropTypes.object.isRequired,
        style: PropTypes.object.isRequired,
    }

    static defaultProps = {
        size: 12,
    }

    render() {
        const { status, size, theme, style: _style } = this.props

        const colorKey = getColorKey(status)

        const style = {
            height: size,
            width: size,
            background: theme.colors[colorKey],
            ..._style,
        }

        return <Ship style={style} />
    }
}

export default withTheme(WidgetStatusChip)
