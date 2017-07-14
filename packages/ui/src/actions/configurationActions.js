import { connect } from './wsActions'
import { setDashboards, play } from './dashboardsActions'
import { notifySuccess, notifyError } from './notificationsActions'

export const FETCH_CONFIGURATION = 'FETCH_CONFIGURATION'
export const FETCH_CONFIGURATION_SUCCESS = 'FETCH_CONFIGURATION_SUCCESS'
export const FETCH_CONFIGURATION_FAILURE = 'FETCH_CONFIGURATION_FAILURE'

export const fetchConfigurationSuccess = configuration => ({
    type: FETCH_CONFIGURATION_SUCCESS,
    configuration,
})

const fetchConfigurationFailure = error => ({
    type: FETCH_CONFIGURATION_FAILURE,
    error,
})

export const fetchConfiguration = () => {
    return dispatch => {
        dispatch({ type: FETCH_CONFIGURATION })

        return fetch('/config')
            .then(res => {
                if (res.status !== 200) {
                    return Promise.reject(
                        new Error(
                            `Unable to fetch configuration: ${res.statusText} (${res.status})`
                        )
                    )
                }

                return res.json()
            })
            .then(configuration => {
                dispatch(fetchConfigurationSuccess(configuration))
                dispatch(connect(configuration))
                dispatch(
                    notifySuccess({
                        message: 'configuration loaded',
                        ttl: 2000,
                    })
                )
                dispatch(setDashboards(configuration.dashboards))
                dispatch(play())
            })
            .catch(err => {
                dispatch(
                    notifyError({
                        message: `An error occurred while fetching configuration: ${err.message}`,
                        ttl: -1,
                    })
                )
                dispatch(fetchConfigurationFailure(err.message))
            })
    }
}
