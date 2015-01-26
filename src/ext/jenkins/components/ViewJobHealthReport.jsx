var React  = require('react');
var moment = require('moment');

var ViewJobHealthReport = React.createClass({
    render() {
        if (this.props.job.healthReport.length === 0) {
            return <td className="table__cell">n/a</td>;
        }

        return <td className="table__cell">{this.props.job.healthReport[0].description}</td>;
    }
});

module.exports = ViewJobHealthReport;