var Reflux           = require('reflux');
var _                = require('lodash');
var config           = require('./../../../config');
var DashboardActions = require('./../actions/DashboardActions');

var _dashboards   = [];
var _currentIndex = 0;

var DashboardStore = Reflux.createStore({
    init: function () {
        this.listenTo(DashboardActions.setDashboards,     this.setDashboards);
        this.listenTo(DashboardActions.previousDashboard, this.previousDashboard);
        this.listenTo(DashboardActions.nextDashboard,     this.nextDashboard);
        this.listenTo(DashboardActions.startRotation,     this.startRotation);
    },

    startRotation: function () {
        setInterval(function () {
            this.nextDashboard();
        }.bind(this), config.rotationDuration);
    },

    previousDashboard: function () {
        _currentIndex--;
        this.trigger(_currentIndex);
    },

    nextDashboard: function () {
        if (_currentIndex < _dashboards.length - 1) {
            _currentIndex++;
        } else {
            _currentIndex = 0;
        }

        this.trigger(_currentIndex);
    },

    setDashboards: function (dashboards) {
        _.forEach(dashboards, function (dashboard, index) {
            dashboard.index = index;
        });

        _dashboards   = dashboards;
        _currentIndex = 0;

        this.trigger(_currentIndex);
    },

    currentIndex: function () {
        return _currentIndex;
    }
});

module.exports = DashboardStore;