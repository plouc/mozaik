import { guessWSURL } from '../lib/WSHelper'
import {
    subscribeToApi,
    receiveApiData,
} from './apiActions'

export const WS_CONNECT         = 'WS_CONNECT'
export const WS_CONNECT_SUCCESS = 'WS_CONNECT_SUCCESS'

const connectSuccess = () => ({
    type: WS_CONNECT_SUCCESS,
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

        const { api: { buffer } } = getState()

        ws.onopen = event => {
            dispatch(connectSuccess())
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

        ws.onclose = event => {
            ws = null

            /*
            clearRetryTimer()

            if (retryCount === 0) {
                NotificationsActions.notify({
                    id:        NOTIFICATION_ID,
                    component: ConnectionStatus,
                    status:    NOTIFICATION_STATUS_WARNING,
                    ttl:       -1
                })
            } else if (retryCount === CONNECTION_MAX_RETRIES) {
                ConnectionStatusActions.failed(retryCount)
                NotificationsActions.update(NOTIFICATION_ID, { status: NOTIFICATION_STATUS_ERROR })
                return
            }

            ConnectionStatusActions.delaying(retryCount, CONNECTION_RETRY_DELAY_SECONDS)
            NotificationsActions.update(NOTIFICATION_ID, { status: NOTIFICATION_STATUS_WARNING })

            retryTimer = setTimeout(() => {
                connectWS(config, store)
            }, CONNECTION_RETRY_DELAY_SECONDS * 1000)

            retryCount++
            */
        }
    }
}