var Reflux           = require('reflux');
var _                = require('lodash');
var DashboardActions = require('./../actions/DashboardActions');
var ConfigStore      = require('./ConfigStore');

var _dashboards      = [];
var _currentIndex    = 0;
var _config          = null;
var _timer           = null;

var DashboardStore = Reflux.createStore({
    init() {
        this.listenTo(DashboardActions.setDashboards,     this.setDashboards);
        this.listenTo(DashboardActions.previousDashboard, this.previousDashboard);
        this.listenTo(DashboardActions.nextDashboard,     this.nextDashboard);
        this.listenTo(ConfigStore,                        this.setConfig);
    },

    setConfig(config) {
        _config = _.pick(config, 'rotationDuration');
        this.start();
    },

    start() {
        if (_config.rotationDuration && _dashboards.length > 1 && _timer === null) {
            _timer = setInterval(() => {
                this.nextDashboard();
            }, _config.rotationDuration);
        }
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

        this.start();

        this.trigger(_currentIndex);
    },

    currentIndex() {
        return _currentIndex;
    }
});

module.exports = DashboardStore;
