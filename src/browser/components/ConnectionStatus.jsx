import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import ConnectionStatusStore, {
    CONNECTION_STATUS_CONNECTING,
    CONNECTION_STATUS_CONNECTED,
    CONNECTION_STATUS_DISCONNECTED,
    CONNECTION_STATUS_DELAYING,
    CONNECTION_STATUS_FAILED
} from '../stores/ConnectionStatusStore';


class ConnectionStatus extends Component {
    constructor(props) {
        super(props);

        this.state = ConnectionStatusStore.getState();
    }

    componentWillMount() {
        this.listenTo(ConnectionStatusStore, this.onStatusUpdate);
    }

    onStatusUpdate({ countdown, status, retry }) {
        this.setState({ countdown, status, retry });
    }
    
    render() {
        const { countdown, status, retry } = this.state;

        let message;
        let iconClass;
        if (status === CONNECTION_STATUS_CONNECTING) {
            message   = 'connecting';
            iconClass = 'fa fa-question';
        } else if (status === CONNECTION_STATUS_CONNECTED) {
            message   = 'connected';
            iconClass = 'fa fa-check';
        } else if (status === CONNECTION_STATUS_DISCONNECTED || status === CONNECTION_STATUS_DELAYING) {
            message   = 'disconnected';
            iconClass = 'fa fa-warning';

            if (status === CONNECTION_STATUS_DELAYING) {
                message = (
                    <span>
                        disconnected<br/>
                        <span className="text-discrete">next attempt in {countdown}s</span>
                    </span>
                );
            }
        } else if (status === CONNECTION_STATUS_FAILED) {
            iconClass = 'fa fa-frown-o';
            message   = `unable to restore websockets after ${retry} attemps,
            please make sure Mozaïk server is running and that
            you can reach the internet if running on a remote server.`;
        }

        return (
            <div className="connection-status">
                <i className={iconClass}/>
                {message}
            </div>
        );
    }
}

ConnectionStatus.displayName = 'ConnectionStatus';

reactMixin(ConnectionStatus.prototype, ListenerMixin);


export default ConnectionStatus;
