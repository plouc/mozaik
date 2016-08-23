import React, { Component, PropTypes } from 'react'


// Injected via webpack
const themes = MOZAIK_THEMES || ['night-blue']

class Settings extends Component {
    render() {
        const { setSettings } = this.props

        const setTheme = theme => () => {
            setSettings({ theme })
        }

        return (
            <div className="settings">
                {themes.map(theme => (
                    <span
                        key={theme}
                        className="settings__item"
                        onClick={setTheme(theme)}
                    >
                        {theme}
                    </span>
                ))}
            </div>
        )
    }
}

Settings.propTypes = {
    setSettings: PropTypes.func.isRequired,
}


export default Settings
