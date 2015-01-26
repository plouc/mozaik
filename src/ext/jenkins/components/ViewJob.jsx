var React = require('react');

var ViewJob = React.createClass({
    render() {
        var healthReportNode = <td></td>;
        if (this.props.job.healthReport.length > 0) {
            healthReportNode = <td className="table__cell">{this.props.job.healthReport[0].description}</td>
        }

        var statusNode = <td></td>
        if (this.props.job.lastBuild) {
            var statusClasses = 'status__icon status__icon--' + this.props.job.lastBuild.result.toLowerCase();
            statusNode = (
                <td className="table__cell">
                    <span className={statusClasses}>{this.props.job.lastBuild.result}</span>
                </td>
            );
        }

        return (
            <tr className="table__row">
                {statusNode}
                <td className="table__cell">{this.props.job.displayName}</td>
                {healthReportNode}
            </tr>
        );
    }
});

module.exports = ViewJob;