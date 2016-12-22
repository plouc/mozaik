import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import classes                         from './WidgetTable.css'


class WidgetTableHeadCell extends Component {
    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { children, _style } = this.props
        const { theme }            = this.context

        return (
            <th className={`${classes.headCell} ${_.get(theme, 'widgetTable.headCell', '')}`}>
                {children}
            </th>
        )
    }
}

WidgetTableHeadCell.propTypes = {
    style: PropTypes.object,
}

WidgetTableHeadCell.defaultProps = {
    style: {},
}


export default WidgetTableHeadCell
