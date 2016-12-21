import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import UnknowWidgetTypeError           from './UnknowWidgetTypeError'


const ignoreProps = [
    'extension', 'widget', 'x', 'y', 'width', 'height',
    'registry', 'apiData', 'apiErrors',
    'subscribeToApi', 'unsubscribeFromApi',
]


export default class WidgetWrapper extends Component {
    static propTypes = {
        subscribeToApi:     PropTypes.func.isRequired,
        unsubscribeFromApi: PropTypes.func.isRequired,
        apiData:            PropTypes.object.isRequired,
        extension:          PropTypes.string.isRequired,
        widget:             PropTypes.string.isRequired,
        top:                PropTypes.string.isRequired,
        left:               PropTypes.string.isRequired,
        width:              PropTypes.string.isRequired,
        height:             PropTypes.string.isRequired,
        registry:           PropTypes.shape({
            get: PropTypes.func.isRequired,
        }).isRequired,
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    getSubscription() {
        const { registry, extension, widget } = this.props

        // The error will be displayed in the render method
        // so we just ignore it here
        if (!registry.has(extension, widget)) return null

        // Pick component from registry
        const component = registry.get(extension, widget)

        if (_.isFunction(component.getApiRequest)) {
            const childProps   = _.omit(this.props, ignoreProps)
            const subscription = component.getApiRequest(childProps)
            if (!_.isObject(subscription) || !subscription.id) {
                console.error(`widget ${extension}.${widget} 'getApiRequest()' must return an object with an 'id' property`)
            } else {
                return subscription
            }
        }

        return null
    }

    componentDidMount() {
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
            //unsubscribeFromApi(subscription.id)
        }
    }

    render() {
        const {
            registry,
            apiData, apiErrors,
            extension, widget: type,
        } = this.props

        let content
        if (!registry.has(extension, type)) {
            content = (
                <UnknowWidgetTypeError
                    extension={extension}
                    widget={type}
                />
            )
        } else {
            // Pick component from registry and instantiate with filtered props
            const component = registry.get(extension, type)

            // Pass props to widget component without 'metadata
            const childProps = _.omit(this.props, ignoreProps)

            if (_.isFunction(component.getApiRequest)) {
                const { id } = component.getApiRequest(childProps)
                if (apiData[id]) {
                    childProps.apiData = apiData[id]
                }
                if (apiErrors[id]) {
                    childProps.apiError = apiErrors[id]
                }
            }

            content = React.createElement(component, childProps)
        }

        return content
    }
}
