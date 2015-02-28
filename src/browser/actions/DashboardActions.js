var Reflux = require('reflux');

var DashboardActions = Reflux.createActions([
    'setDashboards',
    'previousDashboard',
    'nextDashboard',
    'startRotation'
]);

module.exports = DashboardActions;