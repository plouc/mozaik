import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import ThemeSetting                    from './ThemesSetting'
import classes                         from './Settings.css'
import { TransitionMotion, spring }    from 'react-motion'


const willEnter = () => ({ y: -100, opacity: 0 })
const willLeave = () => ({
    y:       spring(-100, { stiffness: 150, damping: 15, precision: 0.1  }),
    opacity: spring(0,    { stiffness: 150, damping: 15, precision: 0.01 }),
})

export default class Settings extends Component {
    static propTypes = {
        opened:       PropTypes.bool.isRequired,
        close:        PropTypes.func.isRequired,
        themes:       PropTypes.object.isRequired,
        currentTheme: PropTypes.string.isRequired,
        setTheme:     PropTypes.func.isRequired,
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const {
            themes,
            currentTheme,
            setTheme,
            opened,
            close
        } = this.props

        const { theme } = this.context

        const settings = []
        if (opened) {
            settings.push({ key: 'settings' })
        }

        return (
            <div>
                {opened && (
                    <div
                        className={`${classes.overlay} ${_.get(theme, 'settings.overlay', '')}`}
                        onClick={close}
                    />
                )}
                <TransitionMotion
                    willEnter={willEnter}
                    willLeave={willLeave}
                    styles={settings.map(item => ({
                        key:   item.key,
                        style: {
                            y:       spring(0, { stiffness: 150, damping: 11, precision: 0.1  }),
                            opacity: spring(1, { stiffness: 150, damping: 11, precision: 0.01 }),
                        },
                    }))}
                >
                    {styles => (
                        <div>
                            {styles.map(({ key, style }) => {
                                return (
                                    <div
                                        key={key}
                                        className={`${classes.settings} ${_.get(theme, 'settings.settings', '')}`}
                                        style={{
                                            opacity:   style.opacity,
                                            transform: `translate(0,${style.y}px)`,
                                        }}
                                    >
                                        <ThemeSetting
                                            themes={themes}
                                            currentTheme={currentTheme}
                                            setTheme={setTheme}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </TransitionMotion>
            </div>
        )
    }
}
