var React                     = require('react');
var Reflux                    = require('reflux');
var _                         = require('lodash');
var RepositoryContributorStat = require('./RepositoryContributorStat.jsx');
var ApiConsumerMixin          = require('./../../../core/mixins/ApiConsumerMixin');

var RepositoryContributorsStats = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    propTypes: {
        repository: React.PropTypes.string.isRequired
    },

    getInitialState() {
        return {
            contributors: []
        };
    },

    getApiRequest() {
        return {
            id: 'github.repositoryContributorsStats.' + this.props.repository,
            params: {
                repository: this.props.repository
            }
        };
    },

    onApiData(contributors) {
        contributors.sort((contribA, contribB) => {
            return contribB.total - contribA.total;
        });

        this.setState({
            contributors: contributors
        });
    },

    render() {
        var contributorNodes = _.map(this.state.contributors, contributor => {
            return <RepositoryContributorStat key={contributor.id} contributor={contributor} />;
        });

        return (
            <div>
                <div className="widget__header">
                    Contributors
                    <span className="widget__header__count">
                        {this.state.contributors.length}
                    </span>
                    <i className="fa fa-github-alt" />
                </div>
                <div className="widget__body">
                    {contributorNodes}
                </div>
            </div>
        );
    }
});

module.exports = RepositoryContributorsStats;