import { send } from './wsActions'

export const API_SUBSCRIBE = 'API_SUBSCRIBE'
export const API_SUBSCRIBED = 'API_SUBSCRIBED'
export const API_UNSUBSCRIBE = 'API_UNSUBSCRIBE'
export const API_ALL_UNSUBSCRIBED = 'API_ALL_UNSUBSCRIBED'
export const API_DATA = 'API_DATA'
export const API_FAILURE = 'API_FAILURE'

export const subscribedToApi = subscription => ({
    type: API_SUBSCRIBED,
    subscription,
})

export const allSubscriptionsUnsubscribed = () => ({
    type: API_ALL_UNSUBSCRIBED,
})

export const subscribeToApi = subscription => {
    return (dispatch, getState) => {
        const { api, ws } = getState()

        if (!api.get('subscriptions').has(subscription.id)) {
            dispatch({ type: API_SUBSCRIBE, subscription })

            if (ws.connected !== true) return

            dispatch(send('api.subscription', subscription))
            dispatch(subscribedToApi(subscription))
        }
    }
}

export const sendPendingSubscriptions = () => (dispatch, getState) => {
    const { api, ws } = getState()

    if (ws.connected !== true) {
        // eslint-disable-next-line no-console
        console.error(`Cannot send pending subscriptions as ws is disconnected!`)
        return
    }

    api.get('subscriptions')
        .filter(s => !s.get('hasSubscribed'))
        .forEach(sub => {
            const subscription = sub.toJS()
            dispatch(send('api.subscription', subscription))
            dispatch(subscribedToApi(subscription))
        })
}

export const unsubscribeFromApi = id => {
    return (dispatch, getState) => {
        const { api } = getState()
        if (api.get('subscriptions').has(id)) {
            dispatch(send('api.unsubscription', { id }))
        }

        dispatch({
            type: API_UNSUBSCRIBE,
            id,
        })
    }
}

export const receiveApiData = ({ id, data }) => ({
    type: API_DATA,
    id,
    data,
})

export const apiFailure = ({ id, data }) => ({
    type: API_FAILURE,
    id,
    data,
})
