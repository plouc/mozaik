var ComponentRegistry = require('./../../../core/ComponentRegistry');

ComponentRegistry
    .add('aws.instances', require('./Instances.jsx'))
    .add('aws.stacks',    require('./Stacks.jsx'))
;