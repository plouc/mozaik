import React, { Component, PropTypes }  from 'react'
import { ListenerMixin }                from 'reflux'
import Dashboard, { DashboardPropType } from './dashboard'
import Notifications                    from './Notifications'


class Mozaik extends Component {
    componentWillMount() {
        const { fetchConfiguration } = this.props
        fetchConfiguration()
    }

    render() {
        const {
            isLoading,
            configuration,
        } = this.props

        if (isLoading) {
            return (
                <div>loading config</div>
            )
        }

        const dashboardNodes = configuration.dashboards.map((dashboard, index) => (
            <Dashboard key={index} dashboard={dashboard}/>
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
    configuration:      PropTypes.shape({
        dashboards: PropTypes.arrayOf(DashboardPropType).isRequired,
    }),
}


export default Mozaik
