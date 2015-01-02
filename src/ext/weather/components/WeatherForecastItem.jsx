var React             = require('react');
var WeatherCodeHelper = require('./../lib/WeatherCodeHelper');

var WeatherForecastItem = React.createClass({
    render: function () {

        var iconClass = 'weather__icon weather__icon--' + WeatherCodeHelper.icon(this.props.data.weather[0].id);

        //{this.props.data.weather[0].id}

        return (
            <div className="weather__weather__forecast__item">
                <i className={iconClass} />
                <span className="weather__weather__forecast__item__description">{this.props.data.weather[0].description}</span>
                <span className="weather__weather__forecast__item__min">
                    min.<br />
                    {Math.round(this.props.data.temp.min - 273.15)}°C
                </span>
                <span className="weather__weather__forecast__item__max">
                    max.<br />
                    {Math.round(this.props.data.temp.max - 273.15)}°C
                </span>
            </div>
        );
    }
});

module.exports = WeatherForecastItem;