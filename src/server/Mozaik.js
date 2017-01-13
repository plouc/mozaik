const http     = require('http')
const path     = require('path')
const chalk    = require('chalk')
const _        = require('lodash')
const express  = require('express')
const cors     = require('cors')
const chokidar = require('chokidar')
const SocketIO = require('socket.io')
const Bus      = require('./Bus')
const logger   = require('./logger')
const CoreApi  = require('./CoreApi')
const loadYaml = require('./loadYaml')


let configuration
let socket

const bus = new Bus({
    logger,
})

exports.configure = _configuration => {
    configuration = _configuration
}

const loadConfig = configurationPath => {
    return loadYaml(configurationPath)
        .then(_configuration => {
            configuration = _configuration

            return configuration
        })
}

exports.configureFromFile = (configurationPath, watch = true) => {
    if (watch === true) {
        const watcher = chokidar.watch(configurationPath)
        watcher.on('change', () => {
            logger.info(`configuration updated, reloading`)
            loadConfig(configurationPath)
                .then(configuration => {
                    if (socket) {
                        socket.emit('configuration', _.omit(configuration, 'api'))
                    }
                })
        })
    }

    return loadConfig(configurationPath)
}

/**
 * @param {Express} [app]
 */
exports.start = _app => {
    if (!configuration) {
        logger.error(chalk.red(`no configuration, you must either call 'configure()' or 'configureFromFile()' before starting Mozaïk`))
        process.exit(1)
    }

    bus.registerApi('mozaik', CoreApi(bus))

    const app = _app || express()

    app.use(cors())

    const baseDir = (configuration.baseDir || process.cwd()) + path.sep
    logger.info(chalk.yellow(`serving static contents from ${baseDir}build`))
    app.use(express.static(`${baseDir}/build`))

    app.get('/config', (req, res) => {
        res.send(_.omit(configuration, 'api'))
    })

    const server = http.createServer(app)

    const port = process.env.PORT || configuration.port

    server.listen(port, configuration.host, () => {
        logger.info(chalk.yellow(`Mozaïk server listening at http://${configuration.host}:${port}`))
    })

    socket = SocketIO(server)
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
    })
}

/**
 * Alias to Bus method.
 */
exports.registerApi = (id, api, mode) => {
    bus.registerApi(id, api, mode)
}
