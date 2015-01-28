var React  = require('react');
var moment = require('moment');

var Retweets = React.createClass({
    render() {
        var cssClasses = 'twitter__retweets';
        if (this.props.tweet.retweet_count === 0) {
            cssClasses += ' twitter__retweets--none';
        }

        return (
            <span className={cssClasses}>
                <i className="fa fa-retweet" /> {this.props.tweet.retweet_count ? this.props.tweet.retweet_count : ''}
            </span>
        );
    }
});

module.exports = Retweets;