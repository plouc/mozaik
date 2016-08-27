export const SET_DASHBOARDS        = 'SET_DASHBOARDS'
export const SET_CURRENT_DASHBOARD = 'SET_CURRENT_DASHBOARD'


export const setDashboards = dashboards => ({
    type: SET_DASHBOARDS,
    dashboards,
})

const setCurrentDashboard = index => {
    return {
        type: SET_CURRENT_DASHBOARD,
        index,
    }
}

const nextDashboard = (interval, dispatch, getState) => {
    setTimeout(() => {
        const { dashboards: { dashboards, current } } = getState()

        let next
        if (current < dashboards.length - 1) {
            next = current + 1
        } else {
            next = 0
        }

        dispatch(setCurrentDashboard(next))
        nextDashboard(interval, dispatch, getState)
    }, interval)
}

export const startDashboardRotation = interval => {
    return (dispatch, getState) => {
        const { dashboards: { dashboards } } = getState()
        if (dashboards.length > 1) {
            nextDashboard(interval, dispatch, getState)
        }
    }
}

