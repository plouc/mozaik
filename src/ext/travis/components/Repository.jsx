var React            = require('react');
var Reflux           = require('reflux');
var _                = require('lodash');
var moment           = require('moment');
var ApiConsumerMixin = require('./../../../core/mixins/ApiConsumerMixin');

var Repository = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    propTypes: {
        owner:      React.PropTypes.string.isRequired,
        repository: React.PropTypes.string.isRequired
    },

    getInitialState: function () {
        return {
            repository: null
        };
    },

    getApiRequest: function () {
        return {
            id: 'travis.repository.' + this.props.owner + '.' + this.props.repository,
            params: {
                owner:      this.props.owner,
                repository: this.props.repository
            }
        };
    },

    onApiData: function (repository) {
        this.setState({
            repository: repository
        });
    },

    render: function () {
        return (
            <div>
                <div className="widget__header">
                    {this.state.repository ? this.state.repository.slug : ''}
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                </div>
            </div>
        );
    }
});

module.exports = Repository;