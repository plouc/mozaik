import React, { Component } from 'react';
import Reflux               from 'reflux';
import Dashboard            from './Dashboard.jsx';
import Timer                from './Timer.jsx';
import ConfigStore          from './../stores/ConfigStore';


const Mozaik = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState() {
        return {
            config: null
        }
    },

    componentWillMount() {
        this.listenTo(ConfigStore, this.onConfigStoreUpdate);
    },

    onConfigStoreUpdate(config) {
        this.setState({
            config: config
        });
    },

    render() {
        console.log('Mozaik.render()', this.state);

        if (this.state.config === null) {
            return null;
        }

        var dashboardNodes = this.state.config.dashboards.map((dashboard, index) => {
            return <Dashboard key={index} dashboard={dashboard} />;
        });

        var timerNode = null;
        if (this.state.config.dashboards.length > 1) {
            timerNode = <Timer />;
        }

        return (
            <div className="dashboard">
                {dashboardNodes}
            </div>
        );
    }
});

Mozaik.displayName = 'Mozaik';


export default Mozaik;
