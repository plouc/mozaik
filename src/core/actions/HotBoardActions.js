var Reflux = require('reflux');

var HotBoardActions = Reflux.createActions([
    'setSheets',
    'previousSheet',
    'nextSheet',
    'startRotation'
]);

module.exports = HotBoardActions;