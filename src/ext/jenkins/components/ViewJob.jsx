var React = require('react');

var ViewJob = React.createClass({
    render() {
        var healthReportNode = <td></td>;
        if (this.props.job.healthReport.length > 0) {
            healthReportNode = <td className="table__cell">{this.props.job.healthReport[0].description}</td>
        }

        return (
            <tr>
                <td className="table__cell">{this.props.job.displayName}</td>
                {healthReportNode}
            </tr>
        );
    }
});

module.exports = ViewJob;