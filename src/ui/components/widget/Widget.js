import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import baseTheme                       from './Widget.css'


export default class Widget extends Component {
    static propTypes = {
        style: PropTypes.object.isRequired,
    }

    static defaultProps = {
        style: {},
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { children, style: _style } = this.props
        const { theme }                   = this.context

        return (
            <div
                className={`${baseTheme.widget} ${_.get(theme, 'widget.widget', '')}`}
                style={_style}
            >
                {children}
            </div>
        )
    }
}
