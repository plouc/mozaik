var request = require('superagent');
var Promise = require('bluebird');
var _       = require('lodash');
require('superagent-bluebird-promise');

var config = require('./../../../config');

function buildApiRequest(path, params) {
    var url = config.api.github.baseUrl || 'https://api.github.com';
    var req = request.get(url + path);

    if (params) {
        req.query(params);
    }

    if (config.api.github && config.api.github.token) {
        req.set('Authorization', 'token ' + config.api.github.token);
    }

    return req.promise();
}

module.exports = {
    user: function (params) {
        return buildApiRequest('/users/' + params.user)
            .then(function (res) {
                return res.body;
            })
        ;
    },
    pullRequests: function (params) {
        return buildApiRequest('/repos/' + params.repository + '/pulls')
            .then(function (res) {
                return res.body;
            })
        ;
    },
    // Be warned that this API call can be heavy enough
    // because it loads each branch details with an extra call
    branches: function (params) {
        return buildApiRequest('/repos/' + params.repository + '/branches')
            .then(function (res) {
                return Promise.all(res.body.map(function (branch) {
                    return module.exports.branch(_.extend({ branch: branch.name }, params));
                }));
            })
        ;
    },
    branch: function (params) {
        return buildApiRequest('/repos/' + params.repository + '/branches/' + params.branch)
            .then(function (res) {
                return res.body;
            })
        ;
    },
    repositoryContributorsStats: function (params) {
        return buildApiRequest('/repos/' + params.repository + '/stats/contributors')
            .then(function (res) {
                return res.body;
            })
        ;
    },
    // Be warned that this API call can be heavy enough
    // because it fetch all the issues for each labels
    issueLabelsAggregations: function (params) {
        params.labels.forEach(function (label) {
            label.count = 0;
        });

        return Promise.all(params.labels.map(function (label) {
            return buildApiRequest('/repos/' + params.repository + '/issues', {
                labels: label.name,
                state:  'open',
                filter: 'all'
            })
                .then(function (res) {
                    label.count = res.body.length;

                    return label;
                })
            ;
        }));
    }
};
