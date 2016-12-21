import React, { Component, PropTypes }  from 'react'
import Dashboard, { DashboardPropType } from './dashboard/Dashboard'
import DashboardHeader                  from './dashboard/DashboardHeader'
import WidgetsRegistry                  from './../WidgetsRegistry'
import Settings                         from './Settings/Settings'
import Notifications                    from '../containers/NotificationsContainer'
import { TransitionMotion, spring }     from 'react-motion'


export default class Mozaik extends Component {
    static propTypes = {
        fetchConfiguration: PropTypes.func.isRequired,
        isLoading:          PropTypes.bool.isRequired,
        dashboards:         PropTypes.arrayOf(DashboardPropType).isRequired,
        currentDashboard:   PropTypes.number.isRequired,
        isPlaying:          PropTypes.bool.isRequired,
        play:               PropTypes.func.isRequired,
        pause:              PropTypes.func.isRequired,
        previous:           PropTypes.func.isRequired,
        next:               PropTypes.func.isRequired,
        configuration:      PropTypes.shape({}),
        themes:             PropTypes.object.isRequired,
        currentTheme:       PropTypes.string.isRequired,
        setTheme:           PropTypes.func.isRequired,
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props)

        this.toggleSettings = this.toggleSettings.bind(this)

        this.state = { settingsOpened: false }
    }

    toggleSettings() {
        const { settingsOpened } = this.state
        this.setState({ settingsOpened: !settingsOpened })
    }

    componentDidMount() {
        const { fetchConfiguration } = this.props
        fetchConfiguration()
    }

    render() {
        const {
            isLoading,
            dashboards,
            currentDashboard,
            isPlaying,
            play, pause, previous, next,
            themes,
            currentTheme,
            setTheme,
        } = this.props

        const { theme } = this.context

        const { settingsOpened } = this.state

        let content = <div>loading</div>
        if (!isLoading && dashboards.length > 0) {
            content = (
                <Dashboard
                    dashboard={dashboards[currentDashboard]}
                    dashboardIndex={currentDashboard}
                    registry={WidgetsRegistry}
                />
            )
        }

        const rootStyle = {
            position:        'absolute',
            top:             0,
            bottom:          0,
            left:            0,
            height:          '100%',
            width:           '100%',
            font:            theme.fonts.default,
            backgroundColor: theme.colors.background,
            color:           theme.colors.text,
        }

        return (
            <div style={rootStyle}>
                <DashboardHeader
                    settingsOpened={settingsOpened}
                    toggleSettings={this.toggleSettings}
                    dashboards={dashboards}
                    currentDashboardIndex={currentDashboard}
                    isPlaying={isPlaying}
                    play={play}
                    pause={pause}
                    previous={previous}
                    next={next}
                />
                {content}
                <Settings
                    themes={themes}
                    currentTheme={currentTheme}
                    setTheme={setTheme}
                    opened={settingsOpened}
                    close={this.toggleSettings}
                />
                <Notifications />
            </div>
        )
    }
}
