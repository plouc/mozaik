import { connect } from 'react-redux'
import Widget      from '../components/Widget'
import {
    subscribeToApi,
    unsubscribeFromApi,
} from '../actions/apiActions'


const mapStateToProps = ({ api: { data, errors } }) => {
    return {
        apiData:   data,
        apiErrors: errors,
    }
}

const mapDispatchToProps = dispatch => ({
    subscribeToApi: subscriptionId => {
        dispatch(subscribeToApi(subscriptionId))
    },
    unsubscribeFromApi: subscriptionId => {
        dispatch(unsubscribeFromApi(subscriptionId))
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Widget)
