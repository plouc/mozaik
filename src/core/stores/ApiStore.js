var Reflux     = require('reflux');
var config     = require('./../../../config');
var ApiActions = require('./../actions/ApiActions');

var buffer = [];
var ws;

var ApiStore = Reflux.createStore({
    init: function () {
        ws = new WebSocket('ws://' + config.host + ':' + config.port);
        ws.onmessage = function (event) {
            console.log(JSON.parse(event.data));
            ApiStore.trigger(JSON.parse(event.data));
        };

        ws.onopen = function () {
            buffer.forEach(function (request) {
                ws.send(JSON.stringify(request));
            });
        };

        this.listenTo(ApiActions.get, this.get);
    },

    get: function (id, params) {
        if (ws.readyState !== WebSocket.OPEN) {
            buffer.push({
                id:     id,
                params: params || {}
            });

            return;
        }

        ws.send(JSON.stringify({
            id:     id,
            params: params || {}
        }));
    }
});

module.exports = ApiStore;