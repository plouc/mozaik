var React            = require('react');
var Reflux           = require('reflux');
var _                = require('lodash');
var ApiConsumerMixin = require('./../../../core/mixins/ApiConsumerMixin');


/**
 * @see https://github.com/plouc/mozaik/wiki/Github-Widgets#github-user-badge
 */
var UserBadge = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    propTypes: {
        user: React.PropTypes.string.isRequired
    },

    getInitialState() {
        return {
            user: null
        };
    },

    getApiRequest() {
        return {
            id: 'github.user.' + this.props.user,
            params: {
                user: this.props.user
            }
        };
    },

    onApiData(user) {
        this.setState({
            user: user
        });
    },

    render() {
        var userNode = (<div className="widget__body" />);

        if (this.state.user) {
            userNode = (
                <div className="widget__body">
                    <div className="github__user-badge__banner">
                        <span className="github__user-badge__avatar">
                            <img src={this.state.user.avatar_url} />
                        </span>
                    </div>
                    <div className="github__user-badge__info">
                        <div className="github__user-badge__info__item">
                            <span className="count">{this.state.user.public_repos}</span>&nbsp;
                            public repos
                        </div>
                        <div className="github__user-badge__info__item">
                            <span className="count">{this.state.user.public_gists}</span>&nbsp;
                            public gists
                        </div>
                        <div className="github__user-badge__info__item">
                            <span className="count">{this.state.user.followers}</span>&nbsp;
                            followers
                        </div>
                        <div className="github__user-badge__info__item">
                            <span className="count">{this.state.user.following}</span>&nbsp;
                            following
                        </div>
                        <div className="github__user-badge__info__item">
                            company:&nbsp;
                            <span className="prop__value">{this.state.user.company}</span>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="widget__header">
                    <span className="widget__header__subject">{this.props.user}</span> github user
                    <i className="fa fa-github-alt" />
                </div>
                {userNode}
            </div>
        );
    }
});

module.exports = UserBadge;