var ComponentRegistry = require('./../../../core/ComponentRegistry');
ComponentRegistry
    .add('jenkins.jobs',                require('./Jobs.jsx'))
    .add('jenkins.job_builds',          require('./JobBuilds.jsx'))
    .add('jenkins.job_build_durations', require('./JobBuildDurations.jsx'))
;