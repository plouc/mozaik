import {
    API_SUBSCRIPTION,
    BUFFER_API_SUBSCRIPTION,
    API_DATA,
} from '../actions/apiActions'


export default function configuration(state = {
    history: [],
    buffer:  [],
    data:    {},
}, action) {
    switch (action.type) {
        case API_SUBSCRIPTION:
            return {
                ...state,
                history: [...state.history, action.subscription],
            }

        case BUFFER_API_SUBSCRIPTION:
            return {
                ...state,
                buffer: [...state.buffer,  action.subscription],
            }

        case API_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.id]: action.data,
                },
            }

        default:
            return state
    }
}
