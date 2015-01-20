var React            = require('react');
var Reflux           = require('reflux');
var ListTweet        = require('./ListTweet.jsx');
var ApiConsumerMixin = require('./../../../core/mixins/ApiConsumerMixin');

var Timeline = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    propTypes: {
    },

    getInitialState() {
        return {
            tweets: []
        };
    },

    getApiRequest() {
        return {
            id: 'twitter.userTimeline'
        };
    },

    onApiData(tweets) {
        this.setState({
            tweets: tweets
        });
    },

    render() {
        var tweetNodes = this.state.tweets.map(tweet => {
            return <ListTweet key={tweet.id} tweet={tweet} />
        });

        return (
            <div>
                <div className="widget__header">
                    Twitter
                    <i className="fa fa-twitter" />
                </div>
                <div className="widget__body">
                    {tweetNodes}
                </div>
            </div>
        );
    }
});

module.exports = Timeline;