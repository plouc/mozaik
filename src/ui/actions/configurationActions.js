import request     from 'superagent-bluebird-promise'
import { connect } from './wsActions'
import {
    setDashboards,
    play,
} from './dashboardsActions'
import {
    notifySuccess,
} from './notificationsActions'

export const FETCH_CONFIGURATION         = 'FETCH_CONFIGURATION'
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
        dispatch({
            type: FETCH_CONFIGURATION,
        })

        //http://localhost:5000/config
        return request.get('/config')
            .then(res => {
                const configuration = res.body

                dispatch(fetchConfigurationSuccess(res.body))
                dispatch(connect(configuration))
                dispatch(notifySuccess({
                    message: 'configuration loaded',
                    ttl:     2000,
                }))
                dispatch(setDashboards(configuration.dashboards))
                dispatch(play())
            })
            .catch(err => {
                dispatch(fetchConfigurationFailure(err.message))
            })
    }
}
