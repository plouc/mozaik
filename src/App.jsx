var React  = require('react');
var Mozaik = require('./core/components/Mozaik.jsx');

require('./ext/collected');

var config = require('./../config');

React.render(
    <Mozaik config={config} />,
    document.getElementById('hotboard')
);