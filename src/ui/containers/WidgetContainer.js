import { connect } from 'react-redux'
import Widget      from '../components/Widget'
import {
    subscribeToApi,
} from '../actions/apiActions'


const mapStateToProps = ({ api: { data } }) => {
    return {
        apiData: data,
    }
}

const mapDispatchToProps = dispatch => ({
    subscribeToApi: requestId => {
        dispatch(subscribeToApi(requestId))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Widget)
