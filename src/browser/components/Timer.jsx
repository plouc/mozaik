var React          = require('react');
var Reflux         = require('reflux');
var DashboardStore = require('./../stores/DashboardStore');

var Timer = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState() {
        return {
            completion: 0
        };
    },

    componentWillMount() {
        this.listenTo(DashboardStore, this.onStoreUpdate);

        setInterval(() => {
            this.setState({
                completion: this.state.completion + 5
            });
        }, 5);
    },

    onStoreUpdate() {
        this.setState({
            completion: 0
        });
    },

    render() {
        var style = {
            width: (this.state.completion / 200 * 100) + '%'
        };

        return (
            <div className="hotboard__timeline">
                <div className="hotboard__timeline__progress" style={style} />
            </div>
        );
    }
});

module.exports = Timer;