var ComponentRegistry = require('./../../../core/ComponentRegistry');

ComponentRegistry
    .add('travis.repository',    require('./Repository.jsx'))
    .add('travis.build_history', require('./BuildHistory.jsx'))
;