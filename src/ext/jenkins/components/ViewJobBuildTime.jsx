var React  = require('react');
var moment = require('moment');

var ViewJobBuildTime = React.createClass({
    render() {
        if (!this.props.build) {
            return <td className="table__cell">n/a</td>;
        }

        return <td className="table__cell">{moment(this.props.build.timestamp, 'x').fromNow()}</td>;
    }
});

module.exports = ViewJobBuildTime;