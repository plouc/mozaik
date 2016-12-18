import React, { Component, PropTypes } from 'react'


class WidgetTable extends Component {
    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { children } = this.props

        const { theme } = this.context

        return (
            <table
                style={{
                    width:          '100%',
                    borderCollapse: 'collapse',
                    fontSize:       '1.6vmin',
                }}
            >
                {children}
            </table>
        )
    }
}


export default WidgetTable
