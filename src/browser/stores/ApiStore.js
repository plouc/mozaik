import Reflux      from 'reflux';
import ApiActions  from './../actions/ApiActions';
import ConfigStore from './ConfigStore';

const buffer = [];
let ws = null;

const ApiStore = Reflux.createStore({
    init() {
        this.listenTo(ConfigStore, this.initWs);
    },

    initWs(config) {
        let proto = 'ws';
        if (config.useWssConnection === true) {
            proto = 'wss';
        }

        let port = window.document.location.port;
        if (config.wsPort !== undefined) {
          port = config.wsPort;
        }

        let wsUrl = `${proto}://${window.document.location.hostname}`;
        if (port && port !== '') {
            wsUrl = `${wsUrl}:${port}`;
        }

        ws = new WebSocket(wsUrl);
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

export default ApiStore;
