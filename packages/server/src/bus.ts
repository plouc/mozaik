import { forOwn, isFunction } from 'lodash'
import chalk from 'chalk'
import * as request from 'request-promise-native'
import { Socket } from 'socket.io'
import logger, { Logger } from './logger'

const DEFAULT_POLL_INTERVAL: number = 15000

export enum PollMode {
    Poll = 'poll',
    Push = 'push',
}

export type APIRegistration = (options: { logger: Logger; request: any; loadApiConfig: any }) => any

export interface API {
    mode: PollMode
    methods: { [key: string]: any }
}

export interface Subscription {
    id: string
    clients: string[]
    params?: any
    timer?: NodeJS.Timer
    cached?: any
}

export interface BusOptions {
    logger?: Logger
    pollInterval?: number
}

export enum MessageType {
    Data = 'api.data',
    Error = 'api.error',
}

export interface APIError extends Error {
    status?: number
    statusCode?: number
}

export type CallFunction = (...params: any[]) => any

export default class Bus {
    public logger: Logger
    public pollInterval: number
    private apis: { [id: string]: API }
    private clients: { [id: string]: Socket }
    private subscriptions: { [id: string]: Subscription }

    constructor(options: BusOptions = {}) {
        this.logger = options.logger || logger
        this.pollInterval = options.pollInterval || DEFAULT_POLL_INTERVAL

        this.apis = {}
        this.clients = {}
        this.subscriptions = {}
    }

    /**
     * Push message to matching clients.
     */
    private send(subscriptionId: string, data: any, type: MessageType = MessageType.Data) {
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
     */
    public registerApi(id: string, api: APIRegistration, mode: PollMode = PollMode.Poll) {
        if (mode !== PollMode.Poll && mode !== PollMode.Push) {
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
                request,
                loadApiConfig: () => {},
            }),
            mode,
        }

        this.logger.info(chalk.yellow(`Registered API '${id}' (mode: ${mode})`))
    }

    /**
     * Register a new client.
     */
    public addClient(client: Socket) {
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
     */
    public removeClient(id: string) {
        forOwn(this.subscriptions, (subscription: Subscription, subscriptionId: string) => {
            subscription.clients = subscription.clients.filter(clientId => clientId !== id)

            // if there's no more subscribers, clear the interval
            // to avoid consuming APIs for nothing.
            if (subscription.clients.length === 0 && subscription.timer) {
                this.logger.info(
                    `no client found for subscription '${subscriptionId}' removing scheduler`
                )

                clearInterval(subscription.timer)
                delete subscription.timer
            }
        })

        delete this.clients[id]

        this.logger.info(`Client #${id} disconnected`)
    }

    /**
     * Process API call for given subscription id/params.
     */
    private processApiCall(id: string, callFn: CallFunction, params?: any) {
        this.logger.info(`Calling '${id}'`)

        // Will handle Promises and other return values
        return Promise.resolve(callFn(params))
            .then((data: any) => {
                const message = { id, data }

                // cache message if subscription exists
                if (this.subscriptions[id]) {
                    this.logger.info(`Caching response for ${id} subscription`)
                    this.subscriptions[id].cached = message
                }

                this.send(id, message)

                return message
            })
            .catch((err: APIError) => {
                this.logger.error(
                    chalk.red(
                        `[${id.split('.')[0]}] ${id} - status code: ${err.status || err.statusCode}`
                    )
                )

                const message = {
                    id,
                    // data is in fact the error object
                    data: {
                        message: err.message,
                    },
                }

                this.send(id, message, MessageType.Error)
            })
    }

    /**
     * Add a subscription to an API.
     */
    public subscribe(clientId: string, subscription: Subscription) {
        if (!this.clients[clientId]) {
            this.logger.error(`Unable to find a client with id '${clientId}'`)
            return
        }

        const subscriptionId = subscription.id
        const parts = subscriptionId.split('.')
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
        if (!isFunction(callFn)) {
            errMsg = `API method '${apiId}.${apiMethod}' MUST be a function`
            this.logger.error(chalk.red(errMsg))

            throw new Error(errMsg)
        }

        if (this.subscriptions[subscriptionId] === undefined) {
            this.subscriptions[subscriptionId] = {
                id: subscriptionId,
                clients: [],
                cached: null,
            }

            this.logger.info(`Added subscription '${subscriptionId}'`)

            if (api.mode === PollMode.Poll) {
                // make an immediate call to avoid waiting for the first interval.
                this.processApiCall(subscriptionId, callFn, subscription.params)
            } else if (api.mode === PollMode.Push) {
                this.logger.info(`Creating producer for '${subscriptionId}'`)
                callFn((data: any) => {
                    this.send(subscriptionId, {
                        id: subscriptionId,
                        data,
                    })
                }, subscription.params)
            }
        }

        // if there is no interval running, create one
        if (!this.subscriptions[subscriptionId].timer && api.mode === PollMode.Poll) {
            this.logger.info(`Creating scheduler for subscription '${subscriptionId}'`)

            this.subscriptions[subscriptionId].timer = setInterval(() => {
                this.processApiCall(subscriptionId, callFn, subscription.params)
            }, this.pollInterval)
        }

        // avoid adding a client for the same API call twice
        if (!this.subscriptions[subscriptionId].clients.includes(clientId)) {
            this.subscriptions[subscriptionId].clients.push(clientId)

            // if there's an available cached response, send it immediately
            if (
                this.subscriptions[subscriptionId].cached !== undefined &&
                this.subscriptions[subscriptionId].cached !== null
            ) {
                this.logger.info(
                    `Subscription ${subscriptionId} has cached response, sending to '${clientId}'`
                )

                this.clients[clientId].emit(
                    MessageType.Data,
                    this.subscriptions[subscriptionId].cached
                )
            }
        }
    }

    /**
     * Unsubscribe a client from a given api method.
     */
    public unsubscribe(clientId: string, subscriptionId: string) {
        if (!this.clients[clientId]) {
            this.logger.warn(
                chalk.magenta(
                    `unable to unsubscribe from '${subscriptionId}', client with id '${clientId}' does not exist`
                )
            )
            return
        }

        const subscription = this.subscriptions[subscriptionId]
        if (!subscription) {
            this.logger.warn(
                chalk.magenta(
                    `unable to unsubscribe from '${subscriptionId}', subscription does not exist`
                )
            )
            return
        }

        subscription.clients = subscription.clients.filter(id => id !== clientId)

        // if there is no more clients, remove subscription
        if (subscription.clients.length === 0) {
            if (subscription.timer) {
                this.logger.info(
                    `no more client found for subscription '${subscriptionId}' removing scheduler`
                )

                clearInterval(subscription.timer)
                delete subscription.timer
            }

            delete this.subscriptions[subscriptionId]
        }
    }

    /**
     * List registered API ids.
     */
    public listApis() {
        return Object.keys(this.apis)
    }

    /**
     * Returns connected clients.
     */
    public listClients() {
        return this.clients
    }

    /**
     * Returns current subscriptions.
     */
    public listSubscriptions() {
        return this.subscriptions
    }

    /**
     * Returns number of connected clients.
     */
    public clientCount(): number {
        return Object.keys(this.clients).length
    }
}
