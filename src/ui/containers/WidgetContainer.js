import { connect }   from 'react-redux'
import WidgetWrapper from '../components/widget/WidgetWrapper'
import {
    subscribeToApi,
    unsubscribeFromApi,
} from '../actions/apiActions'


const mapStateToProps = ({ themes: { current: theme }, api: { data, errors } }) => {
    return {
        // not used but needed to force refresh of context
        themeId:   theme,
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
)(WidgetWrapper)
