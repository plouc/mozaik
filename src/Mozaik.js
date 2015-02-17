var winston = require('winston');
var path    = require('path');
var Hub     = require('./Hub');

class Mozaik {
    constructor(config) {
        this.logger = winston;

        this.config = config;

        this.serverConfig = {
            host: config.host,
            port: config.port
        };

        this.baseDir = (config.baseDir || process.cwd()) + path.sep;
        this.rootDir = path.resolve(__dirname);

        this.hub = new Hub(this);
    }

    startServer() {
        require('./server')(this);
    }
}

module.exports = Mozaik;