import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import classes from './WidgetAvatar.css'

export default class WidgetAvatar extends Component {
    static propTypes = {
        children: PropTypes.node,
        size: PropTypes.oneOfType([
            PropTypes.number,
            // supports string because of vmin, rem…
            // CSS calc() is used to compute relative sizes
            PropTypes.string,
        ]).isRequired,
        style: PropTypes.object,
    }

    static defaultProps = {
        size: 36,
        style: {},
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { children, size, style: _style } = this.props
        const { theme } = this.context

        const style = {
            fontSize: `calc(${size} / 2)`,
            height: size,
            width: size,
            ..._style,
        }

        return (
            <div
                className={`widget__avatar ${classes.avatar} ${_.get(
                    theme,
                    'widgetAvatar.avatar',
                    ''
                )}`}
                style={style}
            >
                {children}
            </div>
        )
    }
}
