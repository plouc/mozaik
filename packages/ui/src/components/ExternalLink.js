import React, { Component } from 'react'

export default class ExternalLink extends Component {
    render() {
        const { children, ...rest } = this.props

        return (
            <a target="_blank" rel="noopener noreferrer" {...rest}>
                {children}
            </a>
        )
    }
}
