import React, { Component, PropTypes } from 'react';
import _                               from 'lodash';
import ComponentRegistry               from './../component-registry';


class Widget extends Component {
    render() {
        const { type, x, y, width, height } = this.props;

        const style = {
            top:  y,
            left: x,
            width,
            height
        };

        // Pass props to widget component without 'metadata
        const childProps = _.omit(this.props, ['type', 'x', 'y', 'width', 'height']);

        // Pick component from registry and instantiate with filtered props
        const widget = React.createElement(ComponentRegistry.get(type), childProps);

        // Set class according to component type
        const cssClass = `widget ${ type.replace('_', '-').replace('.', '__') }`;

        return (
            <div className="widget__wrapper" style={style}>
                <div className={cssClass}>
                    {widget}
                </div>
            </div>
        );
    }
}

Widget.displayName = 'Widget';

Widget.propTypes = {
    type:   PropTypes.string.isRequired,
    x:      PropTypes.string.isRequired,
    y:      PropTypes.string.isRequired,
    width:  PropTypes.string.isRequired,
    height: PropTypes.string.isRequired
};


export default Widget;
