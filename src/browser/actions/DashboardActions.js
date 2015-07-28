import Reflux from 'reflux';

const DashboardActions = Reflux.createActions([
    'setDashboards',
    'previousDashboard',
    'nextDashboard',
    'startRotation'
]);

export { DashboardActions as default };