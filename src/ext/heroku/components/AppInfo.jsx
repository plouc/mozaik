var React            = require('react');
var Reflux           = require('reflux');
var moment           = require('moment');
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
            appInfo: null
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

        var infoNode = null;
        if (this.state.appInfo) {
            infoNode = (
                <ul>
                    <li>created: {moment(this.state.appInfo.created_at).fromNow()}</li>
                    <li>updated: {moment(this.state.appInfo.updated_at).fromNow()}</li>
                </ul>
            );
        }

        return (
            <div>
                <div className="widget__header">
                    <span className="widget__header__subject">{this.props.app}</span> heroku app
                </div>
                <div className="widget__body">
                    {infoNode}
                </div>
            </div>
        );
    }
});

module.exports = AppInfo;