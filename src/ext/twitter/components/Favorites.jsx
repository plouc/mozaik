var React  = require('react');
var moment = require('moment');

var Favorites = React.createClass({
    render() {
        var cssClasses = 'twitter__favorites';
        if (this.props.tweet.favorite_count === 0) {
            cssClasses += ' twitter__favorites--none';
        }

        return (
            <span className={cssClasses}>
                <i className="fa fa-star" /> {this.props.tweet.favorite_count ? this.props.tweet.favorite_count : ''}
            </span>
        );
    }
});

module.exports = Favorites;