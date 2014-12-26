var React    = require('react');
var _        = require('lodash');
var request  = require('superagent');
var JobBuild = require('./JobBuild.jsx');

var JobBuilds = React.createClass({
    getInitialState: function () {
        return {
            builds: []
        };
    },

    componentDidMount: function () {
        request.get('/jenkins/jobs/source-test')
            .end(function (res) {
                if (res.ok) {
                    this.setState({
                        builds: _.rest(res.body, res.body.length - 10)
                    });
                }
            }.bind(this))
        ;
    },

    render: function () {
        var buildNodes = _.map(this.state.builds, function (build) {
            return (
                <JobBuild build={build} key={build.number} />
            );
        });

        return (
            <div>
                <div className="widget__header">
                    Jenkins job build
                    <span className="widget__header__count">
                        {this.state.builds.length}
                    </span>
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                    {buildNodes}
                </div>
            </div>
        );
    }
});

module.exports = JobBuilds;