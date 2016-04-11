import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Dashboard                       from './Dashboard.jsx';
import Notifications                   from './Notifications.jsx';
import ConfigStore                     from '../stores/ConfigStore';


class Mozaik extends Component {
    constructor(props) {
        super(props);

        this.state = { config: null };
    }

    componentWillMount() {
        this.listenTo(ConfigStore, this.onConfigStoreUpdate);
    }

    onConfigStoreUpdate(config) {
        this.setState({ config });
    }

    render() {
        const { config } = this.state;
        if (config === null) {
            return null;
        }

        const dashboardNodes = config.dashboards.map((dashboard, index) => (
            <Dashboard key={index} dashboard={dashboard} />
        ));

        const { theme } = this.state;

        return (
            <div className="dashboard">
                {dashboardNodes}
                <Notifications />
            </div>
        );
    }
}

Mozaik.displayName = 'Mozaik';

reactMixin(Mozaik.prototype, ListenerMixin);


export default Mozaik;
