import Reflux           from 'reflux';
import SettingsActions  from './../actions/SettingsActions';


const settings = {
    theme: 'night-blue'
};


const SettingsStore = Reflux.createStore({
    listenables: SettingsActions,

    setTheme(theme) {
        settings.theme = theme;

        this.trigger(settings);
    },

    getTheme() {
        return settings.theme;
    }
});


export default SettingsStore;
