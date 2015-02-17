var Reflux = require('reflux');

var DashboardActions = Reflux.createActions([
    'setDashboards',
    'previousDashboard',
    'nextDashboard',
    'startRotation'
]);

DashboardActions.setDashboards.shouldEmit = function (dashboards) {
    // starts dashboard rotation if there is more
    // than one dashboard configured
    if (dashboards.length > 1) {
        DashboardActions.startRotation();
    }

    return true;
};

module.exports = DashboardActions;