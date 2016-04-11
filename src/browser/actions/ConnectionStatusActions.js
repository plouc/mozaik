import Reflux from 'reflux';


const ConnectionStatusActions = Reflux.createActions([
    'connecting',
    'connected',
    'disconnected',
    'delaying',
    'failed'
]);


export default ConnectionStatusActions;
