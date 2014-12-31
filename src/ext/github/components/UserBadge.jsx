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
                        <div className="github__user-badge__info__item">public repos: {this.state.user.public_repos}</div>
                        <div className="github__user-badge__info__item">public gists: {this.state.user.public_gists}</div>
                        <div className="github__user-badge__info__item">followers: {this.state.user.followers}</div>
                        <div className="github__user-badge__info__item">following: {this.state.user.following}</div>
                        <div className="github__user-badge__info__item">company: {this.state.user.company}</div>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="widget__header">
                    <span className="widget__header__subject">{this.props.user}</span> github user
                    <i className="fa fa-github" />
                </div>
                {userNode}
            </div>
        );
    }
});

module.exports = UserBadge;