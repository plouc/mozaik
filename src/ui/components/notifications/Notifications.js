import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import NotificationsItem               from './NotificationsItem'
import classes                         from './Notifications.css'


class Notifications extends Component {
    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { notifications } = this.props
        const { theme }         = this.context

        return (
            <div className={`notifications ${classes.notifications} ${_.get(theme, 'notifications.notifications', '')}`}>
                {notifications.map(notification => (
                    <NotificationsItem
                        key={`notification.${notification.id}`}
                        notification={notification}
                    />
                ))}
            </div>
        )
    }
}

Notifications.propTypes = {
    notifications: PropTypes.array.isRequired,
}


export default Notifications
