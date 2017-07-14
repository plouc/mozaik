import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { TransitionMotion, spring } from 'react-motion'
import classes from './DashboardHeader.css'

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

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { currentDashboardIndex, title } = this.props
        const { theme } = this.context

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
                {styles =>
                    <div style={{ position: 'relative' }}>
                        {styles.map(({ key, data, style }) => {
                            return (
                                <div
                                    className={`${classes.title} ${_.get(
                                        theme,
                                        'dashboardHeader.title',
                                        ''
                                    )}`}
                                    key={key}
                                    style={{
                                        transform: `translate(${style.x}px,0)`,
                                        opacity: style.opacity,
                                    }}
                                >
                                    {data}
                                </div>
                            )
                        })}
                    </div>}
            </TransitionMotion>
        )
    }
}
