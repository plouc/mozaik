import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import classNames                      from 'classnames';
import _                               from 'lodash';
import { ListenerMixin }               from 'reflux';
import Widget                          from './Widget.jsx';
import DashboardStore                  from './../stores/DashboardStore';


class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCurrent: false
        };
    }

    componentWillMount() {
        this.listenTo(DashboardStore, this.onDashboardStoreUpdate);
    }

    onDashboardStoreUpdate(index) {
        const { dashboard } = this.props;

        this.setState({
            isCurrent: index === dashboard.index
        });
    }

    render() {
        const { dashboard: { columns, rows, widgets, title } } = this.props;
        const { isCurrent }                                    = this.state;

        const widgetNodes = widgets.map((widget, index) => {
            const props = _.extend({}, _.omit(widget, ['columns', 'rows']), {
                key:    `widget.${index}`,
                type:   widget.type,
                width:  `${ widget.columns / columns * 100 }%`,
                height: `${ widget.rows    / rows    * 100 }%`,
                x:      `${ widget.x       / columns * 100 }%`,
                y:      `${ widget.y       / rows    * 100 }%`
            });

            return React.createElement(Widget, props);
        });

        const classes     = classNames('dashboard__sheet', { '_is-current': isCurrent });
        const bodyClasses = classNames('dashboard__body',  { 'dashboard__body--with-header': title });

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
        );
    }
}

Dashboard.displayName = 'Dashboard';

Dashboard.propTypes = {
    dashboard: PropTypes.shape({
        columns: PropTypes.number.isRequired,
        rows:    PropTypes.number.isRequired,
        widgets: PropTypes.arrayOf(PropTypes.shape({
            type:    PropTypes.string.isRequired,
            x:       PropTypes.number.isRequired,
            y:       PropTypes.number.isRequired,
            columns: PropTypes.number.isRequired,
            rows:    PropTypes.number.isRequired
        })).isRequired
    }).isRequired
};

reactMixin(Dashboard.prototype, ListenerMixin);


export default Dashboard;
