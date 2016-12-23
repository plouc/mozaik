import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import { NavButton }                   from 'react-svg-buttons'
import { DashboardPropType }           from './Dashboard'
import DashboardTitle                  from './DashboardTitle'
import DashboardPlayer                 from './DashboardPlayer'
import classes                         from './DashboardHeader.css'


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

        let title = 'Mozaïk'
        if (dashboards.length) {
            const dashboard = dashboards[currentDashboardIndex]
            if (dashboard.title !== undefined) {
                title = dashboard.title
            }
        }

        return (
            <div className={`dashboard__header ${classes.header} ${_.get(theme, 'dashboardHeader.header', '')}`}>
                <div styleName="title_wrapper">
                    <DashboardTitle
                        currentDashboardIndex={currentDashboardIndex}
                        title={title}
                    />
                </div>
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
                <div
                    onClick={toggleSettings}
                    className="dashboard__header__toggle"
                    styleName="toggle"
                    style={{}}
                >
                    <NavButton
                        direction="down"
                        opened={settingsOpened}
                        size={32}
                        color={_.get(theme, 'colors.icon', '#000')}
                    />
                </div>
            </div>
        )
    }
}
