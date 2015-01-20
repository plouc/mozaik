var React  = require('react');
var moment = require('moment');

var ListTweet = React.createClass({
    render() {
        var cssClasses = 'list__item';

        return (
            <div className={cssClasses}>
                {this.props.tweet.text}
            </div>
        );
    }
});

module.exports = ListTweet;