import request     from 'superagent'
import { connect } from '../actions/wsActions'

export const FETCH_CONFIGURATION         = 'FETCH_CONFIGURATION'
export const FETCH_CONFIGURATION_SUCCESS = 'FETCH_CONFIGURATION_SUCCESS'
export const FETCH_CONFIGURATION_FAILURE = 'FETCH_CONFIGURATION_FAILURE'

const fetchConfigurationSuccess = configuration => ({
    type: FETCH_CONFIGURATION_SUCCESS,
    configuration,
})

const fetchConfigurationFailure = error => ({
    type: FETCH_CONFIGURATION_FAILURE,
    error,
})

export const fetchConfiguration = () => dispatch => {
    dispatch({
        type: FETCH_CONFIGURATION,
    })

    request.get('http://localhost:5000/config')
        .end((error, res) => {
            if (error) {
                dispatch(fetchConfigurationFailure(error))
            } else {
                const configuration = res.body

                dispatch(fetchConfigurationSuccess(res.body))
                dispatch(connect(configuration))
            }
        })
}