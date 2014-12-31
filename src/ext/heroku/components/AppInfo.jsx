var React            = require('react');
var Reflux           = require('reflux');
var ApiConsumerMixin = require('./../../../core/mixins/ApiConsumerMixin');

var AppInfo = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    propTypes: {
        app: React.PropTypes.string.isRequired
    },

    getInitialState: function () {
        return {
            appInfo: []
        };
    },

    getApiRequest: function () {
        return {
            id: 'heroku.appInfo.' + this.props.app,
            params: {
                app: this.props.app
            }
        };
    },

    onApiData: function (appInfo) {
        this.setState({
            appInfo: appInfo
        });
    },

    render: function () {

        return (
            <div>
                <div className="widget__header">
                    {this.props.app} heroku app
                </div>
            </div>
        );
    }
});

module.exports = AppInfo;