var React         = require('react');
var Mozaik        = require('./core/components/Mozaik.jsx');
var ConfigActions = require('./core/actions/ConfigActions');

require('./ext/collected');

React.render(
    <Mozaik />,
    document.getElementById('hotboard')
);

ConfigActions.loadConfig();