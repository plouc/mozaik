import { connect } from 'react-redux'
import Mozaik from '../components/Mozaik'
import { fetchConfiguration } from '../actions/configurationActions'
import { play, pause, previous, next } from '../actions/dashboardsActions'
import { setTheme } from '../actions/themesActions'

const mapStateToProps = state => {
    const {
        configuration,
        dashboards: { dashboards, current, isPlaying },
        themes: { themes, current: currentTheme },
    } = state

    return {
        ...configuration,
        dashboards,
        currentDashboard: current,
        isPlaying,
        themes,
        currentTheme,
    }
}

const mapDispatchToProps = dispatch => ({
    fetchConfiguration: () => {
        dispatch(fetchConfiguration())
    },
    play: () => {
        dispatch(play())
    },
    pause: () => {
        dispatch(pause())
    },
    previous: () => {
        dispatch(pause())
        dispatch(previous())
    },
    next: () => {
        dispatch(pause())
        dispatch(next())
    },
    setTheme: theme => {
        dispatch(setTheme(theme))
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Mozaik)
