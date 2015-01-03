var React            = require('react');
var _                = require('lodash');
var Dashboard        = require('./Dashboard.jsx');
var Timer            = require('./Timer.jsx');
var DashboardActions = require('./../actions/DashboardActions');

var Mozaik = React.createClass({
    componentWillMount: function () {
        DashboardActions.setDashboards(this.props.config.dashboards);
        if (this.props.config.dashboards.length > 1) {
            DashboardActions.startRotation();
        }
    },

    render: function () {
        var dashboardNodes = _.map(this.props.config.dashboards, function (dashboard, index) {
            return (
                <Dashboard key={index} dashboard={dashboard} />
            );
        });

        var timerNode = null;
        if (this.props.config.dashboards.length > 1) {
            timerNode = (
                <Timer />
            );
        }

        return (
            <div className="hotboard">
                {dashboardNodes}
            </div>
        );
    }
});

module.exports = Mozaik;