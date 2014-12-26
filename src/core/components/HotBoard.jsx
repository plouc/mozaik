var React           = require('react');
var _               = require('lodash');
var Sheet           = require('./Sheet.jsx');
var Timer           = require('./Timer.jsx');
var HotBoardActions = require('./../actions/HotBoardActions');

var HotBoard = React.createClass({
    componentWillMount: function () {
        HotBoardActions.setSheets(this.props.config.dashboards);
        if (this.props.config.dashboards.length > 1) {
            HotBoardActions.startRotation();
        }
    },

    render: function () {
        var sheetNodes = _.map(this.props.config.dashboards, function (dashboard, index) {
            return (
                <Sheet key={index} dashboard={dashboard} />
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
                {timerNode}
                {sheetNodes}
            </div>
        );
    }
});

module.exports = HotBoard;