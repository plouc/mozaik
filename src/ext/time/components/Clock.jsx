var React = require('react');
var d3    = require('d3');

function getCurrentTimeParts() {
    var currentTime = new Date();

    return {
        hours:   currentTime.getHours() + currentTime.getMinutes() / 60,
        minutes: currentTime.getMinutes(),
        seconds: currentTime.getSeconds()
    };
}

var secondsScale = d3.scale.linear().domain([0, 59 + 999/1000]).range([-90, 270]);
var minutesScale = d3.scale.linear().domain([0, 59 + 59/60]).range([-90, 270]);
var hoursScale   = d3.scale.linear().domain([0, 11 + 59/60]).range([-90, 270]);


var Clock = React.createClass({

    getInitialState() {
        return getCurrentTimeParts();
    },

    componentDidMount() {
        setInterval(() => {
            this.setState(getCurrentTimeParts());
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

        return (
            <div>
                <div className="time__clock__outer-circle" />
                <span className="time__clock__brand">mozaïk</span>
                <div className="time__clock__hand time__clock__hand--seconds" style={secondsStyle} />
                <div className="time__clock__hand time__clock__hand--minutes" style={minutesStyle} />
                <div className="time__clock__hand time__clock__hand--hours"   style={hoursStyle} />
                <div className="time__clock__inner-circle" />
            </div>
        );
    }
});

module.exports = Clock;