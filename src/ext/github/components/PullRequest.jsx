var React = require('react');

var PullRequest = React.createClass({
    render() {
        return (
            <div className="list__item github__pull-request">
                <span className="github__pull-request__avatar">
                    <img src={this.props.pullRequest.user.avatar_url} />
                </span>
                {this.props.pullRequest.title}
            </div>
        );
    }
});

module.exports = PullRequest;