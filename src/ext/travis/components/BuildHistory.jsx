var React            = require('react');
var Reflux           = require('reflux');
var moment           = require('moment');
var ApiConsumerMixin = require('./../../../core/mixins/ApiConsumerMixin');
var BuildHistoryItem = require('./BuildHistoryItem.jsx');

var BuildHistory = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    propTypes: {
        owner:      React.PropTypes.string.isRequired,
        repository: React.PropTypes.string.isRequired
    },

    getInitialState: function () {
        return {
            builds: []
        };
    },

    getApiRequest: function () {
        return {
            id: 'travis.buildHistory.' + this.props.owner + '.' + this.props.repository,
            params: {
                owner:      this.props.owner,
                repository: this.props.repository
            }
        };
    },

    onApiData: function (builds) {
        this.setState({
            builds: builds
        });
    },

    render: function () {
        var buildNodes = this.state.builds.map(function (build) {
            return (
                <BuildHistoryItem key={build.id} build={build} />
            );
        });

        return (
            <div>
                <div className="widget__header">
                    <span className="widget__header__subject">{this.props.owner}/{this.props.repository}</span> build history
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                    {buildNodes}
                </div>
            </div>
        );
    }
});

module.exports = BuildHistory;