import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styled from 'styled-components'
import typography from '../../theming/typography'

const Item = styled.div`
    position: relative;
    margin-bottom: 1.4vmin;
    padding: ${props => props.theme.notifications.item.padding};
    background: ${props => props.theme.notifications.item.background};
    color: ${props => props.theme.notifications.item.color};
    ${props => props.theme.notifications.item.extend.trim()};
    ${props => typography(props.theme)};
`

export default class NotificationsItem extends Component {
    static propTypes = {
        notification: PropTypes.object.isRequired,
    }

    render() {
        const { notification } = this.props

        let content
        if (notification.component) {
            content = React.createElement(
                notification.component,
                _.assign({}, notification.props, {
                    notificationId: notification.id,
                })
            )
        } else {
            content = notification.message
        }

        return <Item>{content}</Item>
    }
}
