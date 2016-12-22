import React, { Component, PropTypes } from 'react'
import './WidgetTable.css'


class WidgetTable extends Component {
    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { children } = this.props

        return (
            <table styleName="table">
                {children}
            </table>
        )
    }
}


export default WidgetTable
