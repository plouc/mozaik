import React, { Component, PropTypes } from 'react'
import { TransitionMotion, spring }    from 'react-motion'


const willEnter = () => ({ x: 30, opacity: 0 })
const willLeave = () => ({
    x:       spring(0, { stiffness: 150, damping: 15 }),
    opacity: spring(0, { stiffness: 150, damping: 15 }),
})


export default class DashboardTitle extends Component {
    static propTypes = {
        currentDashboardIndex: PropTypes.number.isRequired,
        title:                 PropTypes.string,
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { currentDashboardIndex, title } = this.props
        const { theme }                        = this.context

        const items = [{ key: currentDashboardIndex, title }]

        return (
            <TransitionMotion
                willEnter={willEnter}
                willLeave={willLeave}
                styles={items.map(item => ({
                    key:   item.key,
                    data:  item.title,
                    style: {
                        x:       spring(0, { stiffness: 60, damping: 15 }),
                        opacity: spring(1, { stiffness: 60, damping: 15 }),
                    },
                }))}
            >
                {styles => (
                    <div
                        style={{
                            position: 'relative',
                            height:   theme.dashboard.header.height,
                            ...theme.dashboard.header.title.overrides,
                        }}
                    >
                        {styles.map(({ key, data, style }) => {
                            return (
                                <div
                                    key={key}
                                    style={{
                                        position:   'absolute',
                                        top:        0,
                                        left:       0,
                                        transform:  `translate(${style.x}px,0)`,
                                        opacity:    style.opacity,
                                        height:     theme.dashboard.header.height,
                                        display:    'flex',
                                        alignItems: 'center',
                                        whiteSpace: 'pre',
                                    }}
                                >
                                    {data}
                                </div>
                            )
                        })}
                    </div>
                )}
            </TransitionMotion>
        )
    }
}
