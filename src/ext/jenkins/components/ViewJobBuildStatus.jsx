var React  = require('react');
var moment = require('moment');

var ViewJobBuildStatus = React.createClass({
    render() {
        if (!this.props.build) {
            return (
                <td className="table__cell">
                    <span className="jenkins__view__job__build__status jenkins__view__job__build__status--unknown">
                        <i className="fa fa-question-circle" />
                    </span>
                </td>
            );
        }

        var iconClasses   = 'fa fa-';
        switch (this.props.build.result) {
            case 'SUCCESS':
                iconClasses += 'check-circle';
                break;

            case 'FAILURE':
                iconClasses += 'warning';
                break;

            default:
                iconClasses += 'question-circle';
                break;
        }

        var statusClasses = 'jenkins__view__job__build__status ';
        statusClasses    += 'jenkins__view__job__build__status--' + this.props.build.result.toLowerCase();

        return (
            <td className="table__cell">
                <span className={statusClasses}>
                    <i className={iconClasses} />
                </span>
            </td>
        );
    }
});

module.exports = ViewJobBuildStatus;