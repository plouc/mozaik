var React            = require('react');
var Reflux           = require('reflux');
var _                = require('lodash');
var Stack            = require('./Stack.jsx');
var ApiConsumerMixin = require('./../../../core/mixins/ApiConsumerMixin');

var Stacks = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    getInitialState() {
        return {
            stacks: []
        };
    },

    getApiRequest() {
        return {
            id: 'aws.stacks'
        };
    },

    onApiData(stacks) {
        this.setState({
            stacks: stacks
        });
    },

    render() {
        var stackNodes = _.map(this.state.stacks, stack => {
            return (<Stack key={stack.StackId} stack={stack} />);
        });

        return (
            <div>
                <div className="widget__header">
                    AWS stacks
                    <span className="widget__header__count">
                        {this.state.stacks.length}
                    </span>
                    <i className="fa fa-cloud" />
                </div>
                <div className="widget__body">
                    {stackNodes}
                </div>
            </div>
        );
    }
});

module.exports = Stacks;