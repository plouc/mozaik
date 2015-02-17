var express = require('express');
var swig    = require('swig');
var chalk   = require('chalk');
var path    = require('path');
var _       = require('lodash');

module.exports = function (context) {
    var config = context.serverConfig;

    var app = express();

    context.logger.info(chalk.yellow('serving static contents from ' + context.baseDir + 'build'));
    app.use(express.static(context.baseDir + '/build'));

    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', path.join(context.rootDir, 'templates'));
    app.set('view cache', false);
    swig.setDefaults({
        cache: false
    });

    app.get('/', function (req, res) {
        res.render('index', {
            env: config.env
        });
    });

    app.get('/config', function (req, res) {
        res.send(_.omit(context.config, 'api'));
    });

    var server = app.listen(config.port, function () {
        context.logger.info(chalk.yellow('Mozaïk server listening at http://' + config.host + ':' + config.port));
    });

    var WebSocketServer = require('ws').Server;
    var wss             = new WebSocketServer({ server: server });

    var currentClientId = 0;

    wss.on('connection', function (ws) {
        var clientId = ++currentClientId;

        hub.add(ws, clientId);

        ws.on('message', function (request) {
            hub.wire(clientId, JSON.parse(request));
        });

        ws.on('close', function () {
            hub.remove(clientId);
        });
    });
};