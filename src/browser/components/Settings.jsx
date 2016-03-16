import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import SettingsActions                 from './../actions/SettingsActions';
import SettingsStore                   from './../stores/SettingsStore';


class Settings extends Component {
    static displayName = 'Settings';

    constructor(props) {
        super(props);

        this.state = {
        };

        this.handleSelectTheme = this.handleSelectTheme.bind(this);
    }

    componentWillMount() {
        this.listenTo(SettingsStore, this.onSettingsStoreUpdate);
    }

    onSettingsStoreUpdate(settings) {
    }

    handleSelectTheme(theme) {
        SettingsActions.setTheme(theme);
    }

    render() {
        return (
            <div className="settings">
                <span className="settings__item" onClick={() => { this.handleSelectTheme('bordeau'); }}>bordeau</span>
                <span className="settings__item" onClick={() => { this.handleSelectTheme('light-grey'); }}>light-grey</span>
                <span className="settings__item" onClick={() => { this.handleSelectTheme('light-yellow'); }}>light-yellow</span>
                <span className="settings__item" onClick={() => { this.handleSelectTheme('night-blue'); }}>night-blue</span>
                <span className="settings__item" onClick={() => { this.handleSelectTheme('snow'); }}>snow</span>
                <span className="settings__item" onClick={() => { this.handleSelectTheme('yellow'); }}>yellow</span>
            </div>
        );
    }
}

reactMixin(Settings.prototype, ListenerMixin);


export default Settings;
