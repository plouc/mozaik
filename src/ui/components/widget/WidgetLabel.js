import React, { Component, PropTypes } from 'react'


class WidgetLabel extends Component {
    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { label, prefix, suffix, style: _style } = this.props

        const { theme } = this.context

        const style = {
            display:      'inline-flex',
            alignItems:   'stretch',
            alignContent: 'stretch',
            border:       theme.label.border,
            ..._style,
        }

        const labelStyle = {
            display:         'inline-block',
            whiteSpace:      'pre',
            flexGrow:        1,
            backgroundColor: theme.label.bgColor,
            color:           theme.label.textColor,
            padding:         theme.label.padding,
        }

        const addonStyle = {
            whiteSpace:      'pre',
            padding:         theme.label.padding,
            backgroundColor: theme.label.addon.bgColor,
            color:           theme.label.addon.textColor,
        }

        let prefixNode = null
        if (prefix !== undefined) {
            prefixNode = (
                <span style={addonStyle}>{prefix}</span>
            )
        }

        let suffixNode = null
        if (suffix !== undefined) {
            suffixNode = (
                <span style={addonStyle}>{suffix}</span>
            )
        }

        return (
            <span style={style}>
                {prefixNode}
                <span style={labelStyle}>
                    {label}
                </span>
                {suffixNode}
            </span>
        )
    }
}

WidgetLabel.propTypes = {
    prefix: PropTypes.node,
    label:  PropTypes.node.isRequired,
    suffix: PropTypes.node,
    style:  PropTypes.object.isRequired,
}

WidgetLabel.defaultProps = {
    style: {}
}


export default WidgetLabel
