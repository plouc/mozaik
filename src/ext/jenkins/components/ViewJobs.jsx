var React   = require('react');
var ViewJob = require('./ViewJob.jsx');

var ViewJobs = React.createClass({
    render() {
        var jobNodes = this.props.jobs.map(job => {
            return <ViewJob job={job} key={job.name} />
        });

        return (
            <table className="table">
                <thead>
                    <tr className="table__row table__row--head">
                        <th className="table__cell table__cell--head"></th>
                        <th className="table__cell table__cell--head">job</th>
                        <th className="table__cell table__cell--head">health</th>
                        <th className="table__cell table__cell--head">last success</th>
                        <th className="table__cell table__cell--head">last fail</th>
                        <th className="table__cell table__cell--head">last duration</th>
                    </tr>
                </thead>
                {jobNodes}
            </table>
        );
    }
});

module.exports = ViewJobs;