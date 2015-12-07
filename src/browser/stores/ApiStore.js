var Reflux      = require('reflux');
var ApiActions  = require('./../actions/ApiActions');
var ConfigStore = require('./ConfigStore');

var buffer = [];
var ws     = null;

var ApiStore = Reflux.createStore({
    init() {
        this.listenTo(ConfigStore, this.initWs);
    },

    initWs(config) {
        var proto = 'ws';
        if (config.useWssConnection === true) {
            proto = 'wss';
        }

        var port = 80;
        if (config.wsPort > 0) {
          port = config.wsPort;
        }

        ws = new WebSocket(`${ proto }://${ window.document.location.host }:${ port }`);
        ws.onmessage = event => {
            ApiStore.trigger(JSON.parse(event.data));
        };

        ws.onopen = () => {
            buffer.forEach(request => {
                ws.send(JSON.stringify(request));
            });
        };
        this.listenTo(ApiActions.get, this.get);
    },

    get(id, params) {
        if (ws === null || ws.readyState !== WebSocket.OPEN) {
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
