import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import './WidgetTable.css'

class WidgetTable extends Component {
    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { children } = this.props

        return (
            <table styleName="table" className="widget__table">
                {children}
            </table>
        )
    }
}

export default WidgetTable
