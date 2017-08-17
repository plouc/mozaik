import { Registry } from '@mozaik/ui'

import github from '@mozaik/ext-github'
import gitlab from '@mozaik/ext-gitlab'
import time from '@mozaik/ext-time'
import travis from '@mozaik/ext-travis'

// third party
import analytics from 'mozaik-ext-analytics'

Registry.addExtensions({
    github,
    gitlab,
    time,
    travis,

    // third party
    analytics,
})
