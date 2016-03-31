var React          = require('react');
var _              = require('lodash');
var Reflux         = require('reflux');
var Widget         = require('./Widget.jsx');
var DashboardStore = require('./../stores/DashboardStore');

var Dashboard = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState() {
        return {
            isCurrent: false
        };
    },

    componentWillMount() {
        this.listenTo(DashboardStore, this.onDashboardStoreUpdate);
    },

    onDashboardStoreUpdate(index) {
        this.setState({
            isCurrent: index === this.props.dashboard.index
        });
    },

    render() {
        var columns        = this.props.dashboard.columns;
        var rows           = this.props.dashboard.rows;
        var title          = this.props.dashboard.title || '';
        var titleHeight    = 10;

        var widgetNodes = _.map(this.props.dashboard.widgets, (widget, index) => {
            var widgetHeight = widget.rows / rows * 100 + '%';
            var widgetY = widget.y / rows * 100 + '%';
            if (title) {
              widgetHeight = 'calc(' + widgetHeight + ' - ' + (titleHeight / rows) + 'vmin)';
              widgetY = 'calc(' + widgetY + ' + ' + (titleHeight / (widget.y === 0 ? 1 : rows)) + 'vmin)';
            }

            var props = _.extend({}, _.omit(widget, ['columns', 'rows']), {
                key:  index,
                type: widget.type,
                w:    (widget.columns / columns * 100) + '%',
                h:    widgetHeight,
                x:    (widget.x       / columns * 100) + '%',
                y:    widgetY
            });

            return React.createElement(Widget, props);
        });

        var cssClasses = 'dashboard__sheet';
        if (this.state.isCurrent) {
            cssClasses += ' _is-current';
        }

        var titleNode = null;

        if (title) {
          titleNode = (
            <div className="dashboard__title">{title}</div>
          );
        }

        return (
            <div className={cssClasses}>
                {titleNode}
                {widgetNodes}
            </div>
        );
    }
});

module.exports = Dashboard;
