var React            = require('react');
var Reflux           = require('reflux');
var moment           = require('moment');
var ApiConsumerMixin = require('./../../../core/mixins/ApiConsumerMixin');

var JobStatus = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    propTypes: {
        job: React.PropTypes.string.isRequired
    },

    getInitialState() {
        return {
            builds: []
        };
    },

    getApiRequest() {
        return {
            id: 'jenkins.job.' + this.props.job,
            params: {
                job: this.props.job
            }
        };
    },

    onApiData(builds) {
        this.setState({
            builds: builds
        });
    },

    render() {
        var iconClasses = 'fa fa-close';
        var currentStatusNode = null;

        if (this.state.builds.length > 0) {
            var currentBuild = this.state.builds[0];
            if (currentBuild.result === 'SUCCESS') {
                iconClasses = 'fa fa-check';
            }

            var statusClasses = 'jenkins__job-status__current__status jenkins__job-status__current__status--' + currentBuild.result.toLowerCase();

            currentStatusNode = (
                <div className="jenkins__job-status__current">
                    Build #{currentBuild.number}<br />
                    <span className={statusClasses}>
                        {currentBuild.result}&nbsp;
                        <i className={iconClasses} />
                    </span><br/>
                    <time className="jenkins__job-status__current__time">
                        <i className="fa fa-clock-o" />&nbsp;
                        {moment(currentBuild.timestamp, 'x').fromNow()}
                    </time>
                </div>
            );
        }

        return (
            <div>
                <div className="widget__header">
                    {this.props.title || `Jenkins job ${ this.props.job }`}
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                    {currentStatusNode}
                </div>
            </div>
        );
    }
});

module.exports = JobStatus;