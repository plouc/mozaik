import Reflux               from 'reflux';
import _                    from 'lodash';
import NotificationsActions from './../actions/NotificationsActions';


let currentId     = 0;
let notifications = [];

export const NOTIFICATION_STATUS_SUCCESS = 'success';
export const NOTIFICATION_STATUS_WARNING = 'warning';
export const NOTIFICATION_STATUS_ERROR   = 'error';

const NOTIFICATION_DEFAULT_TTL = 5000;

const timers     = {};
const clearTimer = (id) => {
    if (timers[id]) {
        clearTimeout(timers[id]);
        delete timers[id];
    }
};


const NotificationsStore = Reflux.createStore({
    listenables: NotificationsActions,

    notify(notification) {
        if (!_.has(notification, 'id')) {
            notification.id = currentId;
            currentId++;
        }

        if (!_.has(notification, 'ttl')) {
            notification.ttl = NOTIFICATION_DEFAULT_TTL;
        }

        const existingNotification = _.find(notifications, { id: notification.id });
        if (existingNotification) {
            const notificationIndex = _.indexOf(notifications, existingNotification);
            notifications = notifications.slice();
            notifications.splice(notificationIndex, 1, notification);
        } else {
            notifications.push(notification);
        }

        if (notification.ttl >= 0) {
            this.close(notification.id, notification.ttl);
        }

        this.trigger(notifications);
    },

    update(id, changeSet) {
        const notification = _.find(notifications, { id });
        if (notification) {
            const notificationIndex = _.indexOf(notifications, notification);
            notifications = notifications.slice();
            notifications.splice(notificationIndex, 1, _.assign({}, notification, changeSet));

            this.trigger(notifications);
        }
    },

    close(id, delay = 0) {
        if (delay > 0) {
            clearTimer(id);
            timers[id] = setTimeout(() => { this.close(id); }, delay);
            return;
        }

        const notification = _.find(notifications, { id });
        if (notification) {
            const notificationIndex = _.indexOf(notifications, notification);
            notifications = notifications.slice();
            notifications.splice(notificationIndex, 1);

            this.trigger(notifications);
        }
    },

    reset() {
        notifications = [];
        currentId     = 0;
        _.forOwn(timers, (timer, id) => {
            clearTimer(id);
        });
    }
});


export default NotificationsStore;
