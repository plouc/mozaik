// Expose 'top-level' components
require('./../../../core/ComponentRegistry')
    .add('twitter.timeline',     require('./Timeline.jsx'))
    .add('twitter.hashtags_pie', require('./HashtagsPie.jsx'))
;