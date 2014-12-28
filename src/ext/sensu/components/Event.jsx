var React = require('react');


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
    render: function () {
        var cssClasses = 'sensu__events__item sensu__events__item--status-';
        cssClasses += statusToClass(this.props.event.check.status);

        return (
            <div className={cssClasses}>
                {this.props.event.client.name}
            </div>
        );
    }
});

module.exports = Event;