import { Registry } from '@mozaik/ui'

import github from '@mozaik/ext-github'
import gitlab from '@mozaik/ext-gitlab'
import jira from '@mozaik/ext-jira'
import json from '@mozaik/ext-json'
import time from '@mozaik/ext-time'
import travis from '@mozaik/ext-travis'

Registry.addExtensions({
    github,
    gitlab,
    jira,
    json,
    time,
    travis,
})
