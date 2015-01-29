var React            = require('react');
var Reflux           = require('reflux');
var moment           = require('moment');
var _                = require('lodash');
var ApiConsumerMixin = require('./../../../core/mixins/ApiConsumerMixin');
var Treemap          = require('./../../../core/components/charts/Treemap.jsx');


var HashtagsPie = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    propTypes: {
        hashtags: React.PropTypes.arrayOf(React.PropTypes.shape({
            text:  React.PropTypes.string,
            color: React.PropTypes.string
        })).isRequired
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
                label: `#${ hashtag.text }`,
                count: hashtag.count,
                color: hashtag.color
            };
        });

        return (
            <div>
                <div className="widget__header">
                    Twitter hashtags treemap
                    <i className="fa fa-twitter" />
                </div>
                <div className="widget__body">
                    <Treemap data={{ children: data }} />
                </div>
            </div>
        );
    }
});

module.exports = HashtagsPie;