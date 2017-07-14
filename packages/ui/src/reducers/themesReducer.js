import { THEME_SET } from '../actions/themesActions'

export default function themes(
    state = {
        current: null,
        themes: {},
    },
    action
) {
    switch (action.type) {
        case THEME_SET:
            return {
                ...state,
                current: action.theme,
            }

        default:
            return state
    }
}
