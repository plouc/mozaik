var fs   = require('fs');
var path = require('path');
var glob = require('glob');
var _    = require('lodash');

var apis = {};

/**
 * Collects all available APIs
 */
glob.sync('src/ext/*/client.js').forEach(function (file) {
    var parts = file.split(path.sep);
    var id    = parts[parts.length - 2];

    apis[id] = require(path.relative(__dirname, path.resolve(file)));
});


var clients       = {};
var subscriptions = {};


function processApiCall(id, callFn, params) {
    console.log('calling %s', id);
    callFn(params)
        .then(function (data) {
            var message = {
                id:   id,
                body: data
            };

            subscriptions[id].cached = message;

            subscriptions[id].clients.forEach(function (clientId) {
                clients[clientId].send(JSON.stringify(message));
            });
        })
        .catch(function (err) {
            console.log('ERROR — %s — status code: %s', id, err.status || err.statusCode);
        })
    ;
}


module.exports = {

    /**
     * Register a new client.
     *
     * @param client
     * @param id
     */
    add: function (client, id) {
        clients[id] = client;

        console.log('Client #%d connected', id);
    },

    /**
     * Remove a client.
     *
     * @param id
     */
    remove: function (id) {
        _.forOwn(subscriptions, function (subscription, subscriptionId) {
            subscription.clients = _.without(subscription.clients, id);
            if (subscription.clients.length === 0 && subscription.timer) {

                console.log('removing interval for %s', subscriptionId);

                clearInterval(subscription.timer);
                delete subscription.timer;
            }
        });

        delete clients[id];

        console.log('Client #%d disconnected', id);
    },

    /**
     * Add a subscription for the given client (client <-> API call).
     *
     * @param clientId
     * @param request
     */
    wire: function (clientId, request) {
        var requestId = request.id;
        var parts     = requestId.split('.');

        if (!apis[parts[0]]) {
            console.log('Unable to find API matching id "%s"', parts[0]);

            return;
        }

        var api = apis[parts[0]];
        if (!api[parts[1]]) {
            console.log('Unable to find API call matching "%s"', parts[1]);

            return;
        }

        var callFn = api[parts[1]];

        if (!subscriptions[requestId]) {
            console.log('adding subscription %s', requestId);
            subscriptions[requestId] = {
                clients:         [],
                currentResponse: null
            };

            processApiCall(requestId, callFn, request.params);
        }

        if (!subscriptions[requestId].timer) {
            subscriptions[requestId].timer = setInterval(function () {
                processApiCall(requestId, callFn, request.params);
            }, 30000);
        }

        if (!_.contains(subscriptions[requestId].clients, clientId)) {
            subscriptions[requestId].clients.push(clientId);
            if (subscriptions[requestId].cached !== null) {
                clients[clientId].send(JSON.stringify(subscriptions[requestId].cached));
            }
        }
    }
};