import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Widget from './Widget'
import WidgetHeader from './WidgetHeader'
import WidgetBody from './WidgetBody'

export default class UnknowWidgetTypeError extends Component {
    static propTypes = {
        extension: PropTypes.string.isRequired,
        widget: PropTypes.string.isRequired,
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { extension, widget } = this.props
        return (
            <Widget>
                <WidgetHeader title="Error" icon="warning" />
                <WidgetBody style={{ padding: '2vmin' }}>
                    <p>
                        Unknown widget &quot;
                        {widget}
                        &quot; for extension &quot;
                        {extension}
                        &quot;.
                    </p>
                    <p>
                        Please make sure you installed the corresponding package (should be
                        &quot;mozaik-ext-
                        {extension}
                        &quot;) and the package provides a &quot;
                        {widget}
                        &quot; widget.
                    </p>
                </WidgetBody>
            </Widget>
        )
    }
}
