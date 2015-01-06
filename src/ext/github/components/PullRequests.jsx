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

    propTypes: {
        repository: React.PropTypes.string.isRequired
    },

    getInitialState() {
        return {
            pullRequests: []
        };
    },

    getApiRequest() {
        return {
            id: 'github.pullRequests.' + this.props.repository,
            params: { repository: this.props.repository }
        };
    },

    onApiData(pullRequests) {
        this.setState({
            pullRequests: pullRequests
        });
    },

    render() {
        var pullRequestNodes = _.map(this.state.pullRequests, pullRequest => {
            return (<PullRequest key={pullRequest.id} pullRequest={pullRequest} />);
        });

        return (
            <div>
                <div className="widget__header">
                    Pull requests
                    <span className="widget__header__count">
                        {this.state.pullRequests.length}
                    </span>
                    <i className="fa fa-github-alt" />
                </div>
                <div className="widget__body">
                    {pullRequestNodes}
                </div>
            </div>
        );
    }
});

module.exports = PullRequests;