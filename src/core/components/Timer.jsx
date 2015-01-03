var React          = require('react');
var Reflux         = require('reflux');
var config         = require('./../../../config');
var DashboardStore = require('./../stores/DashboardStore');

var Timer = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function () {
        return {
            completion: 0
        };
    },

    componentWillMount: function () {
        this.listenTo(DashboardStore, this.onStoreUpdate);

        setInterval(function () {
            this.setState({
                completion: this.state.completion + 5
            });
        }.bind(this), 5);
    },

    onStoreUpdate: function () {
        this.setState({
            completion: 0
        });
    },

    render: function () {
        var style = {
            width: (this.state.completion / config.rotationDuration * 100) + '%'
        };

        return (
            <div className="hotboard__timeline">
                <div className="hotboard__timeline__progress" style={style} />
            </div>
        );
    }
});

module.exports = Timer;