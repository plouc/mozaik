var request = require('superagent');
require('superagent-bluebird-promise');

var config = require('./../../../config');

module.exports = {
    user: function (params) {
        return request.get('https://api.github.com/users/' + params.user)
            .set('Authorization', 'token ' + config.api.github.token)
            .promise()
            .then(function (res) {
                return res.body;
            })
        ;
    },
    pullRequests: function (params) {
        return request.get('https://api.github.com/repos/' + params.repository + '/pulls')
            .set('Authorization', 'token ' + config.api.github.token)
            .promise()
            .then(function (res) {
                return res.body;
            })
        ;
    }
};