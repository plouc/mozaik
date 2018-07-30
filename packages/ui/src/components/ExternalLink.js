import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ExternalLink extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    }

    render() {
        const { children, ...rest } = this.props

        return (
            <a target="_blank" rel="noopener noreferrer" {...rest}>
                {children}
            </a>
        )
    }
}
