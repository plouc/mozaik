import React, { Component, PropTypes } from 'react'


class DashboardHeader extends Component {
    static propTypes = {
        title:          PropTypes.string,
        settingsOpened: PropTypes.bool.isRequired,
        toggleSettings: PropTypes.func.isRequired,
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { title, settingsOpened, toggleSettings } = this.props
        const { theme } = this.context

        const t     = theme.dashboard.header
        const style = {
            position:        'absolute',
            zIndex:          1000,
            top:             0,
            left:            0,
            width:           '100%',
            height:          t.height,
            backgroundColor: t.bgColor,
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'space-between',
            padding:         t.padding,
            ...t.overrides,
        }

        return (
            <div style={style}>
                Mozaïk
                <div onClick={toggleSettings} style={{ cursor: 'pointer' }}>
                    <i className={`fa fa-${settingsOpened ? 'close' : 'sliders'}`}/>
                </div>
            </div>
        )
    }
}


export default DashboardHeader
