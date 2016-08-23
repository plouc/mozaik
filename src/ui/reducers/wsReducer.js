import {
    WS_CONNECT,
    WS_CONNECT_SUCCESS,
    WS_DISCONNECTED,
    WS_RETRY,
} from '../actions/wsActions'


export default function ws(state = {
    connected:  false,
    connecting: false,
    retryCount: 0,
}, action) {
    switch (action.type) {
        case WS_CONNECT:
            return {
                ...state,
                connecting: true,
            }

        case WS_CONNECT_SUCCESS:
            return {
                ...state,
                connected:  true,
                connecting: false,
                retryCount: 0,
            }

        case WS_DISCONNECTED:
            return {
                ...state,
                connected: false,
            }

        case WS_RETRY:
            return {
                ...state,
                retryCount: state.retryCount + 1,
            }

        default:
            return state
    }
}
