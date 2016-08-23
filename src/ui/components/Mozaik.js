import React, { Component, PropTypes }  from 'react'
import { ListenerMixin }                from 'reflux'
import Dashboard, { DashboardPropType } from './dashboard'
import ComponentRegistry                from './../componentRegistry'
import Notifications                    from '../containers/NotificationsContainer'


class Mozaik extends Component {
    componentWillMount() {
        const { fetchConfiguration } = this.props
        fetchConfiguration()
    }

    render() {
        const {
            isLoading,
            dashboards,
            currentDashboard,
        } = this.props

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
                registry={ComponentRegistry}
            />
        ))

        return (
            <div className="dashboard">
                {dashboardNodes}
                <Notifications />
            </div>
        )
    }
}

Mozaik.propTypes = {
    fetchConfiguration: PropTypes.func.isRequired,
    isLoading:          PropTypes.bool.isRequired,
    dashboards:         PropTypes.arrayOf(DashboardPropType).isRequired,
    currentDashboard:   PropTypes.number.isRequired,
    configuration:      PropTypes.shape({}),
}

Mozaik.defaultProps = {
    currentDashboard: 0,
}


export default Mozaik
