var React               = require('react');
var Reflux              = require('reflux');
var d3                  = require('d3');
var moment              = require('moment');
var timezone            = require('moment-timezone');
var ApiConsumerMixin    = require('./../../../core/mixins/ApiConsumerMixin');


function getCurrentTimeParts(timezoneName) {
    var currentTime = timezoneName ? moment().tz(timezoneName) : moment();

    return {
        hours:   currentTime.hours() + currentTime.minutes() / 60,
        minutes: currentTime.minutes(),
        seconds: currentTime.seconds()
    };
}

var secondsScale = d3.scale.linear().domain([0, 59 + 999/1000]).range([-90, 270]);
var minutesScale = d3.scale.linear().domain([0, 59 + 59/60]).range([-90, 270]);
var hoursScale   = d3.scale.linear().domain([0, 11 + 59/60]).range([-90, 270]);


var Clock = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    getApiRequest() {
        var id = 'time.clock';
        if (this.props.timezone) {
            id = 'time.clock.' + this.props.timezone.toLowerCase().replace(/\//g, '-');
        }

        return {
            id: id,
            params: {
                view: this.props.view,
                timezone: this.props.timezone
            }
        };
    },

    getInitialState() {
        return getCurrentTimeParts(this.props.timezone);
    },

    componentDidMount() {
        setInterval(() => {
            this.setState(getCurrentTimeParts(this.props.timezone));
        }, 1000);
    },

    render() {
        var hoursStyle   = {
            transform: 'rotate(' + hoursScale(this.state.hours % 12) + 'deg)'
        };
        var minutesStyle = {
            transform: 'rotate(' + minutesScale(this.state.minutes) + 'deg)'
        };
        var secondsStyle = {
            transform: 'rotate(' + secondsScale(this.state.seconds) + 'deg)'
        };

        var brand = this.props.timezone || 'mozaïk';

        return (
            <div>
                <div className="time__clock__outer-circle" />
                <span className="time__clock__brand">{brand}</span>
                <div className="time__clock__hand time__clock__hand--seconds" style={secondsStyle} />
                <div className="time__clock__hand time__clock__hand--minutes" style={minutesStyle} />
                <div className="time__clock__hand time__clock__hand--hours"   style={hoursStyle} />
                <div className="time__clock__inner-circle" />
            </div>
        );
    }
});

module.exports = Clock;