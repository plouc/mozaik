import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NotificationsItem from './NotificationsItem'
import styled from 'styled-components'

const Wrapper = styled.div`
    position: absolute;
    z-index: 100000;
    width: 25%;
    top: 8vmin;
    right: 2vmin;
`

export default class Notifications extends Component {
    static propTypes = {
        notifications: PropTypes.array.isRequired,
    }

    render() {
        const { notifications } = this.props

        return (
            <Wrapper>
                {notifications.map(notification => (
                    <NotificationsItem
                        key={`notification.${notification.id}`}
                        notification={notification}
                    />
                ))}
            </Wrapper>
        )
    }
}
