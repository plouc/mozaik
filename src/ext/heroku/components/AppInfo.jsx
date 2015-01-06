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

    getInitialState() {
        return {
            appInfo: null
        };
    },

    getApiRequest() {
        return {
            id: 'heroku.appInfo.' + this.props.app,
            params: {
                app: this.props.app
            }
        };
    },

    onApiData(appInfo) {
        this.setState({
            appInfo: appInfo
        });
    },

    render() {

        var infoNode = null;
        if (this.state.appInfo) {
            infoNode = (
                <ul className="list list--compact">
                    <li className="list__item">
                        created&nbsp;
                        <span className="prop__value">{moment(this.state.appInfo.created_at).fromNow()}</span>
                    </li>
                    <li className="list__item">
                        updated&nbsp;
                        <span className="prop__value">{moment(this.state.appInfo.updated_at).fromNow()}</span>
                    </li>
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