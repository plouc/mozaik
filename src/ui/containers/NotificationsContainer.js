import { connect }   from 'react-redux'
import Notifications from '../components/notifications/Notifications'
import {
    fetchConfiguration
} from '../actions/configurationActions'


const mapStateToProps = state => {
    const {
        notifications: {
            items,
        }
    } = state

    return {
        notifications: items,
    }
}

const mapDispatchToProps = dispatch => ({
    /*
    fetchConfiguration: () => {
        dispatch(fetchConfiguration())
    },
    */
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notifications)
