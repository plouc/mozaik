import _     from 'lodash';
import chalk from 'chalk';


const API_MODE_POLL = 'poll';
const API_MODE_PUSH = 'push';


/**
 * @param {Mozaik} mozaik
 * @returns {*}
 * @constructor
 */
const Bus = mozaik => {
    const { apisPollInterval } = mozaik.config;

    const apis          = {};
    const clients       = {};
    const subscriptions = {};

    /**
     * Push message to matching clients.
     *
     * @param {String} subscriptionId
     * @param {Object} data
     */
    const send = (subscriptionId, data) => {
        if (!_.has(subscriptions, subscriptionId)) {
            mozaik.logger.warn(chalk.red(`No subscription found mathing '${subscriptionId}'`));

            return;
        }

        subscriptions[subscriptionId].clients.forEach((clientId) => {
            clients[clientId].send(JSON.stringify(data));
        });
    };

    /**
     * Register a new API,
     * which is basically an object composed of various methods.
     *
     * @param {String} id    unique API identifier
     * @param {Object} api   api function
     * @param {String} mode  api mode, can be one of 'poll' or 'push'
     */
    const registerApi = (id, api, mode = API_MODE_POLL) => {
        if (mode !== API_MODE_POLL && mode !== API_MODE_PUSH) {
            const errMsg = `API mode '${mode}' is not a valid mode, must be one of 'poll' or 'push'`;
            mozaik.logger.error(chalk.red(errMsg));

            throw new Error(errMsg);
        }

        if (_.has(apis, id)) {
            const errMsg = `API '${id}' already registered`;
            mozaik.logger.error(chalk.red(errMsg));

            throw new Error(errMsg);
        }

        apis[id] = { methods: api(mozaik), mode };

        mozaik.logger.info(chalk.yellow(`registered API '${id}' (mode: ${mode})`));
    };

    /**
     * Register a new client.
     *
     * @param {WebSocket} client
     * @param {String}    id
     */
    const addClient = (client, id) => {
        if (_.has(clients, id)) {
            const errMsg = `Client with id '${id}' already exists`;
            mozaik.logger.error(chalk.red(errMsg));

            throw new Error(errMsg);
        }

        clients[id] = client;

        mozaik.logger.info(`Client #${id} connected`);
    };

    /**
     * Remove a client.
     *
     * @param {String} id
     */
    const removeClient = (id) => {
        _.forOwn(subscriptions, (subscription, subscriptionId) => {
            subscription.clients = _.without(subscription.clients, id);

            // if there's no more subscribers, clear the interval
            // to avoid consuming APIs for nothing.
            if (subscription.clients.length === 0 && subscription.timer) {
                mozaik.logger.info(`removing interval for '${subscriptionId}'`);

                clearInterval(subscription.timer);
                delete subscription.timer;
            }
        });

        delete clients[id];

        mozaik.logger.info(`Client #${id} disconnected`);
    };

    /**
     * @param {String}   id
     * @param {Function} callFn
     * @param {Object}   params
     */
    const processApiCall = (id, callFn, params) => {
        mozaik.logger.info(`Calling '${id}'`);

        callFn(params)
            .then(data => {
                const message = { id, body: data };

                // cache message
                subscriptions[id].cached = message;

                send(id, message);
            })
            .catch(err => {
                mozaik.logger.error(chalk.red(`[${id.split('.')[0]}] ${id} - status code: ${err.status || err.statusCode}`));
            })
        ;
    };

    /**
     * Add a subscription for the given client (client <-> API call).
     *
     * @param {String} clientId
     * @param {Object} request
     */
    const clientSubscription = (clientId, request) => {
        if (!_.has(clients, clientId)) {
            mozaik.logger.error(`Unable to find a client with id '${clientId}'`);

            return;
        }

        const requestId = request.id;
        const parts     = requestId.split('.');
        let errMsg;
        if (parts.length < 2) {
            errMsg = `Invalid request id '${requestId}', should be something like 'api_id.method'`;
            mozaik.logger.error(chalk.red(errMsg));

            throw new Error(errMsg);
        }

        if (!_.has(apis, parts[0])) {
            errMsg = `Unable to find API matching id '${parts[0]}'`;
            mozaik.logger.error(chalk.red(errMsg));

            throw new Error(errMsg);
        }

        const api = apis[parts[0]];
        if (!_.has(api.methods, parts[1])) {
            errMsg = `Unable to find API method matching '${parts[1]}'`;
            mozaik.logger.error(chalk.red(errMsg));

            throw new Error(errMsg);
        }

        const callFn = api.methods[parts[1]];
        if (!_.isFunction(callFn)) {
            errMsg = `API method '${parts[0]}.${parts[1]}' MUST be a function`;
            mozaik.logger.error(chalk.red(errMsg));

            throw new Error(errMsg);
        }

        if (!subscriptions[requestId]) {
            subscriptions[requestId] = {
                clients:         [],
                currentResponse: null
            };

            mozaik.logger.info(`Added subscription '${requestId}'`);

            if (api.mode === API_MODE_POLL) {
                // make an immediate call to avoid waiting for the first interval.
                processApiCall(requestId, callFn, request.params);
            } else if (api.mode === API_MODE_PUSH) {
                mozaik.logger.info(`Creating producer for '${requestId}'`);
                callFn(data => {
                    send(requestId, {
                        id:   requestId,
                        body: data
                    });
                }, request.params);
            }
        }

        // if there is no interval running, create one
        if (!subscriptions[requestId].timer && api.mode === API_MODE_POLL) {
            mozaik.logger.info(`Setting timer for '${requestId}'`);
            subscriptions[requestId].timer = setInterval(() => {
                processApiCall(requestId, callFn, request.params);
            }, apisPollInterval);
        }

        // avoid adding a client for the same API call twice
        if (subscriptions[requestId].clients.indexOf(clientId) === -1) {
            subscriptions[requestId].clients.push(clientId);

            // if there's an available cached response, send it immediately
            if (subscriptions[requestId].cached !== null) {
                clients[clientId].send(JSON.stringify(subscriptions[requestId].cached));
            }
        }
    };

    /**
     * List registered API ids.
     *
     * @returns {Array}
     */
    const listApis = () => {
        const apiIds = [];
        _.forOwn(apis, (api, id) => {
            apiIds.push(id);
        });

        return apiIds;
    };

    /**
     * Returns connected clients.
     *
     * @returns {Object}
     */
    const listClients = () => clients;

    /**
     * Returns current subscriptions.
     *
     * @returns {Object}
     */
    const listSubscriptions = () => subscriptions;

    /**
     * Returns number of connected clients.
     *
     * @returns {Number}
     */
    const clientCount = () => {
        return _.keys(clients).length;
    };

    return {
        registerApi,
        addClient,
        removeClient,
        listClients,
        processApiCall,
        clientSubscription,
        listSubscriptions,
        listApis,
        clientCount
    };
};


export default Bus;
