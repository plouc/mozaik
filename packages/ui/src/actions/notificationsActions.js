import _ from 'lodash'
import {
    NOTIFICATION_DEFAULT_TTL,
    NOTIFICATION_STATUS_UNKNOWN,
    NOTIFICATION_STATUS_SUCCESS,
    NOTIFICATION_STATUS_WARNING,
    NOTIFICATION_STATUS_ERROR,
} from '../constants/notificationsConstants'

export const NOTIFY = 'NOTIFY'
export const NOTIFICATION_UPDATE = 'NOTIFICATION_UPDATE'
export const NOTIFICATION_CLOSE = 'NOTIFICATION_CLOSE'

const uid = () =>
    Math.random()
        .toString(34)
        .slice(2)

const timers = {}
const clearTimer = id => {
    if (timers[id]) {
        clearTimeout(timers[id])
        delete timers[id]
    }
}

export const updateNotification = (id, notification) => ({
    type: NOTIFICATION_UPDATE,
    id,
    notification,
})

const addNotification = notification => ({
    type: NOTIFY,
    notification,
})

export const notify = notification => {
    return (dispatch, getState) => {
        const {
            notifications: { items },
        } = getState()

        if (!_.has(notification, 'id')) {
            notification.id = uid()
        }

        const existingNotification = _.find(items, { id: notification.id })
        if (existingNotification) {
            dispatch(updateNotification(notification.id, notification))
        } else {
            if (!_.has(notification, 'ttl')) {
                notification.ttl = NOTIFICATION_DEFAULT_TTL
            }

            if (!notification.status) {
                notification.status = NOTIFICATION_STATUS_UNKNOWN
            }

            dispatch(addNotification(notification))

            if (notification.ttl >= 0) {
                dispatch(closeNotification(notification.id, notification.ttl))
            }
        }
    }
}

export const notifySuccess = notification => {
    return dispatch => {
        dispatch(
            notify({
                ...notification,
                status: NOTIFICATION_STATUS_SUCCESS,
            })
        )
    }
}

export const notifyWarning = notification => {
    return dispatch => {
        dispatch(
            notify({
                ...notification,
                status: NOTIFICATION_STATUS_WARNING,
            })
        )
    }
}

export const notifyError = notification => {
    return dispatch => {
        dispatch(
            notify({
                ...notification,
                status: NOTIFICATION_STATUS_ERROR,
            })
        )
    }
}

const close = id => ({
    type: NOTIFICATION_CLOSE,
    id,
})

export const closeNotification = (id, delay = 0) => {
    return dispatch => {
        if (delay > 0) {
            clearTimer(id)
            timers[id] = setTimeout(() => {
                dispatch(close(id))
            }, delay)
        } else {
            dispatch(close(id))
        }
    }
}
