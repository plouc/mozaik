var ApiStore   = require('./../stores/ApiStore');
var ApiActions = require('./../actions/ApiActions');

var ApiConsumerMixin = {
    componentWillMount() {
        this.apiRequest = this.getApiRequest();
        this.listenTo(ApiStore, this._onApiData);
    },

    _onApiData(data) {
        if (data.id === this.apiRequest.id) {
            this.onApiData(data.body);
        }
    },

    componentDidMount() {
        ApiActions.get(this.apiRequest.id, this.apiRequest.params || {});
    }
};

module.exports = ApiConsumerMixin;