var request = require('superagent');
require('superagent-bluebird-promise');
var _       = require('lodash');
var config  = require('./../../../config');

function makeApiCall(endPoint) {
    return request.get(config.api.sensu.baseUrl + '/api/' + endPoint)
        .auth(config.api.sensu.auth.user, config.api.sensu.auth.password)
        .promise()
        .then(function (res) {
            return res.body;
        })
        .catch(function (err) {
            console.log(err);
        })
    ;
}

module.exports = {
    clients: function () {
        return makeApiCall('clients');
    },

    checks: function () {
        return makeApiCall('checks');
    },

    events: function () {
        return makeApiCall('events');
    }
};