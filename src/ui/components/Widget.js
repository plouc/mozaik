import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'


const ignoreProps = [
    'type', 'x', 'y', 'width', 'height',
    'registry', 'apiData',
    'subscribeToApi', 'unsubscribeFromApi',
]


class Widget extends Component {
    getSubscription() {
        const { registry, type } = this.props

        // Pick component from registry
        const component = registry.get(type)

        if (_.isFunction(component.getApiRequest)) {
            const childProps   = _.omit(this.props, ignoreProps)
            const subscription = component.getApiRequest(childProps)
            if (!_.isObject(subscription) || !subscription.id) {
                console.error(`widget ${type} 'getApiRequest()' must return an object with an 'id' property`)
            } else {
                return subscription
            }
        }

        return null
    }

    componentWillMount() {
        const { subscribeToApi } = this.props

        const subscription = this.getSubscription()
        if (subscription) {
            subscribeToApi(subscription)
        }
    }

    componentWillUnmount() {
        const { unsubscribeFromApi } = this.props

        const subscription = this.getSubscription()
        if (subscription) {
            unsubscribeFromApi(subscription.id)
        }
    }

    render() {
        const { registry, apiData, type, x, y, width, height } = this.props

        const style = {
            top:  y,
            left: x,
            width,
            height,
        }

        // Pass props to widget component without 'metadata
        let childProps = _.omit(this.props, ignoreProps)

        // Pick component from registry and instantiate with filtered props
        const component = registry.get(type)

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
    subscribeToApi:     PropTypes.func.isRequired,
    unsubscribeFromApi: PropTypes.func.isRequired,
    apiData:            PropTypes.object.isRequired,
    type:               PropTypes.string.isRequired,
    x:                  PropTypes.string.isRequired,
    y:                  PropTypes.string.isRequired,
    width:              PropTypes.string.isRequired,
    height:             PropTypes.string.isRequired,
    registry:           PropTypes.shape({
        get: PropTypes.func.isRequired,
    }).isRequired,
}


export default Widget
