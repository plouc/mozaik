import {
    SETTINGS_SET
} from '../actions/settingsActions'


export default function settings(state = {
    theme: 'solarized dark',
}, action) {
    switch (action.type) {
        case SETTINGS_SET:
            return {
                ...state,
                ...action.settings,
            }

        default:
            return state
    }
}
