import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import classes                         from './WidgetTable.css'


export default class WidgetTableCell extends Component {
    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { children } = this.props
        const { theme }    = this.context

        return (
            <td className={`widget__table__cell ${classes.cell} ${_.get(theme, 'widgetTable.cell', '')}`}>
                {children}
            </td>
        )
    }
}
