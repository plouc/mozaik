var request = require('superagent');
require('superagent-bluebird-promise');
var Promise = require('bluebird');

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
    jobBuild: function (params) {
        return buildRequest(config.api.jenkins.baseUrl + '/job/' + params.job + '/' + params.buildNumber + '/api/json?pretty=true')
            .then(function (res) {
                return res.body;
            })
        ;
    },
    view: function (params) {
        return buildRequest(config.api.jenkins.baseUrl + '/view/' + params.view + '/api/json?pretty=true&depth=1')
            .then(function (res) {
                var view = res.body;
                var jobs = view.jobs;

                var builds = [];

                // Fetch builds details
                jobs.forEach(function (job) {
                    [
                        'lastBuild',
                        'lastFailedBuild',
                        'lastSuccessfulBuild'
                    ].forEach(function (buildType) {
                        if (job[buildType]) {
                            builds.push(
                                module.exports.jobBuild({
                                    job:         job.name,
                                    buildNumber: job[buildType].number
                                })
                                .then(function (build) {
                                    job[buildType] = build;
                                })
                            );
                        }
                    });
                });

                return Promise.all(builds)
                    .then(function () {
                        return view;
                    })
                ;
            })
        ;
    }
};