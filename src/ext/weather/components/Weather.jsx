var React               = require('react');
var Reflux              = require('reflux');
var moment              = require('moment');
var format              = require('string-template');
var ApiConsumerMixin    = require('./../../../core/mixins/ApiConsumerMixin');
var WeatherForecastItem = require('./WeatherForecastItem.jsx');
var WeatherCodeHelper   = require('./../lib/WeatherCodeHelper');

// see http://openweathermap.org/weather-conditions for `weather.id` meaning

var Weather = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    getDefaultProps: function() {
        return {
            lang: 'en',
            limit: 3
        };
    },

    propTypes: {
        city:    React.PropTypes.string.isRequired,
        country: React.PropTypes.string.isRequired,
        limit:   React.PropTypes.number.isRequired,
        lang:    React.PropTypes.oneOf([
            'en',          // English
            'ru',          // Russian
            'it',          // Italian
            'es', 'sp',    // Spanish
            'uk', 'ua',    // Ukrainian
            'de',          // German
            'pt',          // Portuguese
            'ro',          // Romanian
            'pl',          // Polish
            'fi',          // Finnish
            'nl',          // Dutch
            'fr',          // French
            'bg',          // Bulgarian
            'sv', 'se',    // Swedish
            'zh_tw',       // Chinese Traditional
            'zh', 'zh_cn', // Chinese Simplified
            'tr',          // Turkish
            'hr',          // Croatian
            'ca'           // Catalan
        ]).isRequired
    },

    getInitialState: function () {
        return {
            current:  null,
            forecast: []
        };
    },

    getApiRequest: function () {
        var params = {
            city:    this.props.city,
            country: this.props.country,
            lang:    this.props.lang,
            limit:   this.props.limit
        };

        return {
            id: format('weather.combined.{city}.{country}.{lang}.{limit}', params),
            params: params
        };
    },

    onApiData: function (weather) {
        this.setState(weather);
    },

    render: function () {
        var descriptionNode = null;
        var tempNode        = null;
        var iconNode        = null;

        if (this.state.current) {
            if (this.state.current.weather.length > 0) {
                //{this.state.current.weather[0].id}
                descriptionNode = (
                    <div className="weather__weather__description">{this.state.current.weather[0].description}</div>
                );

                var iconClass = 'weather__icon weather__icon--' + WeatherCodeHelper.icon(this.state.current.weather[0].id);
                iconNode = (
                    <i className={iconClass} />
                );
            }

            tempNode = (
                <span className="weather__weather__temp">
                    <span className="weather__weather__temp__value">{Math.round(this.state.current.main.temp - 273.15)}</span>
                    <span className="weather__weather__temp__unit">°C</span>
                </span>
            );
        }

        var forecastItemNodes = this.state.forecast.map(function (data, i) {
            return (<WeatherForecastItem key={i} data={data} />);
        });

        return (
            <div>
                <div className="widget__header">
                    <span className="widget__header__subject">{this.props.city} - {this.props.country}</span>
                    <i className="fa fa-info-circle" />
                </div>
                <div className="widget__body">
                    <div className="weather__weather__current">
                        {iconNode}
                        {tempNode}
                        {descriptionNode}
                    </div>
                    <div className="weather__weather__forecast">
                        {forecastItemNodes}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Weather;