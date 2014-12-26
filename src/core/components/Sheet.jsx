var React      = require('react');
var _          = require('lodash');
var Reflux     = require('reflux');
var Widget     = require('./Widget.jsx');
var SheetStore = require('./../stores/SheetStore');

var Sheet = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function () {
        return {
            isCurrent: false
        };
    },

    componentWillMount: function () {
        this.listenTo(SheetStore, this.onStoreUpdate);
    },

    onStoreUpdate: function (index) {
        this.setState({
            isCurrent: index === this.props.dashboard.index
        });
    },

    render: function () {
        var columns = this.props.dashboard.columns;
        var rows    = this.props.dashboard.rows;

        var widgetNodes = _.map(this.props.dashboard.widgets, function (widget, index) {

            var props = _.extend({}, _.omit(widget, ['columns', 'rows']), {
                key:  index,
                type: widget.type,
                w:    (widget.columns / columns * 100) + '%',
                h:    (widget.rows    / rows    * 100) + '%',
                x:    (widget.x       / columns * 100) + '%',
                y:    (widget.y       / rows    * 100) + '%'
            });

            return React.createElement(Widget, props);
        });

        var cssClasses = 'hotboard__sheet';
        if (this.state.isCurrent) {
            cssClasses += ' _is-current';
        }

        return (
            <div className={cssClasses}>
                {widgetNodes}
            </div>
        );
    }
});

module.exports = Sheet;