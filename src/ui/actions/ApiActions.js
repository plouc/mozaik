export const API_SUBSCRIPTION        = 'API_SUBSCRIPTION'
export const BUFFER_API_SUBSCRIPTION = 'BUFFER_API_SUBSCRIPTION'
export const API_DATA                = 'API_DATA'

export const subscribeToApi = subscription => {
    return (dispatch, getState) => {
        const { ws } = getState()
        const type = ws.connected ? API_SUBSCRIPTION : BUFFER_API_SUBSCRIPTION

        dispatch({ type, subscription })
    }
}

export const receiveApiData = ({ id, body }) => ({
    type: API_DATA,
    id,
    data: body,
})