var Reflux     = require('reflux');
var ApiActions = require('./../actions/ApiActions');

var buffer = [];
var ws;

var ApiStore = Reflux.createStore({
    init() {
        /*
        ws = new WebSocket('ws://' + window.document.location.host);
        ws.onmessage = event => {
            console.log(JSON.parse(event.data));
            ApiStore.trigger(JSON.parse(event.data));
        };

        ws.onopen = () => {
            buffer.forEach(request => {
                ws.send(JSON.stringify(request));
            });
        };
        */
        this.listenTo(ApiActions.get, this.get);

    },

    get(id, params) {
        /*
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
        */
    }
});

module.exports = ApiStore;