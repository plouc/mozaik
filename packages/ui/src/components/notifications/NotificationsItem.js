import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import classes from './Notifications.css'

export default class NotificationsItem extends Component {
    static propTypes = {
        notification: PropTypes.object.isRequired,
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { notification } = this.props
        const { theme } = this.context

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

        return (
            <div
                className={`notification__item ${classes.item} ${_.get(
                    theme,
                    'notifications.item',
                    ''
                )}`}
            >
                {content}
            </div>
        )
    }
}
