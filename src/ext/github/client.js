var request = require('superagent');
require('superagent-bluebird-promise');

var config = require('./../../../config');

function buildApiRequest(url) {
    var req = request.get(url);
    if (config.api.github && config.api.github.token) {
        req.set('Authorization', 'token ' + config.api.github.token);
    }

    return req.promise();
}

module.exports = {
    user: function (params) {
        return buildApiRequest('https://api.github.com/users/' + params.user)
            .then(function (res) {
                return res.body;
            })
        ;
    },
    pullRequests: function (params) {
        return buildApiRequest('https://api.github.com/repos/' + params.repository + '/pulls')
            .then(function (res) {
                return res.body;
            })
        ;
    }
};