// Expose 'top-level' components
require('./../../../core/ComponentRegistry')
    .add('travis.repository',      require('./Repository.jsx'))
    .add('travis.build_history',   require('./BuildHistory.jsx'))
    .add('travis.build_histogram', require('./BuildHistogram.jsx'))
;