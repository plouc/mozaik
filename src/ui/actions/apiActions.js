import { send } from './wsActions'


export const API_SUBSCRIBE   = 'API_SUBSCRIBE'
export const API_UNSUBSCRIBE = 'API_UNSUBSCRIBE'
export const API_DATA        = 'API_DATA'
export const API_FAILURE     = 'API_FAILURE'

export const subscribeToApi = subscription => {
    return (dispatch, getState) => {
        const { api } = getState()

        if (!api.get('subscriptions').has(subscription.id)) {
            dispatch({ type: API_SUBSCRIBE, subscription })
            dispatch(send('api.subscription', subscription))
        }
    }
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