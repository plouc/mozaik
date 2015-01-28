var React  = require('react');
var moment = require('moment');

var UserAvatar = React.createClass({
    render() {
        var user = this.props.tweet.user;
        if (this.props.tweet.retweeted === true) {
            user = this.props.tweet.retweeted_status.user;
        }

        //console.log(user);

        var avatarUrl = user.profile_image_url.replace('_normal', '_mini');

        return (
            <span className="twitter__avatar">
                <img src={avatarUrl} alt={user.name} />
            </span>
        );
    }
});

module.exports = UserAvatar;