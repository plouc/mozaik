var React            = require('react');
var Reflux           = require('reflux');
var _                = require('lodash');
var moment           = require('moment');
var JobItem          = require('./JobItem.jsx');
var ApiConsumerMixin = require('./../../../core/mixins/ApiConsumerMixin');

var Jobs = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    getInitialState() {
        return {
            jobs: []
        };
    },

    getApiRequest() {
        return {
            id: 'jenkins.jobs'
        };
    },

    onApiData(jobs) {
        this.setState({
            jobs: jobs
        });
    },

    render() {
        var jobNodes = _.map(this.state.jobs, (job, index) => {
            return (<JobItem job={job} key={index} />);
        });

        return (
            <div>
                <div className="widget__header">
                    Jenkins jobs
                    <span className="widget__header__count">
                        {this.state.jobs.length}
                    </span>
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                    {jobNodes}
                </div>
            </div>
        );
    }
});

module.exports = Jobs;