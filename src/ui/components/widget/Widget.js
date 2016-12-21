import React, { Component, PropTypes } from 'react'


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
                style={{
                    position:        'relative',
                    width:           '100%',
                    height:          '100%',
                    backgroundColor: theme.widget.bgColor,
                    borderRadius:    theme.widget.borderRadius,
                    boxShadow:       theme.widget.shadow,
                    border:          theme.widget.border,
                    ..._style,
                }}
            >
                {children}
            </div>
        )
    }
}
