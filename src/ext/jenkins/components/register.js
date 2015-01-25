var ComponentRegistry = require('./../../../core/ComponentRegistry');

ComponentRegistry
    .add('jenkins.jobs',                 require('./Jobs.jsx'))
    .add('jenkins.job_status',           require('./JobStatus.jsx'))
    .add('jenkins.job_builds',           require('./JobBuilds.jsx'))
    .add('jenkins.job_builds_histogram', require('./JobBuildsHistogram.jsx'))
    .add('jenkins.view',                 require('./View.jsx'))
;