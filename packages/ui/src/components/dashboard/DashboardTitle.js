import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TransitionMotion, spring } from 'react-motion'
import styled from 'styled-components'

const Title = styled.div`
    height: 6vmin;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    white-space: pre;
    font-family: ${props => props.theme.dashboard.header.title.fontFamily};
    font-size: ${props => props.theme.dashboard.header.title.fontSize};
    text-transform: ${props => props.theme.dashboard.header.title.textTransform};
    color: ${props => props.theme.dashboard.header.title.color};
    ${props => props.theme.dashboard.header.title.extend.trim()};
`

const willEnter = () => ({ x: 30, opacity: 0 })
const willLeave = () => ({
    x: spring(0, { stiffness: 150, damping: 15 }),
    opacity: spring(0, { stiffness: 150, damping: 15 }),
})

export default class DashboardTitle extends Component {
    static propTypes = {
        currentDashboardIndex: PropTypes.number.isRequired,
        title: PropTypes.string,
    }

    render() {
        const { currentDashboardIndex, title } = this.props

        const items = [{ key: currentDashboardIndex, title }]

        return (
            <TransitionMotion
                willEnter={willEnter}
                willLeave={willLeave}
                styles={items.map(item => ({
                    key: `${item.key}`,
                    data: item.title,
                    style: {
                        x: spring(0, { stiffness: 60, damping: 15 }),
                        opacity: spring(1, { stiffness: 60, damping: 15 }),
                    },
                }))}
            >
                {styles => (
                    <div style={{ position: 'relative' }}>
                        {styles.map(({ key, data, style }) => {
                            return (
                                <Title
                                    className="Dashboard__Title"
                                    key={key}
                                    style={{
                                        transform: `translate(${style.x}px,0)`,
                                        opacity: style.opacity,
                                    }}
                                >
                                    {data}
                                </Title>
                            )
                        })}
                    </div>
                )}
            </TransitionMotion>
        )
    }
}
