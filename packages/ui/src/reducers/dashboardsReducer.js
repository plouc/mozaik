import {
    SET_DASHBOARDS,
    SET_CURRENT_DASHBOARD,
    DASHBOARDS_PLAY,
    DASHBOARDS_PAUSE,
} from '../actions/dashboardsActions'

export default function dashboards(
    state = {
        dashboards: [],
        current: 0,
        isPlaying: false,
    },
    action
) {
    switch (action.type) {
        case SET_DASHBOARDS:
            return {
                ...state,
                dashboards: action.dashboards,
            }

        case SET_CURRENT_DASHBOARD:
            return {
                ...state,
                current: action.index,
            }

        case DASHBOARDS_PLAY:
            return {
                ...state,
                isPlaying: true,
            }

        case DASHBOARDS_PAUSE:
            return {
                ...state,
                isPlaying: false,
            }

        default:
            return state
    }
}
