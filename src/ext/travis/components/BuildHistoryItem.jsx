var React = require('react');

var BuildHistoryItem = React.createClass({
    render: function () {

        var commitNode = null;
        if (this.props.build.commit) {
            commitNode = (
                <span className="travis__build-history__item__message">{this.props.build.commit.message}</span>
            );
        }

        var cssClasses = 'travis__build-history__item travis__build-history__item--' + this.props.build.state;

        return (
            <div className={cssClasses}>
                #{this.props.build.number} {commitNode}
            </div>
        );
    }
});

module.exports = BuildHistoryItem;