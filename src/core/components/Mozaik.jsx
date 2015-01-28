var React       = require('react');
var Reflux      = require('reflux');
var _           = require('lodash');
var Dashboard   = require('./Dashboard.jsx');
var Timer       = require('./Timer.jsx');
var ConfigStore = require('./../stores/ConfigStore');

var Mozaik = React.createClass({
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
        if (this.state.config === null) {
            return null;
        }

        var dashboardNodes = _.map(this.state.config.dashboards, (dashboard, index) => {
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

module.exports = Mozaik;