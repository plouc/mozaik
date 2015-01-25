var React = require('react');

var ViewJob = React.createClass({
    render() {
        return (
            <tr>
                <td>{this.props.job.displayName}</td>
            </tr>
        );
    }
});

module.exports = ViewJob;