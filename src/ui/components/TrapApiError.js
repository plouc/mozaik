import React, { PropTypes, Component } from 'react'


export default class TrapApiError extends Component {
    static propTypes = {
        error:    PropTypes.object,
        children: PropTypes.node,
    }

    render() {
        const { error, children } = this.props

        if (error) {
            return (
                <div className="widget__error">
                    {error.message}
                </div>
            )
        }

        return children
    }
}
