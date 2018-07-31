'use strict'

module.exports = server => {
    server.registerApi('github', require('@mozaik/ext-github/client'))
    server.registerApi('travis', require('@mozaik/ext-travis/client'))
    server.registerApi('gitlab', require('@mozaik/ext-gitlab/client'))
    server.registerApi('json', require('@mozaik/ext-json/client'))
    server.registerApi('jira', require('@mozaik/ext-jira/client'))
}
