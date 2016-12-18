import React, { PropTypes, Component } from 'react'


class TrapApiError extends Component {
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

TrapApiError.propTypes = {
    error:    PropTypes.object,
    children: PropTypes.node,
}


export default TrapApiError
