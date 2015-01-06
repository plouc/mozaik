var React = require('react');

var Stack = React.createClass({
    render() {
        return (
            <div className="aws__stack">
                {this.props.stack.StackName}
                {this.props.stack.StackStatus}
            </div>
        );
    }
});

module.exports = Stack;