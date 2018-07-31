'use strict'

const http = require('http')
const path = require('path')
const { omit } = require('lodash')
const express = require('express')
const chokidar = require('chokidar')
const chalk = require('chalk')
const cors = require('cors')
const SocketIO = require('socket.io')
const Bus = require('./bus')
const logger = require('./logger')
const loadYaml = require('./load_yaml')
const CoreApi = require('./core_api')

class Mozaik {
    constructor() {
        this.logger = logger
        this.bus = new Bus({ logger: this.logger })
    }

    registerApi(...params) {
        this.bus.registerApi(...params)
    }

    configure(configuration) {
        this.configuration = configuration
    }

    loadYamlConfig(configurationPath) {
        return loadYaml(configurationPath).then(configuration => {
            this.configuration = configuration

            return configuration
        })
    }

    configureFromFile(configurationPath, watch = true) {
        if (watch === true) {
            const watcher = chokidar.watch(configurationPath)
            watcher.on('change', () => {
                this.logger.info(`configuration updated, reloading`)
                this.loadYamlConfig(configurationPath).then(() => {
                    if (this.socket) {
                        this.socket.emit('configuration', omit(this.configuration, 'apis'))
                    } else {
                        this.logger.warn(chalk.red(`socket not initialized, unable to emit update`))
                    }
                })
            })
        }

        return this.loadYamlConfig(configurationPath)
    }

    start(_app) {
        if (!this.configuration) {
            this.logger.error(
                chalk.red(
                    `no configuration, you must either call 'configure()' or 'configureFromFile()' before starting Mozaïk server`
                )
            )
            process.exit(1)
        }

        if (
            this.configuration.apis !== undefined &&
            this.configuration.apis.pollInterval !== undefined
        ) {
            this.bus.pollInterval = this.configuration.apis.pollInterval
            this.logger.info(`set global APIs poll interval to ${this.bus.pollInterval}`)
        }

        this.bus.registerApi('mozaik', CoreApi(this.bus))

        const app = _app || express()

        app.use(cors())

        const baseDir = (this.configuration.baseDir || process.cwd()) + path.sep
        logger.info(chalk.yellow(`serving static contents from ${baseDir}build`))
        app.use(express.static(`${baseDir}/build`))

        app.get('/config', (req, res) => {
            // apis might contain sensible info
            res.send(omit(this.configuration, 'apis'))
        })

        const server = http.createServer(app)

        this.socket = SocketIO(server, {
            // client is installed as an autonomous package on the UI
            serviceClient: false,
        })

        this.socket.on('error', error => {
            // eslint-disable-next-line no-console
            console.error(chalk.red(error.message), error)
        })

        this.socket.on('connection', client => {
            this.bus.addClient(client)

            client.on('api.subscription', subscription => {
                this.bus.subscribe(client.id, subscription)
            })
            client.on('api.unsubscription', subscription => {
                this.bus.unsubscribe(client.id, subscription.id)
            })
            client.on('disconnect', () => {
                this.bus.removeClient(client.id)
            })
        })

        const port = process.env.PORT || this.configuration.port

        server.listen(port, this.configuration.host, () => {
            logger.info(chalk.yellow(`Mozaïk server started on port ${port}`))
        })
    }
}

module.exports = Mozaik
