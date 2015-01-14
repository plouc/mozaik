var React            = require('react');
var Reflux           = require('reflux');
var _                = require('lodash');
var Branch           = require('./Branch.jsx');
var ApiConsumerMixin = require('./../../../core/mixins/ApiConsumerMixin');


/**
 * @see https://github.com/plouc/mozaik/wiki/Github-Widgets#github-repository-branches
 */
var Branches = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    propTypes: {
        repository: React.PropTypes.string.isRequired
    },

    getInitialState() {
        return {
            branches: []
        };
    },

    getApiRequest() {
        return {
            id: 'github.branches.' + this.props.repository,
            params: {
                repository: this.props.repository
            }
        };
    },

    onApiData(branches) {
        this.setState({
            branches: branches
        });
    },

    render() {
        var branchNodes = _.map(this.state.branches, branch => <Branch key={branch.name} branch={branch} />);

        var title = (
            <span>
                <span className="widget__header__subject">{this.props.repository}</span>&nbsp;branches
            </span>
        );

        return (
            <div>
                <div className="widget__header">
                    {this.props.title ? this.props.title : title}
                    <span className="widget__header__count">
                        {this.state.branches.length}
                    </span>
                    <i className="fa fa-code-fork" />
                </div>
                <div className="widget__body">
                    {branchNodes}
                </div>
            </div>
        );
    }
});

module.exports = Branches;