var ComponentRegistry = require('./../../../core/ComponentRegistry');

ComponentRegistry
    .add('github.pull_requests', require('./PullRequests.jsx'))
    .add('github.user_badge',    require('./UserBadge.jsx'))
;