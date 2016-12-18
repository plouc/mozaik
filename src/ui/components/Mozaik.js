import React, { Component, PropTypes }  from 'react'
import Dashboard, { DashboardPropType } from './dashboard/Dashboard'
import DashboardHeader                  from './dashboard/DashboardHeader'
import WidgetsRegistry                  from './../WidgetsRegistry'
import Settings                         from './Settings'
import Notifications                    from '../containers/NotificationsContainer'


class Mozaik extends Component {
    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props)

        this.toggleSettings = this.toggleSettings.bind(this)

        this.state = {
            settingsOpened: false,
        }
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
            setSettings,
        } = this.props

        const { theme } = this.context

        const { settingsOpened } = this.state

        if (isLoading) {
            return (
                <div>loading config</div>
            )
        }

        const dashboardNodes = dashboards.map((dashboard, index) => (
            <Dashboard
                key={index}
                dashboard={dashboard}
                isCurrent={index === currentDashboard}
                registry={WidgetsRegistry}
            />
        ))

        const style = {
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
            <div style={style}>
                <DashboardHeader
                    title="test"
                    settingsOpened={settingsOpened}
                    toggleSettings={this.toggleSettings}
                />
                {dashboardNodes}
                <Settings
                    setSettings={setSettings}
                    opened={settingsOpened}
                />
                <Notifications />
            </div>
        )
    }
}

Mozaik.propTypes = {
    fetchConfiguration: PropTypes.func.isRequired,
    setSettings:        PropTypes.func.isRequired,
    isLoading:          PropTypes.bool.isRequired,
    dashboards:         PropTypes.arrayOf(DashboardPropType).isRequired,
    currentDashboard:   PropTypes.number.isRequired,
    configuration:      PropTypes.shape({}),
    theme:              PropTypes.string.isRequired,
}

Mozaik.defaultProps = {
    currentDashboard: 0,
}


export default Mozaik
