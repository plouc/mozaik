import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import classes                         from './WidgetLabel.css'


export default class WidgetLabel extends Component {
    static propTypes = {
        prefix: PropTypes.node,
        label:  PropTypes.node.isRequired,
        suffix: PropTypes.node,
        style:  PropTypes.object.isRequired,
    }

    static defaultProps = {
        style: {},
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { label, prefix, suffix, style: style } = this.props

        const { theme } = this.context

        let prefixNode = null
        if (prefix !== undefined) {
            prefixNode = (
                <span
                    className={`widget__label__addon ${classes.addon} ${_.get(theme, 'widgetLabel.addon', '')}`}
                >
                    {prefix}
                </span>
            )
        }

        let suffixNode = null
        if (suffix !== undefined) {
            suffixNode = (
                <span
                    className={`widget__label__addon ${classes.addon} ${_.get(theme, 'widgetLabel.addon', '')}`}
                >
                    {suffix}
                </span>
            )
        }

        return (
            <span className={`widget__label__wrapper ${classes.wrapper} ${_.get(theme, 'widgetLabel.wrapper', '')}`} style={style}>
                {prefixNode}
                <span className={`widget__label ${classes.label} ${_.get(theme, 'widgetLabel.label', '')}`}>
                    {label}
                </span>
                {suffixNode}
            </span>
        )
    }
}
