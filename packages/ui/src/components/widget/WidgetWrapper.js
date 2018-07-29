import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import UnknowWidgetTypeError from './UnknowWidgetTypeError'
import shallowEqual from '../../lib/shallowEqual'
import { is } from 'immutable'
import { withTheme } from 'styled-components'

const ignoreProps = ['extension', 'widget', 'registry', 'apiData', 'apiError']

class WidgetWrapper extends Component {
    static propTypes = {
        apiData: PropTypes.object,
        apiError: PropTypes.object,
        extension: PropTypes.string.isRequired,
        widget: PropTypes.string.isRequired,
        subscriptionId: PropTypes.string,
        theme: PropTypes.object.isRequired,
        registry: PropTypes.shape({
            getComponent: PropTypes.func.isRequired,
        }).isRequired,
    }

    shouldComponentUpdate(nextProps) {
        return (
            !shallowEqual(_.omit(this.props, ignoreProps), _.omit(nextProps, ignoreProps)) ||
            !is(this.props.apiData, nextProps.apiData) ||
            !is(this.props.apiError, nextProps.apiError)
        )
    }

    render() {
        const { registry, extension, widget: type, apiData, apiError } = this.props

        //console.log(`=> ${extension}.${type}`)

        let content
        if (!registry.has(extension, type)) {
            content = <UnknowWidgetTypeError extension={extension} widget={type} />
        } else {
            // Pick component from registry and instantiate with filtered props
            const component = registry.getComponent(extension, type)

            // Pass props to widget component without 'metadata
            const childProps = _.omit(this.props, ignoreProps)
            if (apiData) {
                //console.log('API_DATA', apiData)
                childProps.apiData = apiData //.toJS()

                childProps.apiData = apiData
            }
            if (apiError) {
                childProps.apiError = apiError //.toJS()
            }

            content = React.createElement(component, childProps)
        }

        return content
    }
}

export default withTheme(WidgetWrapper)
