import React, { Component, PropTypes } from 'react'


class WidgetTableCell extends Component {
    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { children } = this.props

        const { theme } = this.context

        return (
            <td
                style={{
                    padding: '1vmin 2vmin',
                }}
            >
                {children}
            </td>
        )
    }
}


export default WidgetTableCell
