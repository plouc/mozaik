import {
    SET_DASHBOARDS,
    SET_CURRENT_DASHBOARD,
} from '../actions/dashboardsActions'


export default function dashboards(state = {
    dashboards: [],
    current:    0,
}, action) {
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

        default:
            return state
    }
}
