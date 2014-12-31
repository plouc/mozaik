var React  = require('react');
var moment = require('moment');

var BuildHistoryItem = React.createClass({
    render: function () {

        var commitNode = null;
        if (this.props.build.commit) {
            commitNode = (
                <span className="travis__build-history__item__message">{this.props.build.commit.message}</span>
            );
        }

        var cssClasses = 'list__item list__item--with-status travis__build-history__item travis__build-history__item--' + this.props.build.state;

        return (
            <div className={cssClasses}>
                #{this.props.build.number} {commitNode}
                <time className="list__item__time list__item__time--inline">{moment(this.props.build.finished_at).fromNow()}</time>
            </div>
        );
    }
});

module.exports = BuildHistoryItem;