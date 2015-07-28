import React             from 'react';
import _                 from 'lodash';
import ComponentRegistry from './../component-registry';


export default React.createClass({
    displayName: 'Widget',

    render() {
        let { type, x, y, w, h } = this.props;

        let style = {
            top:    y,
            left:   x,
            width:  w,
            height: h
        };

        // Pass props to widget component without 'metadata'
        let childProps = _.omit(this.props, ['x', 'y', 'w', 'h', 'type']);

        // Pick component from registry and instantiate with filtered props
        let widget = React.createElement(ComponentRegistry.get(type), _.extend({}, childProps));

        // Set class according to component type
        let cssClass = `widget ${ type.replace('_', '-').replace('.', '__') }`;

        return (
            <div className="widget__wrapper" style={style}>
                <div className={cssClass}>
                    {widget}
                </div>
            </div>
        );
    }
});
