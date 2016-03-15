import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Dashboard                       from './Dashboard.jsx';
import Timer                           from './Timer.jsx';
import ConfigStore                     from './../stores/ConfigStore';


class Mozaik extends Component {
    static displayName = 'Mozaik';

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

        let timerNode = null;
        if (config.dashboards.length > 1) {
            timerNode = <Timer />;
        }

        return (
            <div className="dashboard">
                {dashboardNodes}
            </div>
        );
    }
}

reactMixin(Mozaik.prototype, ListenerMixin);


export default Mozaik;
