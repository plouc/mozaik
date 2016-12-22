import React, { Component, PropTypes } from 'react'
import Widget                          from './Widget'
import WidgetHeader                    from './WidgetHeader'
import WidgetBody                      from './WidgetBody'


export default class UnknowWidgetTypeError extends Component {
    static propTypes = {
        extension: PropTypes.string.isRequired,
        widget:    PropTypes.string.isRequired,
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { extension, widget } = this.props
        const { theme }             = this.context

        //style={/*{ color: theme.colors.failure }*/}

        return (
            <Widget>
                <WidgetHeader
                    title="Error"
                    icon="warning"
                    //iconStyle={{ color: theme.colors.failure }}
                />
                <WidgetBody style={{ padding: '2vmin' }}>
                    <p>
                        Unknown widget "{widget}" for extension "{extension}".
                    </p>
                    <p>
                        Please make sure you installed the corresponding package
                        (should be "mozaik-ext-{extension}") and the package provides
                        a "{widget}" widget.
                    </p>
                </WidgetBody>
            </Widget>
        )
    }
}
