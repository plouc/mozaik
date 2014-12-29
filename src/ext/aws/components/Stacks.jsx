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

    getInitialState: function () {
        return {
            stacks: []
        };
    },

    getApiRequest: function () {
        return {
            id: 'aws.stacks'
        };
    },

    onApiData: function (stacks) {
        this.setState({
            stacks: stacks
        });
    },

    render: function () {
        var stackNodes = _.map(this.state.stacks, function (stack) {
            return (
                <Stack key={stack.StackId} stack={stack} />
            );
        });

        return <div>
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
    }
});

module.exports = Stacks;