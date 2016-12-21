import React, { Component, PropTypes } from 'react'
import ThemeSetting                    from './ThemesSetting'


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

        const style = {
            padding:        theme.widget.spacing,
            position:       'absolute',
            background:     theme.colors.background,
            zIndex:         '10000',
            top:            0,
            width:          '100%',
            bottom:         '50%',
            display:        'flex',
            boxShadow:      theme.settings.shadow,
            justifyContent: 'flex-end',
        }

        const rootStyle = {
            position:       'absolute',
            background:     theme.colors.overlay,
            zIndex:         '10000',
            top:            theme.dashboard.header.height,
            width:          '100%',
            bottom:         0,
        }

        const overlayStyle = {
            position: 'absolute',
            top:      0,
            left:     0,
            width:    '100%',
            height:   '100%',
        }

        return (
            <div style={rootStyle}>
                <div
                    style={overlayStyle}
                    onClick={close}
                />
                <div style={style}>
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
