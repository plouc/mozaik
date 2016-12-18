import React, { Component, PropTypes } from 'react'


class WidgetTableHeadCell extends Component {
    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { children, _style } = this.props

        const { theme } = this.context

        const style = {
            padding:   theme.table.cell.head.padding,
            textAlign: 'left',
            ...theme.table.cell.head.overrides,
            ..._style,
        }

        return (
            <th style={style}>
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
