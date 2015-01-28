var React = require('react');

var HashtagLegend = React.createClass({
    propTypes: {
        hashtag: React.PropTypes.shape({
            text:  React.PropTypes.string,
            color: React.PropTypes.string
        }).isRequired
    },

    render() {
        var colorStyle = {
            backgroundColor: this.props.hashtag.color
        };

        return (
            <li className="twitter__hashtags-pie__legend">
                <span style={colorStyle} className="twitter__hashtags-pie__legend__color" />
                {this.props.hashtag.text}&nbsp;
                <span className="count">{this.props.hashtag.count}</span>
            </li>
        );
    }
});

module.exports = HashtagLegend;