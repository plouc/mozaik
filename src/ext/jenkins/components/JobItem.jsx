var React       = require('react');
var _           = require('lodash');
var request     = require('superagent');
var moment      = require('moment');

var JobItem = React.createClass({
    render() {
        var buildNumber = <span>—</span>;
        var statusIcon  = <i className="fa fa-question-circle" />;
        var fromNow     = <time>—</time>;

        if (this.props.job.lastBuild) {
            buildNumber = <span className="jenkins__job__number">#{this.props.job.lastBuild.number}</span>;

            if (this.props.job.lastBuild.result === 'SUCCESS') {
                statusIcon = <i className="fa fa-check-circle" />;
            } else if (this.props.job.lastBuild.result === 'FAILURE') {
                statusIcon = <i className="fa fa-times-circle" />;
            } else if (this.props.job.lastBuild.result === 'ABORTED') {
                statusIcon = <i className="fa fa-minus-circle" />;
            }

            fromNow = <time>{moment(this.props.job.lastBuild.timestamp).fromNow()}</time>;
        }

        var classes = 'jenkins__job jenkins__job--' + (this.props.job.lastBuild ? this.props.job.lastBuild.result.toLowerCase() : 'unknown');

        return (
            <div className={classes}>
                {this.props.job.name} {buildNumber}<br />
                {fromNow}
            </div>
        )
    }
});

module.exports = JobItem;