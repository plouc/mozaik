var Reflux           = require('reflux');
var _                = require('lodash');
var config           = require('./../../../config');
var DashboardActions = require('./../actions/DashboardActions');

var _dashboards   = [];
var _currentIndex = 0;

var DashboardStore = Reflux.createStore({
    init() {
        this.listenTo(DashboardActions.setDashboards,     this.setDashboards);
        this.listenTo(DashboardActions.previousDashboard, this.previousDashboard);
        this.listenTo(DashboardActions.nextDashboard,     this.nextDashboard);
        this.listenTo(DashboardActions.startRotation,     this.startRotation);
    },

    startRotation() {
        setInterval(() => {
            this.nextDashboard();
        }, config.rotationDuration);
    },

    previousDashboard() {
        _currentIndex--;
        this.trigger(_currentIndex);
    },

    nextDashboard() {
        if (_currentIndex < _dashboards.length - 1) {
            _currentIndex++;
        } else {
            _currentIndex = 0;
        }

        this.trigger(_currentIndex);
    },

    setDashboards(dashboards) {
        _.forEach(dashboards, (dashboard, index) => {
            dashboard.index = index;
        });

        _dashboards   = dashboards;
        _currentIndex = 0;

        this.trigger(_currentIndex);
    },

    currentIndex() {
        return _currentIndex;
    }
});

module.exports = DashboardStore;