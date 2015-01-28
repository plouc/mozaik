var Twitter = require('twitter');
var Promise = require('bluebird');
var _       = require('lodash');
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


function _get(op, q) {
    var def = Promise.defer();

    q = q || {};

    getClient().get(op, q, function (err, params, response) {
        if (!err) { def.resolve(params); }
        else      { def.reject(err);     }
    });

    return def.promise;
}


module.exports = {
    userTimeline: function () {
        return _get('statuses/user_timeline');
    },
    searchByHashtags: function (params) {
        var hashtagsText     = [];
        var hashtagsNormText = [];

        params.hashtags.forEach(function (hashtag) {
            hashtag.normText = hashtag.text.toLowerCase();
            hashtag.count    = 0;

            hashtagsText.push(hashtag.text);
            hashtagsNormText.push(hashtag.normText);
        });

        return _get('search/tweets', {
            q: '#' + hashtagsText.join(' OR #')
        })
            .then(function (res) {
                var startDate = _.last(res.statuses).created_at;
                var endDate   = _.first(res.statuses).created_at;

                // Build aggregation by tag text
                res.statuses.forEach(function (tweet) {
                    tweet.entities.hashtags.forEach(function (hashtag) {
                        var normText = hashtag.text.toLowerCase();
                        if (_.indexOf(hashtagsNormText, normText) > -1) {
                            _.find(params.hashtags, { normText: normText }).count += 1;
                        }
                    });
                });

                return {
                    hashtags:  params.hashtags,
                    dateRange: {
                        start: startDate,
                        end:   endDate
                    }
                };
            })
            .catch(function (err) {
                console.log(err);
            })
        ;
    }
};