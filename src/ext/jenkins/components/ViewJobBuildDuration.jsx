var React  = require('react');
var moment = require('moment');
require('moment-duration-format');

var ViewJobBuildDuration = React.createClass({
    render() {
        if (!this.props.build) {
            return <td className="table__cell">n/a</td>;
        }

        var formattedDuration = moment.duration(this.props.build.duration, 'ms').format('m [mn] s [s]');

        return <td className="table__cell">{formattedDuration}</td>;
    }
});

module.exports = ViewJobBuildDuration;