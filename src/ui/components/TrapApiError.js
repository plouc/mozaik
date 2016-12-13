import React, { PropTypes, Component } from 'react'


class TrapApiError extends Component {
    render() {
        const { apiError, children } = this.props

        if (apiError) {
            return (
                <div className="widget__error">
                    {apiError.message}
                </div>
            )
        }

        return children
    }
}

TrapApiError.propTypes = {
    error: PropTypes.object,
}


export default TrapApiError
