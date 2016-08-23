import React, { Component, PropTypes } from 'react'
import classNames                      from 'classnames'
import _                               from 'lodash'
import Widget                          from '../containers/WidgetContainer'


class Dashboard extends Component {
    render() {
        const {
            dashboard: { columns, rows, widgets, title },
            isCurrent,
            registry,
        } = this.props

        const widgetNodes = widgets.map((widget, index) => {
            const props = _.extend({}, _.omit(widget, ['columns', 'rows']), {
                key:    `widget.${index}`,
                type:   widget.type,
                width:  `${ widget.columns / columns * 100 }%`,
                height: `${ widget.rows    / rows    * 100 }%`,
                x:      `${ widget.x       / columns * 100 }%`,
                y:      `${ widget.y       / rows    * 100 }%`,
                registry,
            })

            return React.createElement(Widget, props)
        })

        const classes     = classNames('dashboard__sheet', { '_is-current': isCurrent })
        const bodyClasses = classNames('dashboard__body',  { 'dashboard__body--with-header': title })

        return (
            <div className={classes}>
                {title && (
                    <div className="dashboard__title">
                        {title}
                    </div>
                )}
                <div className={bodyClasses}>
                    {widgetNodes}
                </div>
            </div>
        )
    }
}

export const DashboardPropType = PropTypes.shape({
    columns: PropTypes.number.isRequired,
    rows:    PropTypes.number.isRequired,
    widgets: PropTypes.arrayOf(PropTypes.shape({
        type:    PropTypes.string.isRequired,
        x:       PropTypes.number.isRequired,
        y:       PropTypes.number.isRequired,
        columns: PropTypes.number.isRequired,
        rows:    PropTypes.number.isRequired
    })).isRequired,
})

Dashboard.propTypes = {
    dashboard: DashboardPropType.isRequired,
    isCurrent: PropTypes.bool.isRequired,
    registry:  PropTypes.shape({
        get: PropTypes.func.isRequired,
    }).isRequired,
}


export default Dashboard
