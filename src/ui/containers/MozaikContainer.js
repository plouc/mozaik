import { connect }            from 'react-redux'
import Mozaik                 from '../components/Mozaik'
import { fetchConfiguration } from '../actions/configurationActions'
import { setSettings }        from '../actions/settingsActions'


const mapStateToProps = state => {
    const {
        configuration,
        dashboards: {
            dashboards,
            current,
        },
        settings: {
            theme,
        },
    } = state

    return {
        ...configuration,
        dashboards,
        currentDashboard: current,
        theme,
    }
}

const mapDispatchToProps = dispatch => ({
    fetchConfiguration: () => {
        dispatch(fetchConfiguration())
    },
    setSettings: settings => {
        dispatch(setSettings(settings))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Mozaik)
