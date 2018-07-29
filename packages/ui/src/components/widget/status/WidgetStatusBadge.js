import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import QuestionIcon from 'react-icons/lib/fa/question'
import SuccessIcon from 'react-icons/lib/fa/check-circle'
import WarningIcon from 'react-icons/lib/fa/exclamation-triangle'
import styled, { withTheme } from 'styled-components'

const Badge = styled.div`
    display: flex;
    flex-direction: column;
    padding: 3vmin;
    align-items: center;
    justify-content: space-between;
    height: 100%;
`

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

const iconMapping = [
    {
        icon: SuccessIcon,
        match: ['success', 'passed', 'good', 'ok'],
    },
    {
        icon: WarningIcon,
        match: ['warning', 'error', 'failed', 'bad', 'ko'],
    },
]

const getIcon = status => {
    const matchedMapping = _.find(iconMapping, mapping => {
        return mapping.match.includes(status)
    })

    if (matchedMapping) {
        return matchedMapping.icon
    } else {
        return QuestionIcon
    }
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
        const Icon = getIcon(status)

        const rootStyle = {
            ...style,
        }

        const iconStyle = {
            color: theme.colors[colorKey],
        }

        let messageNode = null
        if (message !== undefined) {
            messageNode = <div>{message}</div>
        }

        let metaNode = null
        if (meta !== undefined) {
            metaNode = <div>{meta}</div>
        }

        return (
            <Badge style={rootStyle}>
                <Icon style={iconStyle} />
                {messageNode}
                {metaNode}
            </Badge>
        )
    }
}

export default withTheme(WidgetStatusBadge)
