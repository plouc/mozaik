var request = require('superagent');
require('superagent-bluebird-promise');

var config = require('./../../../config');

module.exports = {
    jobs: function () {
        return request.get(config.api.jenkins.baseUrl + '/api/json?tree=jobs[name,lastBuild[number,building,timestamp,result]]&pretty=true')
            .auth(config.api.jenkins.auth.user, config.api.jenkins.auth.password)
            .promise()
            .then(function (res) {
                return res.body.jobs;
            })
        ;
    },
    job: function (params) {
        return request.get(config.api.jenkins.baseUrl +  '/job/' + params.job + '/api/json?pretty=true&depth=10&tree=builds[number,duration,result,builtOn,timestamp,id,building]')
            .auth(config.api.jenkins.auth.user, config.api.jenkins.auth.password)
            .promise()
            .then(function (res) {
                return res.body.builds;
            })
        ;
    }
};