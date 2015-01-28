var React            = require('react');
var Reflux           = require('reflux');
var moment           = require('moment');
var _                = require('lodash');
var $                = require('jquery');
var ApiConsumerMixin = require('./../../../core/mixins/ApiConsumerMixin');
var Pie              = require('./../../../core/components/charts/Pie.jsx');
var HashtagsLegends  = require('./hashtags-pie/HashtagsLegends.jsx');

var HashtagsPie = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    getDefaultProps() {
        return {
            layout: 'right'
        };
    },

    propTypes: {
        hashtags: React.PropTypes.arrayOf(React.PropTypes.shape({
            text:  React.PropTypes.string,
            color: React.PropTypes.string
        })).isRequired,
        layout: React.PropTypes.oneOf([
            'top',
            'right',
            'bottom',
            'left'
        ])
    },

    getInitialState() {
        return {
            hashtags:  [],
            dateRange: null
        };
    },

    getApiRequest() {
        return {
            id: `twitter.searchByHashtags.${ _.pluck(this.props.hashtags, 'text').join('.') }`,
            params: {
                hashtags: this.props.hashtags
            }
        };
    },

    onApiData(data) {
        this.setState({
            hashtags: data.hashtags,
            dateRange:   {
                start: moment(data.dateRange.start),
                end:   moment(data.dateRange.end)
            }
        });
    },

    render() {
        var data = _.map(this.state.hashtags, hashtag => {
            return {
                id:    hashtag.normText,
                count: hashtag.count,
                color: hashtag.color
            };
        });

        var containerClasses = 'widget__body twitter__hashtags-pie__container ';
        containerClasses    += 'twitter__hashtags-pie__container--layout-' + this.props.layout;

        return (
            <div>
                <div className="widget__header">
                    Twitter hashtags donut
                    <i className="fa fa-twitter" />
                </div>
                <div className={containerClasses}>
                    <div className="twitter__hashtags-pie__chart">
                        <Pie innerRadius={0.6} data={data} />
                    </div>
                    <div className="twitter__hashtags-pie__legends">
                        <HashtagsLegends hashtags={this.state.hashtags} />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = HashtagsPie;