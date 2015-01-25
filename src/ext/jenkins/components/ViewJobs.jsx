var React   = require('react');
var ViewJob = require('./ViewJob.jsx');

var ViewJobs = React.createClass({
    render() {
        var jobNodes = this.props.jobs.map(job => {
            return <ViewJob job={job} key={job.name} />
        });

        return (
            <table>
                {jobNodes}
            </table>
        );
    }
});

module.exports = ViewJobs;