var Reflux = require('reflux');

var HotBoardActions = Reflux.createActions([
    'setDashboards',
    'previousDashboard',
    'nextDashboard',
    'startRotation'
]);

module.exports = HotBoardActions;