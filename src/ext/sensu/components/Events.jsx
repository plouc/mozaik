var React            = require('react');
var Reflux           = require('reflux');
var _                = require('lodash');
var ApiConsumerMixin = require('./../../../core/mixins/ApiConsumerMixin');
var Event            = require('./Event.jsx');

var Events = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    getInitialState() {
        return {
            events: []
        };
    },

    getApiRequest() {
        return {
            id: 'sensu.events'
        };
    },

    onApiData(events) {
        this.setState({
            events: events
        });
    },

    render() {
        var eventNodes = _.map(this.state.events, event => {
            return (<Event key={event.id} event={event} />);
        });

        return (
            <div>
                <div className="widget__header">
                    Sensu events
                    <span className="widget__header__count">
                        {this.state.events.length}
                    </span>
                    <i className="fa fa-bell-o" />
                </div>
                <div className="widget__body">
                    {eventNodes}
                </div>
            </div>
        );
    }
});

module.exports = Events;