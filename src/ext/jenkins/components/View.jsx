var React            = require('react');
var Reflux           = require('reflux');
var ViewJobs         = require('./ViewJobs.jsx');
var ApiConsumerMixin = require('./../../../core/mixins/ApiConsumerMixin');

var View = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    propTypes: {
        view: React.PropTypes.string.isRequired
    },

    getInitialState() {
        return {
            view: null
        };
    },

    getApiRequest() {
        return {
            id: 'jenkins.view.' + this.props.view,
            params: {
                view: this.props.view
            }
        };
    },

    onApiData(view) {
        this.setState({
            view: view
        });
    },

    render() {
        var titleNode = (
            <span>
                Jenkins <span className="widget__header__subject">{this.props.view}</span> view
            </span>
        );
        if (this.props.title) {
            titleNode = this.props.title;
        }

        var jobsNode = null;
        if (this.state.view) {
            jobsNode = <ViewJobs jobs={this.state.view.jobs} />
        }

        return (
            <div>
                <div className="widget__header">
                    {titleNode}
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                    {jobsNode}
                </div>
            </div>
        );
    }
});

module.exports = View;