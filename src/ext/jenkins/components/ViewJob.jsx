var React                = require('react');
var moment               = require('moment');
var ViewJobBuildStatus   = require('./ViewJobBuildStatus.jsx');
var ViewJobHealthReport  = require('./ViewJobHealthReport.jsx');
var ViewJobBuildTime     = require('./ViewJobBuildTime.jsx');
var ViewJobBuildDuration = require('./ViewJobBuildDuration.jsx');

var ViewJob = React.createClass({
    render() {
        return (
            <tr className="table__row">
                <ViewJobBuildStatus build={this.props.job.lastBuild} />
                <td className="table__cell">{this.props.job.displayName}</td>
                <ViewJobHealthReport job={this.props.job} />
                <ViewJobBuildTime build={this.props.job.lastSuccessfulBuild} />
                <ViewJobBuildTime build={this.props.job.lastFailedBuild} />
                <ViewJobBuildDuration build={this.props.job.lastBuild} />
            </tr>
        );
    }
});

module.exports = ViewJob;