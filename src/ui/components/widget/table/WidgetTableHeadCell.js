import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import classes                         from './WidgetTable.css'


export default class WidgetTableHeadCell extends Component {
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
            <th
                className={`widget__table__cell ${classes.headCell} ${_.get(theme, 'widgetTable.headCell', '')}`}
                style={style}
            >
                {children}
            </th>
        )
    }
}
