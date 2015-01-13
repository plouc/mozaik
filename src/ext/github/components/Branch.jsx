var React = require('react');

var Branch = React.createClass({
    render() {
        var authorAvatar = null;
        var authorNode   = null;
        if (this.props.branch.commit) {
            if (this.props.branch.commit.author) {
                authorAvatar = (
                    <div className="github__branch__avatar">
                        <img src={this.props.branch.commit.author.avatar_url} />
                    </div>
                );

                authorNode = <span>by {this.props.branch.commit.author.login}</span>
            }
        }

        return (
            <div className="list__item github__branch">
                {authorAvatar}
                {this.props.branch.name}&nbsp;
                {authorNode}
            </div>
        );
    }
});

module.exports = Branch;