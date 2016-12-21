import React, { Component, PropTypes } from 'react'
import { DashboardPropType }           from './Dashboard'
import DashboardTitle                  from './DashboardTitle'
import DashboardPlayer                 from './DashboardPlayer'
import { TransitionMotion, spring }    from 'react-motion'


export default class DashboardHeader extends Component {
    static propTypes = {
        settingsOpened:        PropTypes.bool.isRequired,
        toggleSettings:        PropTypes.func.isRequired,
        dashboards:            PropTypes.arrayOf(DashboardPropType).isRequired,
        currentDashboardIndex: PropTypes.number.isRequired,
        isPlaying:             PropTypes.bool.isRequired,
        play:                  PropTypes.func.isRequired,
        previous:              PropTypes.func.isRequired,
        next:                  PropTypes.func.isRequired,
        pause:                 PropTypes.func.isRequired,
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const {
            dashboards,
            currentDashboardIndex,
            isPlaying,
            play, pause, previous, next,
            settingsOpened,
            toggleSettings,
        } = this.props

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
            overflow:        'hidden',
            ...t.overrides,
        }

        let title = 'Mozaïk'
        if (dashboards.length) {
            const dashboard = dashboards[currentDashboardIndex]
            if (dashboard.title !== undefined) {
                title = dashboard.title
            }
        }

        return (
            <div style={style}>
                <div
                    style={{
                        display:        'flex',
                        flexGrow:       1,
                        alignItems:     'center',
                        justifyContent: 'space-between',
                        marginRight:    '4vmin',
                    }}
                >
                    <DashboardTitle
                        currentDashboardIndex={currentDashboardIndex}
                        title={title}
                    />
                    {dashboards.length && dashboards.length > 1 && (
                        <DashboardPlayer
                            dashboards={dashboards}
                            currentDashboardIndex={currentDashboardIndex}
                            isPlaying={isPlaying}
                            play={play}
                            pause={pause}
                            previous={previous}
                            next={next}
                        />
                    )}
                </div>
                <div
                    onClick={toggleSettings}
                    style={{
                        cursor:         'pointer',
                        width:          theme.dashboard.header.height,
                        height:         theme.dashboard.header.height,
                        display:        'flex',
                        justifyContent: 'center',
                        alignItems:     'center',
                        fontSize:       '2vmin',
                    }}
                >
                    <i className={`fa fa-${settingsOpened ? 'close' : 'sliders'}`}/>
                </div>
            </div>
        )
    }
}
