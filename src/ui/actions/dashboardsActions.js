export const SET_DASHBOARDS        = 'SET_DASHBOARDS'
export const SET_CURRENT_DASHBOARD = 'SET_CURRENT_DASHBOARD'
export const DASHBOARDS_PLAY       = 'DASHBOARDS_PLAY'
export const DASHBOARDS_PAUSE      = 'DASHBOARDS_PAUSE'


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

export const previous = () => {
    return (dispatch, getState) => {
        const {
            dashboards: { dashboards, current },
        } = getState()

        let prevIndex
        if (current > 0) {
            prevIndex = current - 1
        } else {
            prevIndex = dashboards.length - 1
        }

        dispatch(setCurrentDashboard(prevIndex))
    }
}

export const next = () => {
    return (dispatch, getState) => {
        const {
            configuration: { configuration },
            dashboards:    { dashboards, current, isPlaying },
        } = getState()
        const { rotationDuration } = configuration

        let nextIndex
        if (current < dashboards.length - 1) {
            nextIndex = current + 1
        } else {
            nextIndex = 0
        }

        dispatch(setCurrentDashboard(nextIndex))

        if (isPlaying) {
            setTimeout(() => { dispatch(next()) }, Number(rotationDuration))
        }
    }
}

export const play = () => {
    return (dispatch, getState) => {
        const {
            configuration: { configuration },
            dashboards:    { dashboards },
        } = getState()
        const { rotationDuration } = configuration

        if (dashboards.length > 1) {
            dispatch({ type: DASHBOARDS_PLAY })
            setTimeout(() => { dispatch(next()) }, Number(rotationDuration))
        }
    }
}

export const pause = () => ({ type: DASHBOARDS_PAUSE })

