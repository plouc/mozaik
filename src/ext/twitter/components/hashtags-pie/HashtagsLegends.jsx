var React         = require('react');
var HashtagLegend = require('./HashtagLegend.jsx');

var HashtagsLegends = React.createClass({
    propTypes: {
        hashtags: React.PropTypes.arrayOf(React.PropTypes.shape({
            text:  React.PropTypes.string,
            color: React.PropTypes.string
        })).isRequired
    },

    render() {
        return (
            <ul className="twitter__hashtags-pie__legends__list">
                {this.props.hashtags.map(hashtag => <HashtagLegend key={hashtag.normText} hashtag={hashtag} />)}
            </ul>
        );
    }
});

module.exports = HashtagsLegends;