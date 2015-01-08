var React = require('react');

var RepositoryContributorStat = React.createClass({
    render() {
        return (
            <div className="list__item github__repository-contributors_stats__item">
                <img src={this.props.contributor.author.avatar_url} />
                {this.props.contributor.author.login}&nbsp;
                <span className="github__repository-contributors_stats__item__count">
                    {this.props.contributor.total}&nbsp;<i className="fa fa-dot-circle-o" />
                </span>
            </div>
        );
    }
});

module.exports = RepositoryContributorStat;