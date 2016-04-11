import Reflux                  from 'reflux';
import ConfigStore             from './ConfigStore';
import ApiActions              from '../actions/ApiActions';
import ConfigActions           from '../actions/ConfigActions';
import ConnectionStatusActions from '../actions/ConnectionStatusActions';
import NotificationsActions    from '../actions/NotificationsActions';
import ConnectionStatus        from '../components/ConnectionStatus.jsx';
import {
    NOTIFICATION_STATUS_SUCCESS,
    NOTIFICATION_STATUS_WARNING,
    NOTIFICATION_STATUS_ERROR
} from './NotificationsStore';

const NOTIFICATION_ID                = 'connection.status';

const CONNECTION_RETRY_DELAY_SECONDS = 15;
const CONNECTION_MAX_RETRIES         = 10;
let retryCount = 0;

let reconnections = 0;

let ws = null;
let retryTimer;
let history = [];
let buffer  = [];


const clearRetryTimer = () => {
    if (retryTimer) {
        clearTimeout(retryTimer);
        retryTimer = null;
    }
};


const connectWS = (config, store) => {
    ConnectionStatusActions.connecting();
    NotificationsActions.update(NOTIFICATION_ID, { status: NOTIFICATION_STATUS_WARNING });

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

    ws.onopen = event => {
        clearRetryTimer();

        retryCount = 0;

        ConnectionStatusActions.connected();
        NotificationsActions.update(NOTIFICATION_ID, { status: NOTIFICATION_STATUS_SUCCESS });
        NotificationsActions.close(NOTIFICATION_ID, 2000);

        if (reconnections > 0) {
            ConfigActions.loadConfig();
            history.forEach(request => { ws.send(JSON.stringify(request)); });
        } else {
            buffer.forEach(request => { ws.send(JSON.stringify(request)); });
            buffer = [];
        }

        reconnections++;
    };

    ws.onmessage = event => {
        if (event.data !== '') {
            store.trigger(JSON.parse(event.data));
        }
    };

    ws.onclose = event => {
        ws = null;

        clearRetryTimer();

        if (retryCount === 0) {
            NotificationsActions.notify({
                id:        NOTIFICATION_ID,
                component: ConnectionStatus,
                status:    NOTIFICATION_STATUS_WARNING,
                ttl:       -1
            });
        } else if (retryCount === CONNECTION_MAX_RETRIES) {
            ConnectionStatusActions.failed(retryCount);
            NotificationsActions.update(NOTIFICATION_ID, { status: NOTIFICATION_STATUS_ERROR });
            return;
        }

        ConnectionStatusActions.delaying(retryCount, CONNECTION_RETRY_DELAY_SECONDS);
        NotificationsActions.update(NOTIFICATION_ID, { status: NOTIFICATION_STATUS_WARNING });

        retryTimer = setTimeout(() => {
            connectWS(config, store);
        }, CONNECTION_RETRY_DELAY_SECONDS * 1000);

        retryCount++;
    };
};


const ApiStore = Reflux.createStore({
    init() {
        this.listenTo(ConfigStore, this.initWs);
    },

    initWs(config) {
        // only connect ws if it's not already connected, when connection is lost and we succeed in re-establishing it
        // we reload configuration, so without this check we'll end in an infinite loop.
        if (ws === null) {
            connectWS(config, this);
        }

        this.listenTo(ApiActions.get, this.fetch);
    },

    fetch(id, params = {}) {
        const request = { id, params };

        // keep track to use when re-connecting
        history.push(request);

        // if websockets not ready, add request to buffer
        if (ws === null || ws.readyState !== WebSocket.OPEN) {
            buffer.push(request);
            return;
        }

        ws.send(JSON.stringify({
            id:     id,
            params: params || {}
        }));
    },

    getHistory() {
        return history;
    },

    getBuffer() {
        return buffer;
    },

    reset() {
        clearRetryTimer();

        history = [];
        buffer  = [];

        if (ws !== null) {
            ws.close();
            ws = null;
        }
    }
});


export default ApiStore;
