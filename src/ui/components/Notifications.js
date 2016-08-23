import React, { Component, PropTypes } from 'react'
import NotificationsItem               from './NotificationsItem'


class Notifications extends Component {
    render() {
        const { notifications } = this.props

        return (
            <div className="notifications">
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
