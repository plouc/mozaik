const util   = require('util')
const _      = require('lodash')
const chalk  = require('chalk')
const logger = require('./logger')


const API_MODE_POLL          = 'poll'
const API_MODE_PUSH          = 'push'

const DEFAULT_POLL_INTERVAL  = 15000

const API_DATA_MESSAGE       = 'api.data'
const API_ERROR_MESSAGE      = 'api.error'

/**
 * Bus class.
 */
class Bus {
    /**
     * @param {Object} options
     */
    constructor(options = {}) {
        this.apis          = {}
        this.clients       = {}
        this.subscriptions = {}

        this.logger        = options.logger       || logger
        this.pollInterval  = options.pollInterval || DEFAULT_POLL_INTERVAL
    }

    /**
     * Push message to matching clients.
     *
     * @param {String} subscriptionId
     * @param {Object} data
     * @param {string} type
     */
    send(subscriptionId, data, type = API_DATA_MESSAGE) {
        if (!this.subscriptions[subscriptionId]) {
            this.logger.warn(chalk.magenta(`No subscription found matching '${subscriptionId}'`))

            return
        }

        this.subscriptions[subscriptionId].clients.forEach(clientId => {
            this.clients[clientId].emit(type, data)
        })
    }

    /**
     * Register a new API,
     * which is basically an object composed of various methods.
     *
     * @param {String} id    unique API identifier
     * @param {Object} api   api function
     * @param {String} mode  api mode, can be one of 'poll' or 'push'
     */
    registerApi(id, api, mode = API_MODE_POLL) {
        if (mode !== API_MODE_POLL && mode !== API_MODE_PUSH) {
            const errMsg = `API mode '${mode}' is not a valid mode, must be one of 'poll' or 'push'`
            this.logger.error(chalk.red(errMsg))

            throw new Error(errMsg)
        }

        if (this.apis[id] !== undefined) {
            const errMsg = `API '${id}' already registered`
            this.logger.error(chalk.red(errMsg))

            throw new Error(errMsg)
        }

        this.apis[id] = {
            methods: api({
                logger,
                loadApiConfig: config => {
                    //console.log(config)
                }
            }),
            mode,
        }

        this.logger.info(chalk.yellow(`registered API '${id}' (mode: ${mode})`))
    }

    /**
     * Register a new client.
     *
     * @param {SocketIO} client
     * @param {String}   id
     */
    addClient(client) {
        if (this.clients[client.id] !== undefined) {
            const errMsg = `Client with id '${client.id}' already exists`
            this.logger.error(chalk.red(errMsg))

            throw new Error(errMsg)
        }

        this.clients[client.id] = client

        this.logger.info(`Client #${client.id} connected`)
    }

    /**
     * Remove a client.
     *
     * @param {String} id
     */
    removeClient(id) {
        _.forOwn(this.subscriptions, (subscription, subscriptionId) => {
            subscription.clients = subscription.clients.filter(clientId => clientId !== id)

            // if there's no more subscribers, clear the interval
            // to avoid consuming APIs for nothing.
            if (subscription.clients.length === 0 && subscription.timer) {
                this.logger.info(`no client found for subscription '${subscriptionId}' removing scheduler`)

                clearInterval(subscription.timer)
                delete subscription.timer
            }
        })

        delete this.clients[id]

        this.logger.info(`Client #${id} disconnected`)
    }

    /**
     * Process API call for given subscription id/params.
     *
     * @param {String}   id     - The subscription id
     * @param {Function} callFn - The API call function
     * @param {Object}   params - Params to be passed to `callFn`
     * @returns {Promise.<void>}
     */
    processApiCall(id, callFn, params) {
        this.logger.info(`Calling '${id}'`)

        // Will handle Promises and other return values
        return Promise.resolve(callFn(params))
            .then(data => {
                const message = { id, data }

                // cache message if subscription exists
                if (this.subscriptions[id]) {
                    this.subscriptions[id].cached = message
                }

                this.send(id, message)

                return message
            })
            .catch(err => {
                this.logger.error(chalk.red(`[${id.split('.')[0]}] ${id} - status code: ${err.status || err.statusCode}`))

                const message = {
                    id,
                    // data is in fact the error object
                    data: {
                        message: err.message,
                    },
                }

                this.send(id, message, API_ERROR_MESSAGE)
            })
    }

    /**
     * Add a subscription to an API.
     *
     * @param {string} clientId
     * @param {Object} subscription
     */
    subscribe(clientId, subscription) {
        if (!this.clients[clientId]) {
            this.logger.error(`Unable to find a client with id '${clientId}'`)
            return
        }

        const subscriptionId = subscription.id
        const parts          = subscriptionId.split('.')
        let errMsg
        if (parts.length < 2) {
            errMsg = `Invalid subscription id '${subscriptionId}', should be something like 'api_id.method'`
            this.logger.error(chalk.red(errMsg))

            throw new Error(errMsg)
        }

        const [apiId, apiMethod] = parts
        if (this.apis[apiId] === undefined) {
            errMsg = `Unable to find API matching id '${apiId}'`
            this.logger.error(chalk.red(errMsg))

            throw new Error(errMsg)
        }

        const api = this.apis[apiId]
        if (api.methods[apiMethod] === undefined) {
            errMsg = `Unable to find API method matching '${apiMethod}'`
            this.logger.error(chalk.red(errMsg))

            throw new Error(errMsg)
        }

        const callFn = api.methods[apiMethod]
        if (!_.isFunction(callFn)) {
            errMsg = `API method '${apiId}.${apiMethod}' MUST be a function`
            this.logger.error(chalk.red(errMsg))

            throw new Error(errMsg)
        }

        if (this.subscriptions[subscriptionId] === undefined) {
            this.subscriptions[subscriptionId] = {
                clients:         [],
                currentResponse: null,
            }

            this.logger.info(`Added subscription '${subscriptionId}'`)

            if (api.mode === API_MODE_POLL) {
                // make an immediate call to avoid waiting for the first interval.
                this.processApiCall(subscriptionId, callFn, subscription.params)
            } else if (api.mode === API_MODE_PUSH) {
                this.logger.info(`Creating producer for '${subscriptionId}'`)
                callFn(data => {
                    this.send(subscriptionId, {
                        id: subscriptionId,
                        data,
                    })
                }, subscription.params)
            }
        }

        // if there is no interval running, create one
        if (!this.subscriptions[subscriptionId].timer && api.mode === API_MODE_POLL) {
            this.logger.info(`creating scheduler for subscription '${subscriptionId}'`)

            this.subscriptions[subscriptionId].timer = setInterval(() => {
                this.processApiCall(subscriptionId, callFn, subscription.params)
            }, this.pollInterval)
        }

        // avoid adding a client for the same API call twice
        if (!this.subscriptions[subscriptionId].clients.includes(clientId)) {
            this.subscriptions[subscriptionId].clients.push(clientId)

            // if there's an available cached response, send it immediately
            if (this.subscriptions[subscriptionId].cached !== null) {
                this.clients[clientId].emit(API_DATA_MESSAGE, this.subscriptions[subscriptionId].cached)
            }
        }

        //console.log(util.inspect(this.subscriptions, { depth: null, colors: true }))
    }

    /**
     * Unsubscribe a client from a given api method.
     *
     * @param {string} clientId       - The client id, generated by socket.io
     * @param {string} subscriptionId - The subscription id
     */
    unsubscribe(clientId, subscriptionId) {
        if (!this.clients[clientId]) {
            this.logger.warn(chalk.magenta(`unable to unsubscribe from '${subscriptionId}', client with id '${clientId}' does not exist`))
            return
        }

        const subscription = this.subscriptions[subscriptionId]
        if (!subscription) {
            this.logger.warn(chalk.magenta(`unable to unsubscribe from '${subscriptionId}', subscription does not exist`))
            return
        }

        subscription.clients = subscription.clients.filter(id => id !== clientId)

        // if there is no more clients, remove subscription
        if (subscription.clients.length === 0) {
            if (subscription.timer) {
                this.logger.info(`no more client found for subscription '${subscriptionId}' removing scheduler`)

                clearInterval(subscription.timer)
                delete subscription.timer
            }

            delete this.subscriptions[subscriptionId]
        }

        //console.log(util.inspect(this.subscriptions, { depth: null, colors: true }))
    }

    /**
     * List registered API ids.
     *
     * @returns {Array}
     */
    listApis() {
        return Object.keys(this.apis)
    }

    /**
     * Returns connected clients.
     *
     * @returns {Object}
     */
    listClients() {
        return this.clients
    }

    /**
     * Returns current subscriptions.
     *
     * @returns {Object}
     */
    listSubscriptions() {
        return this.subscriptions
    }

    /**
     * Returns number of connected clients.
     *
     * @returns {Number}
     */
    clientCount() {
        return Object.keys(this.clients).length
    }
}


module.exports = Bus
