import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'


export default class NotificationsItem extends Component {
    static propTypes = {
        notification: PropTypes.object.isRequired,
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { notification } = this.props
        const { theme }        = this.context

        const style = {
            position:     'relative',
            marginBottom: '1.4vmin',
            background:   theme.notifications.bgColor,
            color:        theme.notifications.textColor,
            padding:      theme.notifications.padding,
            boxShadow:    theme.notifications.shadow,
            ...theme.notifications.overrides,
        }

        let content
        if (notification.component) {
            content = React.createElement(notification.component, _.assign({}, notification.props, {
                notificationId: notification.id
            }))
        } else {
            content = notification.message
        }

        return (
            <div style={style}>
                {content}
            </div>
        )
    }
}
