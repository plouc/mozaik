var Twitter = require('twitter');
var Promise = require('bluebird');
var config  = require('./../../../config');

var _client;

function getClient() {
    if (!_client) {
        _client = new Twitter({
            consumer_key:        config.api.twitter.consumerKey,
            consumer_secret:     config.api.twitter.consumerSecret,
            access_token_key:    config.api.twitter.accessTokenKey,
            access_token_secret: config.api.twitter.accessTokenSecret
        });
    }

    return _client;
}


function _get(op) {
    var def = Promise.defer();

    getClient().get(op, function (err, params, response) {
        if (!err) { def.resolve(params); }
        else      { def.reject(err);     }
    });

    return def.promise;
}


module.exports = {
    userTimeline: function () {
        return _get('statuses/user_timeline');
    }
};