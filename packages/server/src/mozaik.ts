import * as http from 'http'
import * as path from 'path'
import { omit } from 'lodash'
import * as express from 'express'
import { Express, Request, Response } from 'express'
import * as chokidar from 'chokidar'
import chalk from 'chalk'
import * as cors from 'cors'
import * as SocketIO from 'socket.io'
import { Server as SocketIOServer, Socket } from 'socket.io'
import Bus, { APIRegistration, PollMode, Subscription } from './bus'
import logger, { Logger } from './logger'
import loadYaml from './load_yaml'
import CoreApi from './core_api'

export default class Mozaik {
    private logger: Logger
    private bus: Bus
    private configuration: any
    private socket: SocketIOServer

    constructor() {
        this.logger = logger
        this.bus = new Bus({ logger: this.logger })
    }

    public registerApi(id: string, api: APIRegistration, mode: PollMode) {
        this.bus.registerApi(id, api, mode)
    }

    public configure(configuration: any) {
        this.configuration = configuration
    }

    public loadYamlConfig(configurationPath: string) {
        return loadYaml(configurationPath).then((configuration: any) => {
            this.configuration = configuration

            return configuration
        })
    }

    public configureFromFile(configurationPath: string, watch = true) {
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

    public start(existingApp?: Express) {
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

        const app = existingApp || express()

        app.use(cors())

        const baseDir = (this.configuration.baseDir || process.cwd()) + path.sep
        logger.info(chalk.yellow(`serving static contents from ${baseDir}build`))
        app.use(express.static(`${baseDir}/build`))

        app.get('/config', (req: Request, res: Response) => {
            // apis might contain sensible info
            res.send(omit(this.configuration, 'apis'))
        })

        const server = http.createServer(app)

        this.socket = SocketIO(server as any, {
            // client is installed as an autonomous package on the UI
            serveClient: false,
        })

        this.socket.on('error', (error: Error) => {
            this.logger.error(chalk.red(error.message), error)
        })

        this.socket.on('connection', (client: Socket) => {
            this.bus.addClient(client)

            client.on('api.subscription', (subscription: Subscription) => {
                this.bus.subscribe(client.id, subscription)
            })
            client.on('api.unsubscription', (subscription: Subscription) => {
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
