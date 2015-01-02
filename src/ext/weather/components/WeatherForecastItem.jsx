var React = require('react');

var WeatherForecastItem = React.createClass({
    render: function () {
        return (
            <div className="weather__weather__forecast__item">
                <span className="weather__weather__forecast__item__description">{this.props.data.weather[0].description}</span>
                <span className="weather__weather__forecast__item__min">
                    min.<br />
                    {Math.round(this.props.data.temp.min - 273.15)} °C
                </span>
                <span className="weather__weather__forecast__item__max">
                    max.<br />
                    {Math.round(this.props.data.temp.max - 273.15)} °C
                </span>
            </div>
        );
    }
});

module.exports = WeatherForecastItem;