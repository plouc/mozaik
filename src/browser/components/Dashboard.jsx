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
        const { dashboard: { columns, rows, widgets } } = this.props;

        const widgetNodes = widgets.map((widget, index) => {
            const props = _.extend({}, _.omit(widget, ['columns', 'rows']), {
                key:    index,
                type:   widget.type,
                x:      `${(widget.x       / columns * 100)}%`,
                y:      `${(widget.y       / rows    * 100)}%`,
                width:  `${(widget.columns / columns * 100)}%`,
                height: `${(widget.rows    / rows    * 100)}%`
            });

            return React.createElement(Widget, props);
        });

        const { isCurrent } = this.state;
        const classes = classNames('dashboard__sheet', { '_is-current': isCurrent });

        return (
            <div className={classes}>
                {widgetNodes}
            </div>
        );
    }
}

Dashboard.displayName = 'Dashboard';

Dashboard.propTypes = {
    dashboard: PropTypes.shape({
        index:   PropTypes.number.isRequired,
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
