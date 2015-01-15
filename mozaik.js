var express = require('express');
var app     = express();
var _       = require('lodash');
var hub     = require('./src/core/hub');
var config  = require('./config');

app.use(express.static(__dirname + '/build'));

app.get('/config', function (req, res) {
    res.send(_.omit(config, 'api'));
});

var server = app.listen(config.port, function () {
    console.log('MOZAÏK listening at http://%s:%s', config.host, config.port);
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