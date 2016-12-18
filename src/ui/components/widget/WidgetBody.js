import React, { Component, PropTypes } from 'react'


class WidgetBody extends Component {
    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { children, style: _style } = this.props

        const { theme } = this.context

        const style = {
            position:  'absolute',
            right:     0,
            bottom:    0,
            left:      0,
            overflowX: 'hidden',
            overflowY: 'auto',
            top:       theme.widget.header.height,
             //top:              widget-header-height,
             //background-color: widget-body-bg-color,
             //border-radius:    @(t) { return 0 0 t.widget-border-radius t.widget-border-radius },
             //box-shadow:       widget-body-shadow,
            ..._style,
        }

        return (
            <div style={style}>
                {children}
            </div>
        )
    }
}

WidgetBody.propTypes = {
    style: PropTypes.object,
}

WidgetBody.defaultProps = {
    style: {},
}


export default WidgetBody
