var React            = require('react');
var Reflux           = require('reflux');
var moment           = require('moment');
var $                = require('jquery');
var d3               = require('d3');
var _                = require('lodash');
var ApiConsumerMixin = require('./../../../core/mixins/ApiConsumerMixin');
var BuildHistoryItem = require('./BuildHistoryItem.jsx');

var BuildHistogram = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    propTypes: {
        owner:      React.PropTypes.string.isRequired,
        repository: React.PropTypes.string.isRequired
    },

    getInitialState() {
        return {
            builds: []
        };
    },

    getApiRequest() {
        return {
            id: 'travis.buildHistory.' + this.props.owner + '.' + this.props.repository,
            params: {
                owner:      this.props.owner,
                repository: this.props.repository
            }
        };
    },

    onApiData(builds) {
        this.setState({
            builds: _.clone(builds).reverse()
        });
    },

    componentDidMount() {
        var $this = $(this.getDOMNode());

        this.$body = $this.find('.widget__body');
        this.svg   = d3.select(this.$body.find('svg').get(0));

        this.backgroundBarsContainer = this.svg.append('g');
        this.barsContainer           = this.svg.append('g');
        this.xAxisContainer          = this.svg.append('g');
        this.yAxisContainer          = this.svg.append('g');

        this.xAxisContainer.attr('class', 'travis__build-histogram__axis travis__build-histogram__axis--x');
        this.yAxisContainer.attr('class', 'travis__build-histogram__axis travis__build-histogram__axis--y');

        this.xAxisLegend = this.svg.append('text');
        this.xAxisLegend
            .attr('class', 'histogram__axis__legend')
            .attr('text-anchor', 'middle')
            .text('build number')
        ;

        this.yAxisLegend = this.svg.append('text');
        this.yAxisLegend
            .attr('class', 'histogram__axis__legend')
            .attr('text-anchor', 'middle')
            .text('duration in seconds')
        ;
    },

    drawGraph() {
        var width  = this.$body.outerWidth();
        var height = this.$body.outerHeight();

        this.svg.attr({
            width:  width,
            height: height
        });

        var margin = {
            top:    20,
            right:  20,
            bottom: 60,
            left:   60
        };

        var utilWidth  = width  - margin.left - margin.right;
        var utilHeight = height - margin.top  - margin.bottom;

        this.xAxisLegend.attr('transform', 'translate(' + (margin.left + utilWidth / 2) + ',' + (margin.top + utilHeight + 45) + ')');
        this.yAxisLegend.attr('transform', 'rotate(-90) translate(-' + (margin.top + utilHeight / 2) + ',24)');

        var x = d3.scale.ordinal()
            .rangeBands([0, utilWidth], .2, 0);

        var y = d3.scale.linear()
            .range([utilHeight, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

        x.domain(this.state.builds.map(d => parseInt(d.number, 10)));
        y.domain([0, d3.max(this.state.builds, d => d.duration)]);

        this.backgroundBarsContainer
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        this.backgroundBarsContainer.selectAll('.travis__build-histogram__bar-bg')
            .data(this.state.builds)
            .enter().append('rect')
            .attr('class', 'travis__build-histogram__bar-bg')
            .attr('x', d => x(d.number))
            .attr('width', x.rangeBand())
            .attr('y', 0)
            .attr('height', d => {
                var height = utilHeight - (utilHeight - y(d.duration)) - 3;
                return height > 0 ? height : 0;
            });


        this.xAxisContainer
            .attr('transform', 'translate(' + margin.left + ',' + (margin.top + utilHeight) + ')')
            .call(xAxis)
            .selectAll('text')
            .attr('y', 0)
            .attr('x', 9)
            .attr('dy', '.35em')
            .attr('transform', 'rotate(90)')
            .style('text-anchor', 'start')
        ;

        this.yAxisContainer
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .call(yAxis)
        ;

        this.barsContainer
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        this.barsContainer.selectAll('.travis__build-histogram__bar')
            .data(this.state.builds)
            .enter().append('rect')
            .attr('class', d => {
                return 'travis__build-histogram__bar travis__build-histogram__bar--' + d.state;
            })
            .attr('x', d => x(d.number))
            .attr('width', x.rangeBand())
            .attr('y', d => y(d.duration))
            .attr('height', d => {
                return utilHeight - y(d.duration);
            });
    },

    componentDidUpdate() {
        this.drawGraph();
    },

    render() {
        return (
            <div>
                <div className="widget__header">
                    <span className="widget__header__subject">{this.props.owner}/{this.props.repository}</span> build histogram
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                    <svg />
                </div>
            </div>
        );
    }
});

module.exports = BuildHistogram;