import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import Widget                          from '../../containers/WidgetContainer'


class Dashboard extends Component {
    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const {
            dashboard: { columns, rows, widgets, title },
            isCurrent,
            registry,
        } = this.props

        const { theme } = this.context

        const widgetNodes = widgets.map((widget, index) => {
            const props = _.extend({}, _.omit(widget, ['columns', 'rows']), {
                key:    `widget.${index}.${widget.type}`,
                type:   widget.type,
                width:  `${ widget.columns / columns * 100 }%`,
                height: `${ widget.rows    / rows    * 100 }%`,
                x:      `${ widget.x       / columns * 100 }%`,
                y:      `${ widget.y       / rows    * 100 }%`,
                registry,
            })

            return React.createElement(Widget, props)
        })

        const dashboardStyle = {
            position:        'absolute',
            top:             `calc(${theme.widget.spacing} / 2 + ${theme.dashboard.header.height})`,
            bottom:          `calc(${theme.widget.spacing} / 2)`,
            left:            `calc(${theme.widget.spacing} / 2)`,
            right:           `calc(${theme.widget.spacing} / 2)`,
            font:            theme.fonts.default,
            backgroundColor: theme.colors.background,
            color:           theme.colors.text,
        }

        return (
            <div style={dashboardStyle}>
                {widgetNodes}
            </div>
        )
    }
}

export const DashboardPropType = PropTypes.shape({
    columns: PropTypes.number.isRequired,
    rows:    PropTypes.number.isRequired,
    widgets: PropTypes.arrayOf(PropTypes.shape({
        extension: PropTypes.string.isRequired,
        widget:    PropTypes.string.isRequired,
        x:         PropTypes.number.isRequired,
        y:         PropTypes.number.isRequired,
        columns:   PropTypes.number.isRequired,
        rows:      PropTypes.number.isRequired
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
