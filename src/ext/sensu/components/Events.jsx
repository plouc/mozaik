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
        // if we have an available filter on clients, apply it
        if (this.props.clientFilter) {
            events = _.where(events, event => this.props.clientFilter.test(event.client.name));
        }

        this.setState({
            events: events
        });
    },

    render() {
        var eventNodes;
        var iconClass = 'fa fa-smile-o';

        if (this.state.events.length > 0) {
            eventNodes = _.map(this.state.events, event => {
                return (<Event key={event.id} event={event} />);
            });
            iconClass = 'fa fa-frown-o';
        } else {
            eventNodes = (<p className="list__empty-msg">No event found, everything seems fine!</p>);
        }

        return (
            <div>
                <div className="widget__header">
                    Sensu events
                    <span className="widget__header__count">
                        {this.state.events.length}
                    </span>
                    <i className={iconClass} />
                </div>
                <div className="widget__body">
                    {eventNodes}
                </div>
            </div>
        );
    }
});

module.exports = Events;