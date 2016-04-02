import React, { PropTypes } from 'react';
import _                    from 'lodash';
import { ListenerMixin }    from 'reflux';
import Widget               from './Widget.jsx';
import DashboardStore       from './../stores/DashboardStore';


const Dashboard = React.createClass({
    displayName: 'Dashboard',

    propTypes: {
        dashboard: PropTypes.shape({
            title:   PropTypes.string,
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
    },

    mixins:[ListenerMixin],

    getInitialState() {
        return {
            isCurrent: false
        };
    },

    componentWillMount() {
        this.listenTo(DashboardStore, this.onDashboardStoreUpdate);
    },

    onDashboardStoreUpdate(index) {
        const { dashboard } = this.props;

        this.setState({
            isCurrent: index === dashboard.index
        });
    },

    render() {
        const { dashboard: { columns, rows, widgets, title } } = this.props;
        const { isCurrent }                                    = this.state;

        const widgetNodes = widgets.map((widget, index) => {
            const props = _.extend({}, _.omit(widget, ['columns', 'rows']), {
                key:  `widget.${index}`,
                type: widget.type,
                w:    `${ widget.columns / columns * 100 }%`,
                h:    `${ widget.rows    / rows    * 100 }%`,
                x:    `${ widget.x       / columns * 100 }%`,
                y:    `${ widget.y       / rows    * 100 }%`
            });

            return React.createElement(Widget, props);
        });

        let cssClasses     = 'dashboard__sheet';
        let bodyCssClasses = 'dashboard__body';
        if (isCurrent) {
            cssClasses += ' _is-current';
        }

        let titleNode = null;
        if (title) {
            bodyCssClasses += ' dashboard__body--with-header';
            titleNode = (
                <div className="dashboard__title">
                    {title}
                </div>
            );
        }

        return (
            <div className={cssClasses}>
                {titleNode}
                <div className={bodyCssClasses}>
                    {widgetNodes}
                </div>
            </div>
        );
    }
});


export default Dashboard;
