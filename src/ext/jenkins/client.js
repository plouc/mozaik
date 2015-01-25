var request = require('superagent');
require('superagent-bluebird-promise');

var config = require('./../../../config');

function buildRequest(url) {
    return request.get(url)
        .auth(
            config.api.jenkins.auth.user,
            config.api.jenkins.auth.password
        )
        .promise()
    ;
}

module.exports = {
    jobs: function () {
        return buildRequest(config.api.jenkins.baseUrl + '/api/json?tree=jobs[name,lastBuild[number,building,timestamp,result]]&pretty=true')
            .then(function (res) {
                return res.body.jobs;
            })
        ;
    },
    job: function (params) {
        return buildRequest(config.api.jenkins.baseUrl +  '/job/' + params.job + '/api/json?pretty=true&depth=10&tree=builds[number,duration,result,builtOn,timestamp,id,building]')
            .then(function (res) {
                return res.body.builds;
            })
        ;
    },
    view: function (params) {
        console.log(config.api.jenkins.baseUrl + '/view/' + params.view + '/api/json?pretty=true&depth=1');
        return buildRequest(config.api.jenkins.baseUrl + '/view/' + params.view + '/api/json?pretty=true&depth=1')
            .then(function (res) {
                return res.body;
            })
        ;
    }
};