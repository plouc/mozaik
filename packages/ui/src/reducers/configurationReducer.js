import { FETCH_CONFIGURATION, FETCH_CONFIGURATION_SUCCESS } from '../actions/configurationActions'

export default function configuration(
    state = {
        isLoading: true,
        configuration: null,
    },
    action
) {
    switch (action.type) {
        case FETCH_CONFIGURATION:
            return {
                ...state,
                isLoading: true,
            }

        case FETCH_CONFIGURATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                configuration: action.configuration,
            }

        default:
            return state
    }
}
