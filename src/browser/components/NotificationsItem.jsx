import React, { Component, PropTypes } from 'react';
import _                               from 'lodash';


class NotificationsItem extends Component {
    render() {
        const { notification } = this.props;

        let content;
        if (notification.component) {
            content = React.createElement(notification.component, _.assign({}, notification.props, {
                notificationId: notification.id
            }));
        } else {
            content = notification.message;
        }

        return (
            <div className={`notifications__item notifications__item--${notification.status}`}>
                {content}
            </div>
        );
    }
}

NotificationsItem.displayName = 'NotificationsItem';

NotificationsItem.propTypes = {
    notification: PropTypes.object.isRequired
};


export default NotificationsItem;
