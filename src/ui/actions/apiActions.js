import { send } from './wsActions'


export const API_SUBSCRIPTION        = 'API_SUBSCRIPTION'
export const BUFFER_API_SUBSCRIPTION = 'BUFFER_API_SUBSCRIPTION'
export const API_DATA                = 'API_DATA'

export const subscribeToApi = subscription => {
    return dispatch => {
        dispatch({
            type: API_SUBSCRIPTION,
            subscription,
        })
        dispatch(send('api.subscription', subscription))
    }
}

export const receiveApiData = ({ id, data }) => ({
    type: API_DATA,
    id,
    data,
})
