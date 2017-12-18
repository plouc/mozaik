'use strict'

const http = require('http')
const path = require('path')
const chalk = require('chalk')
const _ = require('lodash')
const express = require('express')
const cors = require('cors')
const chokidar = require('chokidar')
const SocketIO = require('socket.io')

const Bus = require('./bus')
const logger = require('./logger')
const CoreApi = require('./core_api')
const loadYaml = require('./load_yaml')

const rootPath = Symbol('root')

let configuration
let socket

const bus = new Bus({
    logger,
})

exports.configure = _configuration => {
    if (_configuration[rootPath]) {
        configuration = _configuration
    } else {
        configuration = {
            [rootPath]: configuration,
        }
    }
}

const configuredPaths = configurationObject =>
    Object.getOwnPropertySymbols(configurationObject).concat(Object.getOwnPropertyNames(configurationObject))

const loadConfig = (configurationPath, urlPath) => {
    return loadYaml(configurationPath).then(_configuration => {
        configuration[urlPath] = _configuration

        return configuration[urlPath]
    })
}

exports.rootPath = rootPath

exports.configureFromFiles = (configurationPaths, watchRootConfigFile = true) => {
    configuration = {}

    if (watchRootConfigFile) {
        const watcher = chokidar.watch(configurationPaths[rootPath])
        watcher.on('change', () => {
            logger.info(`configuration updated, reloading`)
            loadConfig(configurationPaths[rootPath], rootPath).then(configuration => {
                if (socket) {
                    socket.emit('configuration', _.omit(configuration, 'api'))
                }
            })
        })
    }

    return Promise.all(configuredPaths(configurationPaths).map(key => loadConfig(configurationPaths[key], key)))
}

exports.configureFromFile = (configurationPath, watch = true) => {
    return exports.configureFromFiles(
        {
            [rootPath]: configurationPath,
        },
        watch
    )
}

/**
 * @param {Express} [app]
 */
exports.start = _app => {
    if (!configuration) {
        logger.error(
            chalk.red(
                `no configuration, you must either call 'configure()' or 'configureFromFiles()' before starting Mozaïk`
            )
        )
        process.exit(1)
    }

    if (!configuration[rootPath]) {
        logger.error(
            chalk.red(`configuration object must include a key for the root url path, i.e. { [Mozaik.rootPath]: ... }`)
        )
        process.exit(1)
    }

    if (configuration[rootPath].apisPollInterval) {
        bus.setAPIsPollInterval(configuration[rootPath].apisPollInterval)
    }

    bus.registerApi('mozaik', CoreApi(bus))

    const app = _app || express()

    app.use(cors())

    const baseDir = (configuration.baseDir || process.cwd()) + path.sep
    logger.info(chalk.yellow(`serving static contents from ${baseDir}build`))

    for (let path of configuredPaths(configuration)) {
        logger.info(chalk.yellow(`configuring path ${path.toString()}`))
        let router = new express.Router()

        router.use(express.static(`${baseDir}/build`))

        router.get('/config', (req, res) => {
            res.send(_.omit(configuration[path], 'api'))
        })

        if (path === rootPath) {
            app.use(router)
        } else {
            app.use(`/${path}`, router)
        }
    }

    const server = http.createServer(app)

    socket = SocketIO(server, {
        transports: ['polling'],
        serviceClient: false,
    })

    socket.on('error', function(err) {
        logger.error(chalk.red(`Socket error - ${err}`))
    })

    socket.on('connection', client => {
        bus.addClient(client)
        client.on('api.subscription', subscription => {
            bus.subscribe(client.id, subscription)
        })
        client.on('api.unsubscription', subscription => {
            bus.unsubscribe(client.id, subscription.id)
        })
        client.on('disconnect', () => {
            bus.removeClient(client.id)
        })
        client.on('error', function(err) {
            logger.error(chalk.red(`Socket error - ${err}`))
        })
    })

    const port = process.env.PORT || configuration[rootPath].port
    const host = 'localhost' || configuration[rootPath].host

    server.listen(port, configuration.host, () => {
        logger.info(chalk.yellow(`Mozaïk server listening at http://${host}:${port}`))
    })
}

/**
 * Alias to Bus method.
 */
exports.registerApi = (id, api) => {
    bus.registerApi(id, api)
}
