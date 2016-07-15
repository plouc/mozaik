import Reflux           from 'reflux';
import _                from 'lodash';
import DashboardActions from './../actions/DashboardActions';
import ConfigStore      from './ConfigStore';


var _dashboards      = [];
var _currentIndex    = 0;
var _config          = null;
var _timer           = null;
var _currentDuration = 0;


const DashboardStore = Reflux.createStore({
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
            if (_dashboards[0].rotationDuration) {
                _config.rotationCheckInterval = _config.rotationCheckInterval || 5000 // we check every 5seconds if we should rotate the dashboard
                _config.rotationDuration = _config.rotationCheckInterval
            }

            _timer = setInterval(() => {
                _currentDuration += _config.rotationCheckInterval
                if (_currentDuration >= _dashboards[_currentIndex].rotationDuration) {
                    this.nextDashboard();
                }
            }, _config.rotationDuration);
        }
    },

    previousDashboard() {
        _currentIndex--;
        _currentDuration = 0;
        this.trigger(_currentIndex);
    },

    nextDashboard() {
        if (_currentIndex < _dashboards.length - 1) {
            _currentIndex++;
        } else {
            _currentIndex = 0;
        }
    
        _currentDuration = 0;
        this.trigger(_currentIndex);
    },

    setDashboards(dashboards) {
        _.forEach(dashboards, (dashboard, index) => {
            dashboard.index = index;
        });

        _dashboards   = dashboards;
        _currentIndex = 0;
        _currentDuration = 0;

        this.start();

        this.trigger(_currentIndex);
    },

    currentIndex() {
        return _currentIndex;
    }
});


export default DashboardStore;
