import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import Widget                          from '../../containers/WidgetContainer'


export default class DashboardPlayer extends Component {
    static propTypes = {
        currentDashboardIndex: PropTypes.number.isRequired,
        dashboards:            PropTypes.array.isRequired,
        isPlaying:             PropTypes.bool.isRequired,
        play:                  PropTypes.func.isRequired,
        pause:                 PropTypes.func.isRequired,
        previous:              PropTypes.func.isRequired,
        next:                  PropTypes.func.isRequired,
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
        } = this.props

        const { theme } = this.context

        let icon
        let handler
        let label
        if (isPlaying) {
            icon    = 'pause'
            handler = pause
        } else {
            icon    = 'play'
            handler = play
        }

        const buttonStyle = {
            cursor:         'pointer',
            width:          `calc(${theme.dashboard.header.height} * .6`,
            height:         `calc(${theme.dashboard.header.height} * .6`,
            display:        'flex',
            justifyContent: 'center',
            alignItems:     'center',
            fontSize:       '1.4vmin',
        }

        return (
            <div
                style={{
                    display:    'flex',
                    alignItems: 'center',
                }}
            >
                <span
                    onClick={previous}
                    style={buttonStyle}
                >
                    <i className={`fa fa-step-backward`}/>
                </span>
                <span
                    onClick={handler}
                    style={buttonStyle}
                >
                    <i className={`fa fa-${icon}`}/>
                </span>
                <span
                    onClick={next}
                    style={buttonStyle}
                >
                    <i className={`fa fa-step-forward`}/>
                </span>
                <span style={{ marginLeft: '2vmin' }}>
                    {currentDashboardIndex + 1} / {dashboards.length}
                </span>
            </div>
        )
    }
}
