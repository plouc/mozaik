import { connect } from 'react-redux'
import Mozaik      from '../components/Mozaik'
import {
    fetchConfiguration
} from '../actions/configurationActions'


const mapStateToProps = state => {
    const { configuration } = state

    return { ...configuration }
}

const mapDispatchToProps = dispatch => ({
    fetchConfiguration: () => {
        dispatch(fetchConfiguration())
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Mozaik)
