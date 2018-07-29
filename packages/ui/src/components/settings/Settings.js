import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ThemeSetting from './ThemesSetting'
import { TransitionMotion, spring } from 'react-motion'
import styled from 'styled-components'

const willEnter = () => ({ y: -100, opacity: 0 })
const willLeave = () => ({
    y: spring(-100, { stiffness: 150, damping: 15, precision: 0.1 }),
    opacity: spring(0, { stiffness: 150, damping: 15, precision: 0.01 }),
})

const Overlay = styled.div`
    position: absolute;
    top: 6vmin;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.35);
`

const Container = styled.div`
    position: absolute;
    z-index: 100;
    top: 6vmin;
    right: 0;
    width: 33%;
    bottom: 50%;
    padding: 2vmin 2vmin 0 0;
`

export default class Settings extends Component {
    static propTypes = {
        opened: PropTypes.bool.isRequired,
        close: PropTypes.func.isRequired,
        themes: PropTypes.object.isRequired,
        currentTheme: PropTypes.string.isRequired,
        setTheme: PropTypes.func.isRequired,
    }

    render() {
        const { themes, currentTheme, setTheme, opened, close } = this.props

        const settings = []
        if (opened) {
            settings.push({ key: 'settings' })
        }

        return (
            <div>
                {opened && <Overlay onClick={close} />}
                <TransitionMotion
                    willEnter={willEnter}
                    willLeave={willLeave}
                    styles={settings.map(item => ({
                        key: item.key,
                        style: {
                            y: spring(0, {
                                stiffness: 150,
                                damping: 11,
                                precision: 0.1,
                            }),
                            opacity: spring(1, {
                                stiffness: 150,
                                damping: 11,
                                precision: 0.01,
                            }),
                        },
                    }))}
                >
                    {styles => (
                        <div>
                            {styles.map(({ key, style }) => {
                                return (
                                    <Container
                                        key={key}
                                        style={{
                                            opacity: style.opacity,
                                            transform: `translate(0,${style.y}px)`,
                                        }}
                                    >
                                        <ThemeSetting
                                            themes={themes}
                                            currentTheme={currentTheme}
                                            setTheme={setTheme}
                                        />
                                    </Container>
                                )
                            })}
                        </div>
                    )}
                </TransitionMotion>
            </div>
        )
    }
}
