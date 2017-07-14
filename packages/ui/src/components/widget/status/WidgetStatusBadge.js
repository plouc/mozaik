import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'

const Badge = styled.div`
    display: flex;
    flex-direction: column;
    padding: 3vmin;
    align-items: center;
    justify-content: space-between;
    height: 100%;
`

const Icon = styled.i`font-size: 12vmin;`

const colorMapping = {
    success: ['success', 'passed', 'good', 'ok'],
    warning: ['warning'],
    failure: ['error', 'failed', 'bad', 'ko'],
}

const getColorKey = status => {
    for (let c in colorMapping) {
        if (colorMapping[c].includes(status)) return c
    }

    return 'unknown'
}

const iconMapping = {
    'check-circle': ['success', 'passed', 'good', 'ok'],
    warning: ['warning', 'error', 'failed', 'bad', 'ko'],
}

const getIcon = status => {
    for (let i in iconMapping) {
        if (iconMapping[i].includes(status)) return i
    }

    return 'question'
}

class WidgetStatusBadge extends Component {
    static propTypes = {
        status: PropTypes.string,
        message: PropTypes.node,
        meta: PropTypes.node,
        style: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
    }

    static defaultProps = {
        style: {},
    }

    render() {
        const { status, message, meta, style, theme } = this.props

        const colorKey = getColorKey(status)
        const icon = getIcon(status)

        const rootStyle = {
            //...style,
        }

        const iconStyle = {
            color: theme.colors[colorKey],
        }

        let messageNode = null
        if (message !== undefined) {
            messageNode = (
                <div>
                    {message}
                </div>
            )
        }

        let metaNode = null
        if (meta !== undefined) {
            metaNode = (
                <div>
                    {meta}
                </div>
            )
        }

        return (
            <Badge style={rootStyle}>
                <Icon className={`fa fa-${icon}`} style={iconStyle} />
                {messageNode}
                {metaNode}
            </Badge>
        )
    }
}

export default withTheme(WidgetStatusBadge)
