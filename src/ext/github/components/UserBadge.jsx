var React            = require('react');
var Reflux           = require('reflux');
var _                = require('lodash');
var PullRequest      = require('./PullRequest.jsx');
var ApiConsumerMixin = require('./../../../core/mixins/ApiConsumerMixin');

var UserBadge = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    propTypes: {
        user: React.PropTypes.string.isRequired
    },

    getInitialState: function () {
        return { user: null };
    },

    getApiRequest: function () {
        return {
            id: 'github.user.' + this.props.user,
            params: { user: this.props.user }
        };
    },

    onApiData: function (user) {
        this.setState({ user: user });
    },

    render: function () {
        var userNode = (
            <div className="widget__body" />
        );

        if (this.state.user) {
            userNode = (
                <div className="widget__body">
                    <div className="github__user-badge__banner">
                        <span className="github__user-badge__avatar">
                            <img src={this.state.user.avatar_url} />
                        </span>
                    </div>
                    <div className="github__user-badge__info">
                        <ul className="widget__list">
                            <li>company: {this.state.user.company}</li>
                            <li>public repos: {this.state.user.public_repos}</li>
                            <li>public gists: {this.state.user.public_gists}</li>
                            <li>followers: {this.state.user.followers}</li>
                            <li>following: {this.state.user.following}</li>
                        </ul>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="widget__header">
                    {this.props.user}
                    <i className="fa fa-github" />
                </div>
                {userNode}
            </div>
        );
    }
});

module.exports = UserBadge;