import ApiStore   from './../stores/ApiStore';
import ApiActions from './../actions/ApiActions';


const ApiConsumerMixin = {
    componentWillMount() {
        const displayName = this.constructor.displayName || 'Unknown';

        if (!this.getApiRequest) {
            console.warn(`Seems you're trying to use 'ApiConsumerMixin' without implementing 'getApiRequest()', see '${displayName}' component`);
            return;
        }

        this.apiRequest = this.getApiRequest();
        if (!this.apiRequest.id) {
            console.error(`'getApiRequest()' MUST return an object with an 'id' property, see '${displayName}' component`);
            return;
        }

        this.listenTo(ApiStore, this.onAllApiData);
    },

    onAllApiData(data) {
        if (data.id === this.apiRequest.id) {
            this.onApiData(data.body);
        }
    },

    componentDidMount() {
        if (!this.apiRequest || !this.apiRequest.id) {
            return;
        }

        ApiActions.get(this.apiRequest.id, this.apiRequest.params || {});
    }
};


export default ApiConsumerMixin;
