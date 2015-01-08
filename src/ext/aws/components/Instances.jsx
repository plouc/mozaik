var React            = require('react');
var Reflux           = require('reflux');
var _                = require('lodash');
var ApiConsumerMixin = require('./../../../core/mixins/ApiConsumerMixin');

var Instances = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    getInitialState() {
        return {
            instances: []
        };
    },

    getApiRequest() {
        return {
            id: 'aws.instances'
        };
    },

    onApiData(instances) {
        // if we have an available filter on instance name, apply it
        if (this.props.nameFilter) {
            instances = _.where(instances, instance => this.props.nameFilter.test(instance.name));
        }

        this.setState({
            instances: instances
        });
    },

    render() {
        var instanceNodes = _.map(this.state.instances, instance => {
            var cssClass = 'aws__instance aws__instance--' + instance.state;

            return (
                <div key={instance.id} className={cssClass}>
                    {instance.name}
                    {instance.state}
                    <span  className="aws__instance__id">{instance.id}</span>
                </div>
            );
        });

        return (
            <div>
                <div className="widget__header">
                    AWS instances
                    <span className="widget__header__count">
                        {this.state.instances.length}
                    </span>
                    <i className="fa fa-hdd-o" />
                </div>
                <div className="widget__body">
                    {instanceNodes}
                </div>
            </div>
        );
    }
});

module.exports = Instances;