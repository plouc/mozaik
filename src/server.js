var express = require('express');
var swig    = require('swig');
var chalk   = require('chalk');
var path    = require('path');
var _       = require('lodash');

/**
 * @param {Mozaik} mozaik
 */
module.exports = function (mozaik) {

    var config = mozaik.serverConfig;

    var app = express();

    mozaik.logger.info(chalk.yellow('serving static contents from ' + mozaik.baseDir + 'build'));
    app.use(express.static(mozaik.baseDir + '/build'));

    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', path.join(mozaik.rootDir, 'templates'));
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
        res.send(_.omit(mozaik.config, 'api'));
    });

    var server = app.listen(config.port, function () {
        mozaik.logger.info(chalk.yellow('Mozaïk server listening at http://' + config.host + ':' + config.port));
    });

    var WebSocketServer = require('ws').Server;
    var wss             = new WebSocketServer({ server: server });

    var currentClientId = 0;

    wss.on('connection', function (ws) {
        var clientId = ++currentClientId;

        mozaik.bus.addClient(ws, clientId);

        ws.on('message', function (request) {
            mozaik.bus.clientSubscription(clientId, JSON.parse(request));
        });

        ws.on('close', function () {
            mozaik.bus.removeClient(clientId);
        });
    });
};