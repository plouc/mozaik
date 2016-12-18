import React, { Component, PropTypes } from 'react'
import ThemeManager                    from '../themes/ThemeManager'
import WidgetListItem                  from './widget/list/WidgetListItem'


class Settings extends Component {
    static propTypes = {
        setSettings: PropTypes.func.isRequired,
        opened:      PropTypes.bool.isRequired,
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props)

        this.state = {
            themes: [],
        }
    }

    componentDidMount() {
        this.setState({
            themes: ThemeManager.listThemes(),
        })
    }

    render() {
        const { setSettings, opened } = this.props
        const { themes }              = this.state
        const { theme }               = this.context

        if (!opened) return null

        const setTheme = t => () => {
            setSettings({ theme: t })
        }

        const style = {
            padding:        '2vmin',
            position:       'absolute',
            background:     theme.card.bgColor,
            zIndex:         '10000',
            top:            theme.dashboard.header.height,
            width:          '100%',
            bottom:         '50%',
            display:        'flex',
            boxShadow:      theme.card.shadow,
            justifyContent: 'flex-end',
        }

        return (
            <div style={style}>
                <div
                    style={{
                        width: '30%',
                    }}
                >
                    {themes.map(t => (
                        <WidgetListItem
                            key={t}
                            onClick={setTheme(t)}
                            title={t}
                            pre={<i className="fa fa-check"/>}
                        />
                    ))}
                </div>
            </div>
        )
    }
}


export default Settings
