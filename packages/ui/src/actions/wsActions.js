import { guessWSURL } from '../lib/WSHelper'
import SocketIO from 'socket.io-client'
import {
    receiveApiData,
    apiFailure,
    sendPendingSubscriptions,
    allSubscriptionsUnsubscribed,
} from './apiActions'
import { setDashboards } from './dashboardsActions'
import { fetchConfigurationSuccess } from './configurationActions'
import {
    notifySuccess,
    notifyWarning,
    updateNotification,
    closeNotification,
} from './notificationsActions'
import {
    NOTIFICATION_STATUS_SUCCESS,
    NOTIFICATION_STATUS_ERROR,
} from '../constants/notificationsConstants'
import ConnectionStatus from '../components/ConnectionStatus'
import {
    WS_NOTIFICATION_ID,
    WS_MAX_RETRIES,
    WS_RETRY_DELAY,
    WS_STATUS_CONNECTED,
    WS_STATUS_DELAYING,
    WS_STATUS_FAILED,
} from '../constants/wsConstants'

export const WS_CONNECT = 'WS_CONNECT'
export const WS_CONNECT_SUCCESS = 'WS_CONNECT_SUCCESS'
export const WS_DISCONNECTED = 'WS_DISCONNECTED'

const connectSuccess = () => dispatch => {
    dispatch({ type: WS_CONNECT_SUCCESS })
    dispatch(sendPendingSubscriptions())
}

const disconnected = () => dispatch => {
    dispatch({ type: WS_DISCONNECTED })
    dispatch(allSubscriptionsUnsubscribed())
}

let socket

export const send = (type, data) => () => {
    socket.emit(type, data)
}

export const connect = configuration => {
    const wsUrl = guessWSURL(configuration)
    let reconnectionAttempts =
        'reconnectionAttempts' in configuration
            ? configuration.reconnectionAttempts
            : WS_MAX_RETRIES
    return dispatch => {
        dispatch({
            type: WS_CONNECT,
            wsUrl,
        })
        socket = SocketIO(wsUrl, {
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: reconnectionAttempts,
            reconnectionDelay: WS_RETRY_DELAY,
            reconnectionDelayMax: WS_RETRY_DELAY,
            randomizationFactor: 0,
        })

        socket.on('connect', () => {
            dispatch(connectSuccess())
        })

        socket.on('api.data', data => {
            if (data) dispatch(receiveApiData(data))
        })

        socket.on('api.error', data => {
            if (data) dispatch(apiFailure(data))
        })

        socket.on('error', error => {
            // eslint-disable-next-line no-console
            console.error('Socket error', error.code, error)
        })

        socket.on('configuration', configuration => {
            dispatch(fetchConfigurationSuccess(configuration))
            dispatch(setDashboards(configuration.dashboards))
            dispatch(
                notifySuccess({
                    message: 'configuration updated',
                    ttl: 2000,
                })
            )
        })

        socket.on('disconnect', () => {
            // eslint-disable-next-line no-console
            console.warn('disconnected')
            dispatch(disconnected())
            dispatch(
                notifyWarning({
                    id: WS_NOTIFICATION_ID,
                    component: ConnectionStatus,
                    ttl: -1,
                    props: {
                        reconnectionAttempts: reconnectionAttempts,
                        retryCount: 0,
                        status: WS_STATUS_DELAYING,
                    },
                })
            )
        })

        socket.on('reconnecting', attempt => {
            dispatch(
                updateNotification(WS_NOTIFICATION_ID, {
                    props: {
                        retryCount: attempt,
                        status: WS_STATUS_DELAYING,
                    },
                })
            )
        })

        socket.on('reconnect_failed', () => {
            dispatch(
                updateNotification(WS_NOTIFICATION_ID, {
                    status: NOTIFICATION_STATUS_ERROR,
                    props: {
                        retryCount: WS_MAX_RETRIES,
                        status: WS_STATUS_FAILED,
                    },
                })
            )
        })

        socket.on('reconnect', () => {
            dispatch(
                updateNotification(WS_NOTIFICATION_ID, {
                    status: NOTIFICATION_STATUS_SUCCESS,
                    props: {
                        status: WS_STATUS_CONNECTED,
                    },
                })
            )
            dispatch(closeNotification(WS_NOTIFICATION_ID, 2000))
        })
    }
}
