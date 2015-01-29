var React            = require('react');
var Reflux           = require('reflux');
var _                = require('lodash');
var ApiConsumerMixin = require('./../../../core/mixins/ApiConsumerMixin');
var Treemap          = require('./../../../core/components/charts/Treemap.jsx');

var IssueLabelsTreemap = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    propTypes: {
        labels: React.PropTypes.arrayOf(React.PropTypes.shape({
            name:  React.PropTypes.string,
            color: React.PropTypes.string
        })).isRequired
    },

    getInitialState() {
        return {
            labels: []
        };
    },

    onApiData(labels) {
        this.setState({
            labels: labels
        });
    },

    getApiRequest() {
        return {
            id: `github.issueLabelsAggregations.${ _.pluck(this.props.labels, 'name').join('.') }`,
            params: {
                labels:     this.props.labels,
                repository: this.props.repository
            }
        };
    },

    render() {
        var data = this.state.labels.map(function (label) {
            return {
                label: label.name,
                count: label.count,
                color: label.color
            };
        });

        return (
            <div>
                <div className="widget__header">
                    Github issues types
                    <i className="fa fa-github" />
                </div>
                <div className="widget__body">
                    <Treemap data={{ children: data }} showCount={true} />
                </div>
            </div>
        );
    }
});

module.exports = IssueLabelsTreemap;