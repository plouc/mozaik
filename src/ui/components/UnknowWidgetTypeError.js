import React, { Component, PropTypes } from 'react'
import WidgetHeader                    from './widget/WidgetHeader'
import WidgetBody                      from './widget/WidgetBody'


export default class UnknowWidgetTypeError extends Component {
    static contextTypes = {
        theme:     PropTypes.object.isRequired,
        extension: PropTypes.string.isRequired,
        widget:    PropTypes.string.isRequired,
    }

    render() {
        const { extension, widget } = this.props
        const { theme }             = this.context

        return (
            <div>
                <WidgetHeader
                    title="Error"
                    icon="warning"
                    iconStyle={{ color: theme.colors.failure }}
                />
                <WidgetBody style={{ padding: '2vmin' }}>
                    <p style={{ color: theme.colors.failure }}>
                        Unknown widget "{widget}" for extension "{extension}".
                    </p>
                    <p>
                        Please make sure you installed the corresponding package
                        (should be "mozaik-ext-{extension}") and the package provides
                        a "{widget}" widget.
                    </p>
                </WidgetBody>
            </div>
        )
    }
}
