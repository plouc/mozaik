import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TrapApiError extends Component {
    static propTypes = {
        error: PropTypes.object,
        children: PropTypes.node,
    }

    render() {
        const { error, children } = this.props

        if (error) {
            return <div className="widget__error">{error.message}</div>
        }

        return children
    }
}
