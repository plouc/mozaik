import { WS_CONNECT, WS_CONNECT_SUCCESS, WS_DISCONNECTED } from '../actions/wsActions'

export default function ws(
    state = {
        connected: false,
        connecting: false,
    },
    action
) {
    switch (action.type) {
        case WS_CONNECT:
            return {
                ...state,
                connecting: true,
            }

        case WS_CONNECT_SUCCESS:
            return {
                ...state,
                connected: true,
                connecting: false,
            }

        case WS_DISCONNECTED:
            return {
                ...state,
                connected: false,
            }

        default:
            return state
    }
}
