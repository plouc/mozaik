var chalk = require('chalk');
var _     = require('lodash');


class Bus {

    /**
     * @constructor
     * @param {Mozaik} mozaik
     */
    constructor(mozaik) {
        this._mozaik = mozaik;

        this.apis          = {};
        this.clients       = {};
        this.subscriptions = {};
    }

    /**
     * Register a new API
     * which is basically an object composed of various methods.
     *
     * @param {String} id
     * @param {Object} api
     */
    registerApi(id, api) {
        if (_.has(this.apis, id)) {
            var errMsg = `API "${ id }" already registered`;
            this._mozaik.logger.error(chalk.red(errMsg));
            throw new Error(errMsg);
        }

        this.apis[id] = api(this._mozaik);

        this._mozaik.logger.info(chalk.yellow(`registered API "${ id }"`));
    }

    /**
     * Register a new client.
     *
     * @param {Object} client
     * @param {String} id
     */
    addClient(client, id) {
        if (_.has(this.clients, id)) {
            var errMsg = `Client with id "${ id }" already exists`;
            this._mozaik.logger.error(chalk.red(errMsg));
            throw new Error(errMsg);
        }
        this.clients[id] = client;

        this._mozaik.logger.info('Client #' + id + ' connected');
    }

    /**
     * Add a subscription for the given client (client <-> API call).
     *
     * @param {String} clientId
     * @param {Object} request
     */
    clientSubscription(clientId, request) {
        var requestId = request.id;
        var parts     = requestId.split('.');

        if (!this.apis[parts[0]]) {
            this._mozaik.logger.error('Unable to find API matching id "' + parts[0] + '"');

            return;
        }

        var api = this.apis[parts[0]];
        if (!api[parts[1]]) {
            this._mozaik.logger.error('Unable to find API call matching "' + parts[1] + '"');

            return;
        }

        var callFn = api[parts[1]];

        if (!this.subscriptions[requestId]) {
            this._mozaik.logger.info('adding subscription ' + requestId);

            this.subscriptions[requestId] = {
                clients:         [],
                currentResponse: null
            };

            // make an immediate call to avoid waiting for the first interval.
            this.processApiCall(requestId, callFn, request.params);
        }

        // if there is no interval running, create one
        if (!this.subscriptions[requestId].timer) {
            this.subscriptions[requestId].timer = setInterval(() => {
                this.processApiCall(requestId, callFn, request.params);
            }, 100000);
        }

        // avoid adding a client for the same API call twice
        if (!_.contains(this.subscriptions[requestId].clients, clientId)) {
            this.subscriptions[requestId].clients.push(clientId);

            // if there's an available cached response, send it immediately
            if (this.subscriptions[requestId].cached !== null) {
                this.clients[clientId].send(JSON.stringify(this.subscriptions[requestId].cached));
            }
        }
    }

    /**
     * Remove a client.
     *
     * @param id
     */
     removeClient(id) {
        _.forOwn(this.subscriptions, (subscription, subscriptionId) => {
            subscription.clients = _.without(subscription.clients, id);

            // if there's no more subscribers, clear the interval
            // to avoid consuming APIs for nothing.
            if (subscription.clients.length === 0 && subscription.timer) {

                this._mozaik.logger.info('removing interval for ' + subscriptionId);

                clearInterval(subscription.timer);
                delete subscription.timer;
            }
        });

        delete this.clients[id];

        this._mozaik.logger.info('Client #' + id + ' disconnected');
    }

    /**
     *
     * @param {String}   id
     * @param {Function} callFn
     * @param {Object}   params
     */
    processApiCall(id, callFn, params) {
        this._mozaik.logger.info('calling ' + id);

        callFn(params)
            .then(data => {
                var message = {
                    id:   id,
                    body: data
                };

                this.subscriptions[id].cached = message;

                this.subscriptions[id].clients.forEach(function (clientId) {
                    this.clients[clientId].send(JSON.stringify(message));
                }.bind(this));
            })
            .catch(err => {
                this._mozaik.logger.error(id + ' - status code: ' + (err.status || err.statusCode));
            })
        ;
    }

    listApis() {
        var apis = [];
        _.forOwn(this.apis, function (api, id) {
            apis.push(id);
        });

        return apis;
    }
}


module.exports = Bus;


