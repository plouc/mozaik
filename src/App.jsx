var React    = require('react');
var HotBoard = require('./core/components/HotBoard.jsx');

require('./ext/collectedComponents');

var config = require('./../config');

React.render(
    <HotBoard config={config} />,
    document.getElementById('hotboard')
);