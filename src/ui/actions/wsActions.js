import { guessWSURL } from '../lib/WSHelper'
import {
    subscribeToApi,
    receiveApiData,
} from './apiActions'
import {
    notifyWarning,
    updateNotification,
    closeNotification,
} from './notificationsActions'
import {
    NOTIFICATION_STATUS_SUCCESS,
    NOTIFICATION_STATUS_WARNING,
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


export const WS_CONNECT         = 'WS_CONNECT'
export const WS_CONNECT_SUCCESS = 'WS_CONNECT_SUCCESS'
export const WS_DISCONNECTED    = 'WS_DISCONNECTED'
export const WS_RETRY           = 'WS_RETRY'

const connectSuccess = () => ({
    type: WS_CONNECT_SUCCESS,
})

const disconnected = () => ({
    type: WS_DISCONNECTED,
})

const retry = () => ({
    type: WS_RETRY,
})

let ws

const send = ({ id, params = {} }) => {
    ws.send(JSON.stringify({ id, params }))
}

export const connect = configuration => {
    const wsUrl = guessWSURL(configuration)

    return (dispatch, getState) => {
        dispatch({
            type: WS_CONNECT,
            wsUrl,
        })

        ws = new WebSocket(wsUrl)

        ws.onopen = () => {
            dispatch(connectSuccess())

            dispatch(updateNotification(WS_NOTIFICATION_ID, {
                status: NOTIFICATION_STATUS_SUCCESS,
                props:  {
                    status: WS_STATUS_CONNECTED,
                },
            }))
            dispatch(closeNotification(WS_NOTIFICATION_ID, 2000))

            const { api: { buffer } } = getState()
            buffer.forEach(subscription => {
                dispatch(subscribeToApi(subscription))
                send(subscription)
            })
        }

        ws.onmessage = event => {
            if (event.data !== '') {
                dispatch(receiveApiData(JSON.parse(event.data)))
            }
        }

        ws.onclose = () => {
            ws = null

            dispatch(disconnected())

            const { ws: { retryCount } } = getState()
            if (retryCount === WS_MAX_RETRIES) {
                return dispatch(updateNotification(WS_NOTIFICATION_ID, {
                    status: NOTIFICATION_STATUS_ERROR,
                    props:  {
                        retryCount,
                        status: WS_STATUS_FAILED,
                    },
                }))
            } else if (retryCount === 0) {
                dispatch(notifyWarning({
                    id:        WS_NOTIFICATION_ID,
                    component: ConnectionStatus,
                    ttl:       -1,
                    props:     {
                        retryCount: 0,
                        status:     WS_STATUS_DELAYING,
                    },
                }))
            } else {
                dispatch(updateNotification(WS_NOTIFICATION_ID, {
                    props: {
                        retryCount,
                        status: WS_STATUS_DELAYING,
                    },
                }))
            }

            setTimeout(() => {
                dispatch(retry())
                dispatch(connect(configuration))
            }, WS_RETRY_DELAY)
        }
    }
}
