var React  = require('react');
var moment = require('moment');


/**
 * @param {Number} statusId
 * @returns {string}
 */
function statusToClass(statusId) {
    switch (statusId) {
        case 0: return 'ok';
        case 1: return 'warning';
        case 2: return 'critical';
        break;
    }

    return 'unknown'
}

var Event = React.createClass({
    render() {
        var cssClasses = 'list__item list__item--with-status sensu__events__item list__item--with-status--';
        cssClasses += statusToClass(this.props.event.check.status);

        return (
            <div className={cssClasses}>
                {this.props.event.client.name}<br />
                {this.props.event.check.name}<br />
                <span className="sensu__events__item__output">{this.props.event.check.output}</span>
                <time className="list__item__time">
                    <i className="fa fa-clock-o" />&nbsp;
                    {moment.unix(this.props.event.check.executed).format('YY-MM-DD HH:mm:ss')}
                </time>
            </div>
        );
    }
});

module.exports = Event;