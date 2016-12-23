import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import classes                         from './WidgetLabel.css'


export default class WidgetLoader extends Component {
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
        const { style } = this.props
        const { theme } = this.context

        return (
            <div className={`widget__loader ${classes.wrapper} ${_.get(theme, 'widgetLoader.loader', '')}`} style={style}>
                LOADER
            </div>
        )
    }
}
