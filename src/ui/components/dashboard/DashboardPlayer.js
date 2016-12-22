import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import { MorphIcon }                   from 'react-svg-buttons'
import classes                         from './DashboardPlayer.css'


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

        const iconColor = _.get(theme, 'colors.icon', '#000')

        let icon
        let handler
        if (isPlaying) {
            icon    = 'plus'
            handler = pause
        } else {
            icon    = 'plusSparks'
            handler = play
        }

        return (
            <div className={classes.player}>
                <span
                    className={classes.button}
                    onClick={previous}
                >
                    <MorphIcon
                        type="arrowLeft"
                        size={32}
                        color={iconColor}
                    />
                </span>
                <span className={`${classes.index} ${_.get(theme, 'dashboardPlayer.index', '')}`}>
                        {currentDashboardIndex + 1}
                </span>
                <span className={`${classes.slash} ${_.get(theme, 'dashboardPlayer.slash', '')}`}>
                    /
                </span>
                <span className={`${classes.index} ${_.get(theme, 'dashboardPlayer.index', '')}`}>
                    {dashboards.length}
                </span>
                <span
                    className={classes.button}
                    onClick={handler}
                >
                    <MorphIcon
                        type={icon}
                        size={32}
                        color={iconColor}
                    />
                </span>
                <span
                    className={classes.button}
                    onClick={next}
                >
                    <MorphIcon
                        type="arrowRight"
                        size={32}
                        color={iconColor}
                    />
                </span>
            </div>
        )
    }
}
