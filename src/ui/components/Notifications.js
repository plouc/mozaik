import React, { Component, PropTypes } from 'react'
import NotificationsItem               from './NotificationsItem'


class Notifications extends Component {
    constructor(props) {
        super(props)

        this.state = { notifications: [] }
    }

    componentWillMount() {
        //this.listenTo(NotificationsStore, this.onNotificationsUpdate)
    }

    onNotificationsUpdate(notifications) {
        this.setState({ notifications })
    }

    render() {
        const { notifications } = this.state

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

Notifications.propTypes = {}


export default Notifications
