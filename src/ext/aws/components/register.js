// Expose 'top-level' components
require('./../../../core/ComponentRegistry')
    .add('aws.instances', require('./Instances.jsx'))
    .add('aws.stacks',    require('./Stacks.jsx'))
;