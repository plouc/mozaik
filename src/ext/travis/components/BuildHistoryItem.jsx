var React = require('react');

var BuildHistoryItem = React.createClass({
    render: function () {

        var commitNode = null;
        if (this.props.build.commit) {
            commitNode = (
                <div>{this.props.build.commit.message}</div>
            );
        }

        return (
            <div className="travis__build-history__item">
                #{this.props.build.number} {this.props.build.state}
                {commitNode}
            </div>
        );
    }
});

module.exports = BuildHistoryItem;