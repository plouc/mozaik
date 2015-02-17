var React             = require('react');
var _                 = require('lodash');
var ComponentRegistry = require('./../component-registry');


var Widget = React.createClass({
    render() {
        var style = {
            top:    this.props.y,
            left:   this.props.x,
            width:  this.props.w,
            height: this.props.h
        };

        var childProps = _.omit(this.props, ['x', 'y', 'w', 'h', 'type']);

        var widget = React.createElement(ComponentRegistry.get(this.props.type), _.extend({}, childProps));

        var cssClass = 'widget ' + this.props.type.replace('_', '-').replace('.', '__');

        return (
            <div className="widget__wrapper" style={style}>
                <div className={cssClass}>
                    {widget}
                </div>
            </div>
        );
    }
});

module.exports = Widget;