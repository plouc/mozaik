const winston = require('winston')
const path    = require('path')
const chalk   = require('chalk')
const Bus     = require('./Bus')
const express = require('express')
const server  = require('./server')
const CoreApi = require('./CoreApi')


class Mozaik {
    constructor(config) {
        this.logger = winston

        this.config = config

        this.serverConfig = {
            host: config.host,
            port: config.port
        }

        this.config.appTitle         = this.config.appTitle         || 'Mozaïk'
        this.config.assetsBaseUrl    = this.config.assetsBaseUrl    || ''
        this.config.useWssConnection = !!this.config.useWssConnection
        this.config.apisPollInterval = this.config.apisPollInterval || 15000

        this.baseDir = (config.baseDir || process.cwd()) + path.sep
        this.rootDir = path.resolve(__dirname)

        this.bus = Bus(this)
        
        this.bus.registerApi('mozaik', CoreApi)
    }

    /**
     * @param  {Express} app
     */
    startServer(app) {
        app = app || express()

        server(this, app)
    }

    /**
     * @param {Object} config The convict config schema to validate against
     */
    loadApiConfig(config) {
        // load and validate config
        config.load(this.config.api)

        try {
            config.validate()
        } catch (e) {
            this.logger.error(chalk.red(e.message))
            process.exit(1)
        }
    }
}


module.exports = Mozaik
