var React            = require('react');
var Reflux           = require('reflux');
var _                = require('lodash');
var PullRequest      = require('./PullRequest.jsx');
var ApiConsumerMixin = require('./../../../core/mixins/ApiConsumerMixin');

var PullRequests = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    getInitialState: function () {
        return { pullRequests: [] };
    },

    getApiRequest: function () {
        return {
            id: 'github.pullRequests.' + this.props.repository,
            params: { repository: this.props.repository }
        };
    },

    onApiData: function (pullRequests) {
        this.setState({ pullRequests: pullRequests });
    },

    render: function () {
        var pullRequestNodes = _.map(this.state.pullRequests, function (pullRequest) {
            return (
                <PullRequest key={pullRequest.id} pullRequest={pullRequest} />
            );
        });

        return (
            <div>
                <div className="widget__header">
                    Pull requests
                    <span className="widget__header__count">
                        {this.state.pullRequests.length}
                    </span>
                    <i className="fa fa-github" />
                </div>
                <div className="widget__body">
                    {pullRequestNodes}
                </div>
            </div>
        );
    }
});

module.exports = PullRequests;