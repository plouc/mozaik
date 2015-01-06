var React  = require('react');
var moment = require('moment');

var JobBuild = React.createClass({
    render() {
        var classes = 'list__item list__item--with-status list__item--with-status--' + this.props.build.result.toLowerCase();

        return (
            <div className={classes}>
                #{this.props.build.number} {this.props.build.result}&nbsp;
                <time className="list__item__time">
                    <i className="fa fa-clock-o" />&nbsp;
                    {moment(this.props.build.timestamp, 'x').fromNow()}
                </time>
            </div>
        );
    }
});

module.exports = JobBuild;