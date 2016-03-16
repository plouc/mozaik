import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Dashboard                       from './Dashboard.jsx';
import Settings                        from './Settings.jsx';
import ConfigStore                     from './../stores/ConfigStore';
import SettingsStore                   from './../stores/SettingsStore';


import './../../styl/mozaik.styl';


class Mozaik extends Component {
    static displayName = 'Mozaik';

    constructor(props) {
        super(props);

        this.state = {
            theme:  SettingsStore.getTheme(),
            config: null
        };
    }

    componentWillMount() {
        this.listenTo(ConfigStore,   this.onConfigStoreUpdate);
        this.listenTo(SettingsStore, this.onSettingsStoreUpdate);
    }

    onConfigStoreUpdate(config) {
        this.setState({ config });
    }

    onSettingsStoreUpdate() {
        this.setState({
            theme: SettingsStore.getTheme()
        });
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
            <div className={`dashboard theme-${theme}`}>
                {dashboardNodes}
                <Settings />
            </div>
        );
    }
}

reactMixin(Mozaik.prototype, ListenerMixin);


export default Mozaik;
