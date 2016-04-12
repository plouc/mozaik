import Reflux                  from 'reflux';
import ConnectionStatusActions from '../actions/ConnectionStatusActions';


export const CONNECTION_STATUS_CONNECTING   = 'connecting';
export const CONNECTION_STATUS_CONNECTED    = 'connected';
export const CONNECTION_STATUS_DISCONNECTED = 'disconnected';
export const CONNECTION_STATUS_DELAYING     = 'delaying';
export const CONNECTION_STATUS_FAILED       = 'failed';


// current store state
let status    = CONNECTION_STATUS_DISCONNECTED;
let retry     = 0;
let countdown = 0;
let countdownTimer;


const clearCountdown = () => {
    if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
    }
    countdown = 0;
};


const ConnectionStatusStore = Reflux.createStore({
    listenables: ConnectionStatusActions,

    getState() {
        return { status, retry, countdown };
    },

    setStatus(newStatus) {
        clearCountdown();

        status = newStatus;

        this.trigger({ status, retry, countdown });
    },

    connecting() {
        this.setStatus(CONNECTION_STATUS_CONNECTING);
    },

    connected() {
        this.setStatus(CONNECTION_STATUS_CONNECTED);
    },

    disconnected() {
        this.setStatus(CONNECTION_STATUS_DISCONNECTED);
    },

    delaying(retryCount, seconds) {
        clearCountdown();

        status    = CONNECTION_STATUS_DELAYING;
        retry     = retryCount;
        countdown = seconds;

        if (seconds > 0) {
            countdownTimer = setInterval(() => {
                if (countdown > 0) {
                    countdown--;
                }

                this.trigger({ status, retry, countdown });
            }, 1000);
        }

        this.trigger({ status, retry, countdown });
    },

    failed(retryCount) {
        retry = retryCount;

        this.setStatus(CONNECTION_STATUS_FAILED);
    },

    reset() {
        status = CONNECTION_STATUS_DISCONNECTED;
        retry  = 0;
        clearCountdown();
    }
});


export default ConnectionStatusStore;
