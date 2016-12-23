import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import UnknowWidgetTypeError           from './UnknowWidgetTypeError'
import shallowEqual                    from '../../lib/shallowEqual'
import { is }                          from 'immutable'


const ignoreProps = ['extension', 'widget', 'registry', 'apiData', 'apiError']


export default class WidgetWrapper extends Component {
    static propTypes = {
        apiData:        PropTypes.object,
        extension:      PropTypes.string.isRequired,
        widget:         PropTypes.string.isRequired,
        subscriptionId: PropTypes.string,
        registry:       PropTypes.shape({
            getComponent: PropTypes.func.isRequired,
        }).isRequired,
    }

    shouldComponentUpdate(nextProps) {
        return !shallowEqual(_.omit(this.props, ignoreProps), _.omit(nextProps, ignoreProps)) ||
            !is(this.props.apiData, nextProps.apiData) ||
            !is(this.props.apiError, nextProps.apiError)
    }

    render() {
        const { registry, extension, widget: type, apiData, apiError } = this.props

        console.log(`=> ${extension}.${type}`)

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
            if (apiData) {
                childProps.apiData = apiData.toJS()
            }
            if (apiError) {
                childProps.apiError = apiError.toJS()
            }

            content = React.createElement(component, childProps)
        }

        return content
    }
}
