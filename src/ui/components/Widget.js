import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import ComponentRegistry               from './../componentRegistry'


class Widget extends Component {
    componentWillMount() {
        const { type, subscribeToApi } = this.props

        // Pick component from registry
        const component = ComponentRegistry.get(type)

        if (_.isFunction(component.getApiRequest)) {
            const childProps = _.omit(this.props, ['type', 'x', 'y', 'width', 'height', 'apiData'])
            subscribeToApi(component.getApiRequest(childProps))
        }
    }

    render() {
        const { apiData, type, x, y, width, height } = this.props

        const style = {
            top:  y,
            left: x,
            width,
            height,
        }

        // Pass props to widget component without 'metadata
        let childProps = _.omit(this.props, ['type', 'x', 'y', 'width', 'height', 'apiData'])

        // Pick component from registry and instantiate with filtered props
        const component = ComponentRegistry.get(type)

        if (_.isFunction(component.getApiRequest)) {
            const { id } = component.getApiRequest(childProps)
            if (apiData[id]) {
                childProps = {
                    ...childProps,
                    apiData: apiData[id],
                }
            }
        }

        const widget = React.createElement(component, childProps)

        // Set css class according to component type
        const cssClass = `widget ${ type.replace('_', '-').replace('.', '__') }`

        return (
            <div className="widget__wrapper" style={style}>
                <div className={cssClass}>
                    {widget}
                </div>
            </div>
        )
    }
}

Widget.propTypes = {
    subscribeToApi: PropTypes.func.isRequired,
    apiData:        PropTypes.object.isRequired,
    type:           PropTypes.string.isRequired,
    x:              PropTypes.string.isRequired,
    y:              PropTypes.string.isRequired,
    width:          PropTypes.string.isRequired,
    height:         PropTypes.string.isRequired,
}


export default Widget
