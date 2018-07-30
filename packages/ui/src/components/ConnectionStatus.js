import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    WS_STATUS_DELAYING,
    WS_STATUS_CONNECTED,
    WS_STATUS_FAILED,
    WS_RETRY_DELAY,
} from '../constants/wsConstants'

const WS_RETRY_DELAY_SECONDS = WS_RETRY_DELAY / 1000

class ConnectionStatus extends Component {
    constructor(props) {
        super(props)
        this.reconnectionAttempts = props.reconnectionAttempts
        this.state = { countdown: 0 }
    }

    clearCountDown() {
        if (this.timer) {
            clearInterval(this.timer)
        }
    }

    startCountDown() {
        this.clearCountDown()

        this.setState({ countdown: WS_RETRY_DELAY_SECONDS })
        this.timer = setInterval(() => {
            const { countdown } = this.state
            this.setState({ countdown: countdown - 1 })
        }, 1000)
    }

    componentDidMount() {
        this.startCountDown()
    }

    componentWillUnmount() {
        this.clearCountDown()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.timer) {
            clearInterval(this.timer)
        }

        if (this.props.retryCount < nextProps.retryCount) {
            this.startCountDown()
        }
    }

    render() {
        const { status, retryCount } = this.props
        const { countdown } = this.state

        let message
        let iconClass
        let attemptsText =
            this.reconnectionAttempts !== 'Infinity' ? ` of ${this.reconnectionAttempts}` : ''
        if (status === WS_STATUS_CONNECTED) {
            iconClass = 'check'
            message = 'connection restored.'
        } else if (status === WS_STATUS_DELAYING) {
            iconClass = 'warning'
            message = (
                <span>
                    lost connection to Mozaïk server, will attempt to reconnect in {countdown}s (
                    {retryCount}
                    {attemptsText} attempts so far).
                </span>
            )
        } else if (status === WS_STATUS_FAILED) {
            iconClass = 'frown-o'
            message = (
                <span>
                    unable to restore connection after {retryCount} attemps, please make sure Mozaïk
                    server is running and that you can reach the internet if running on a remote
                    server.
                </span>
            )
        }

        return (
            <div className="connection-status">
                <i className={`fa fa-${iconClass}`} />
                {message}
            </div>
        )
    }
}

ConnectionStatus.propTypes = {
    retryCount: PropTypes.number.isRequired,
    status: PropTypes.oneOf([WS_STATUS_DELAYING, WS_STATUS_CONNECTED, WS_STATUS_FAILED]).isRequired,
    reconnectionAttempts: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

ConnectionStatus.defaultProps = {
    retryCount: 0,
}

export default ConnectionStatus
