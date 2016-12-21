import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import UnknowWidgetTypeError           from './UnknowWidgetTypeError'


const ignoreProps = [
    'extension', 'widget', 'registry',
    'subscriptionId', 'apiData', 'apiErrors',
]


export default class WidgetWrapper extends Component {
    static propTypes = {
        apiData:        PropTypes.object.isRequired,
        extension:      PropTypes.string.isRequired,
        widget:         PropTypes.string.isRequired,
        subscriptionId: PropTypes.string,
        registry:       PropTypes.shape({
            getComponent: PropTypes.func.isRequired,
        }).isRequired,
    }

    render() {
        const {
            registry,
            apiData, apiErrors,
            extension, widget: type,
            subscriptionId,
        } = this.props

        //console.log(`${extension}.${type}.render()`)

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
            const component = registry.getComponent(extension, type)

            // Pass props to widget component without 'metadata
            const childProps = _.omit(this.props, ignoreProps)

            if (subscriptionId) {
                if (apiData[subscriptionId]) {
                    childProps.apiData = apiData[subscriptionId]
                }
                if (apiErrors[subscriptionId]) {
                    childProps.apiError = apiErrors[subscriptionId]
                }
            }

            content = React.createElement(component, childProps)
        }

        return content
    }
}
