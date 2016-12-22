import React, { Component, PropTypes } from 'react'
import ThemeSetting                    from './ThemesSetting'
import './Settings.css'


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

        if (!opened) return null

        return (
            <div>
                <div
                    styleName="overlay"
                    onClick={close}
                />
                <div styleName="settings" className="settings">
                    <ThemeSetting
                        themes={themes}
                        currentTheme={currentTheme}
                        setTheme={setTheme}
                    />
                </div>
            </div>
        )
    }
}
