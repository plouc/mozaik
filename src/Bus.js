import _     from 'lodash';
import chalk from 'chalk';


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
            const errMsg = `Client with id "${ id }" already exists`;
            this._mozaik.logger.error(chalk.red(errMsg));
            throw new Error(errMsg);
        }
        this.clients[id] = client;

        this._mozaik.logger.info(`Client #${id} connected`);
    }

    /**
     * Add a subscription for the given client (client <-> API call).
     *
     * @param {String} clientId
     * @param {Object} request
     */
    clientSubscription(clientId, request) {
        if (!_.has(this.clients, clientId)) {
            this._mozaik.logger.error(`Unable to find a client with id "${ clientId }"`);

            return;
        }

        const requestId = request.id;
        const parts     = requestId.split('.');
        let errMsg;
        if (parts.length < 2) {
            errMsg = `Invalid request id "${ requestId }", should be something like 'api_id.method'`;
            this._mozaik.logger.error(chalk.red(errMsg));
            throw new Error(errMsg);
        }

        if (!_.has(this.apis, parts[0])) {
            errMsg = `Unable to find API matching id "${ parts[0] }"`;
            this._mozaik.logger.error(chalk.red(errMsg));
            throw new Error(errMsg);
        }

        var api = this.apis[parts[0]];
        if (!_.has(api, parts[1])) {
            errMsg = `Unable to find API method matching "${ parts[1] }"`;
            this._mozaik.logger.error(chalk.red(errMsg));
            throw new Error(errMsg);
        }

        var callFn = api[parts[1]];

        if (!this.subscriptions[requestId]) {
            this.subscriptions[requestId] = {
                clients:         [],
                currentResponse: null
            };

            this._mozaik.logger.info(`Added subscription "${ requestId }"`);

            // make an immediate call to avoid waiting for the first interval.
            this.processApiCall(requestId, callFn, request.params);
        }

        // if there is no interval running, create one
        if (!this.subscriptions[requestId].timer) {
            this._mozaik.logger.info(`Setting timer for "${ requestId }"`);
            this.subscriptions[requestId].timer = setInterval(() => {
                this.processApiCall(requestId, callFn, request.params);
            }, 10000);
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
                this._mozaik.logger.info(`removing interval for ${subscriptionId}`);

                clearInterval(subscription.timer);
                delete subscription.timer;
            }
        });

        delete this.clients[id];

        this._mozaik.logger.info(`Client #${id} disconnected`);
    }

    /**
     *
     * @param {String}   id
     * @param {Function} callFn
     * @param {Object}   params
     */
    processApiCall(id, callFn, params) {
        this._mozaik.logger.info(`Calling "${id}"`);

        callFn(params)
            .then(data => {
                const message = {
                    id,
                    body: data
                };

                this.subscriptions[id].cached = message;

                this.subscriptions[id].clients.forEach((clientId) => {
                    this.clients[clientId].send(JSON.stringify(message));
                });
            })
            .catch(err => {
                this._mozaik.logger.error(chalk.red(`[${id.split('.')[0]}] ${id} - status code: ${err.status || err.statusCode}`));
            })
        ;
    }

    listApis() {
        const apis = [];
        _.forOwn(this.apis, (api, id) => {
            apis.push(id);
        });

        return apis;
    }
}

export default Bus;
