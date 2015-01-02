var request = require('superagent');
var Promise = require('bluebird');
var url     = require('url');
var cache   = require('memory-cache');
var format  = require('string-template');
require('superagent-bluebird-promise');

var Client = {
    current: function (params) {
        var cacheKey = format('weather.current.{city}.{country}.{lang}', params);
        if (cache.get(cacheKey) !== null) {
            return new Promise(function (resolve) {
                resolve(cache.get(cacheKey));
            });
        }

        return request.get('http://api.openweathermap.org/data/2.5/weather?lang=' + params.lang + '&q=' + params.city + ',' + params.country)
            .promise()
            .then(function (res) {
                cache.put(cacheKey, res.body, 1800000);

                return res.body;
            });
    },

    forecast: function (params) {
        var cacheKey = format('weather.forecast.{city}.{country}.{lang}.{limit}', params);
        if (cache.get(cacheKey) !== null) {
            return new Promise(function (resolve) {
                resolve(cache.get(cacheKey));
            });
        }

        return request.get('http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&cnt=' + params.limit + '&lang=' + params.lang + '&q=' + params.city + ',' + params.country)
            .promise()
            .then(function (res) {
                cache.put(cacheKey, res.body.list, 1800000);

                return res.body.list;
            });
    },

    combined: function (params) {
        var cacheKey = format('weather.combined.{city}.{country}.{lang}.{limit}', params);
        if (cache.get(cacheKey) !== null) {
            return new Promise(function (resolve) {
                resolve(cache.get(cacheKey));
            });
        }

        return Promise.props({
            current:  Client.current(params),
            forecast: Client.forecast(params)
        }).then(function (res) {
            cache.put(cacheKey, res, 1800000);

            return res;
        });
    }
};

module.exports = Client;