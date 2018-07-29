import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styled, { withTheme } from 'styled-components'
import { HelpIcon, CheckCircleIcon, AlertTriangleIcon, AlertCircleIcon } from '../../icons'
import Text from '../../Text'

const Badge = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
`

const IconWrapper = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
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
        icon: CheckCircleIcon,
        match: ['success', 'passed', 'good', 'ok'],
    },
    {
        icon: AlertTriangleIcon,
        match: ['warning'],
    },
    {
        icon: AlertCircleIcon,
        match: ['error', 'failed', 'bad', 'ko'],
    },
]

const getIcon = status => {
    const matchedMapping = _.find(iconMapping, mapping => {
        return mapping.match.includes(status)
    })

    if (matchedMapping) {
        return matchedMapping.icon
    } else {
        return HelpIcon
    }
}

class WidgetStatusBadge extends Component {
    static propTypes = {
        status: PropTypes.string,
        message: PropTypes.node,
        meta: PropTypes.node,
        style: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        iconSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }

    static defaultProps = {
        iconSize: '9vmin',
        style: {},
    }

    render() {
        const { status, message, meta, iconSize, style, theme } = this.props

        const colorKey = getColorKey(status)
        const Icon = getIcon(status)

        const rootStyle = {
            ...style,
        }

        let messageNode = null
        if (message !== undefined) {
            messageNode = <Text>{message}</Text>
        }

        let metaNode = null
        if (meta !== undefined) {
            metaNode = <Text variant="small">{meta}</Text>
        }

        return (
            <Badge style={rootStyle}>
                <IconWrapper>
                    <Icon size={iconSize} color={theme.colors[colorKey]} />
                </IconWrapper>
                {messageNode}
                {metaNode}
            </Badge>
        )
    }
}

export default withTheme(WidgetStatusBadge)
