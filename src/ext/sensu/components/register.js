var ComponentRegistry = require('./../../../core/ComponentRegistry');

ComponentRegistry
    .add('sensu.events', require('./Events.jsx'))
;