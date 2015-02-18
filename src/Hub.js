var fs    = require('fs');
var path  = require('path');
var glob  = require('glob');
var chalk = require('chalk');
var _     = require('lodash');

/**
 * @param context
 * @constructor
 */
function Hub(context) {
    this.context = context;

    this.apis          = {};
    this.clients       = {};
    this.subscriptions = {};
}

Hub.prototype.registerApi = function (id, api) {
    this.apis[id] = api(this.context);

    this.context.logger.info(chalk.yellow('registered API "' + id + '"'));
};


/**
 * Register a new client.
 *
 * @param client
 * @param id
 */
Hub.prototype.add = function (client, id) {
    this.clients[id] = client;

    this.context.logger.info('Client #' + id + ' connected');
};

/**
 * Remove a client.
 *
 * @param id
 */
Hub.prototype.remove = function (id) {
    _.forOwn(this.subscriptions, function (subscription, subscriptionId) {
        subscription.clients = _.without(subscription.clients, id);

        // if there's no more subscribers, clear the interval
        // to avoid consuming APIs for nothing.
        if (subscription.clients.length === 0 && subscription.timer) {

            this.context.logger.info('removing interval for ' + subscriptionId);

            clearInterval(subscription.timer);
            delete subscription.timer;
        }
    }.bind(this));

    delete this.clients[id];

    this.context.logger.info('Client #' + id + ' disconnected');
};

/**
 * Add a subscription for the given client (client <-> API call).
 *
 * @param clientId
 * @param request
 */
Hub.prototype.wire = function (clientId, request) {
    var requestId = request.id;
    var parts     = requestId.split('.');

    if (!this.apis[parts[0]]) {
        this.context.logger.error('Unable to find API matching id "' + parts[0] + '"');

        return;
    }

    var api = this.apis[parts[0]];
    if (!api[parts[1]]) {
        this.context.logger.error('Unable to find API call matching "' + parts[1] + '"');

        return;
    }

    var callFn = api[parts[1]];

    if (!this.subscriptions[requestId]) {
        this.context.logger.info('adding subscription ' + requestId);

        this.subscriptions[requestId] = {
            clients:         [],
            currentResponse: null
        };

        // make an immediate call to avoid waiting for the first interval.
        this.processApiCall(requestId, callFn, request.params);
    }

    // if there is no interval running, create one
    if (!this.subscriptions[requestId].timer) {
        this.subscriptions[requestId].timer = setInterval(function () {
            this.processApiCall(requestId, callFn, request.params);
        }.bind(this), 100000);
    }

    // avoid adding a client for the same API call twice
    if (!_.contains(this.subscriptions[requestId].clients, clientId)) {
        this.subscriptions[requestId].clients.push(clientId);

        // if there's an available cached response, send it immediately
        if (this.subscriptions[requestId].cached !== null) {
            this.clients[clientId].send(JSON.stringify(this.subscriptions[requestId].cached));
        }
    }
};

/**
 *
 * @param {String}   id
 * @param {Function} callFn
 * @param {Object}   params
 */
Hub.prototype.processApiCall = function (id, callFn, params) {
    this.context.logger.info('calling ' + id);

    callFn(params)
        .then(function (data) {
            var message = {
                id:   id,
                body: data
            };

            this.subscriptions[id].cached = message;

            this.subscriptions[id].clients.forEach(function (clientId) {
                this.clients[clientId].send(JSON.stringify(message));
            }.bind(this));
        }.bind(this))
        .catch(function (err) {
            this.context.logger.error(id + ' - status code: ' + (err.status || err.statusCode));
        }.bind(this))
    ;
};

Hub.prototype.listApis = function () {
    var apis = [];
    _.forOwn(this.apis, function (api, id) {
        apis.push(id);
    });

    return apis;
};

module.exports = Hub;


