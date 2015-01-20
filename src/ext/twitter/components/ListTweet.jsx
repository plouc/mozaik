var React  = require('react');
var moment = require('moment');

var ListTweet = React.createClass({
    render() {
        var cssClasses = 'list__item';

        return (
            <div className={cssClasses}>
                {this.props.tweet.text}
                <div>
                    <i className="fa fa-retweet" /> {this.props.tweet.retweet_count}&nbsp;
                    <i className="fa fa-star" /> {this.props.tweet.favorite_count}
                </div>
            </div>
        );
    }
});

module.exports = ListTweet;