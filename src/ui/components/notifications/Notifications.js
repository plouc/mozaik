import React, { Component, PropTypes } from 'react'
import NotificationsItem               from './NotificationsItem'


class Notifications extends Component {
    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { notifications } = this.props
        const { theme }         = this.context

        const style = {
            position: 'absolute',
            zIndex:   100000,
            width:    '25%',
            top:      `calc(${theme.dashboard.header.height} + ${theme.widget.spacing} + 1.4vmin)`,
            right:    `calc(${theme.widget.spacing} + 1.4vmin)`,
        }

        return (
            <div style={style}>
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
