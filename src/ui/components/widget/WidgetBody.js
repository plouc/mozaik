import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import classes                         from './WidgetBody.css'


export default class WidgetBody extends Component {
    static propTypes = {
        style: PropTypes.object,
    }

    static defaultProps = {
        style: {},
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { children, style } = this.props
        const { theme }           = this.context

        return (
            <div
                className={`widget__body ${classes.body} ${_.get(theme, 'widgetBody.body', '')}`}
                style={style}
            >
                {children}
            </div>
        )
    }
}
