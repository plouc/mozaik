var React = require('react');

var JobBuild = React.createClass({
    render() {
        return (
            <div className="jenkins__job__build">
                #{this.props.build.number}
            </div>
        );
    }
});

module.exports = JobBuild;