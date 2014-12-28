var React            = require('react');
var _                = require('lodash');
var Reflux           = require('reflux');
var d3               = require('d3');
var $                = require('jquery');
var ApiConsumerMixin = require('./../../../core/mixins/ApiConsumerMixin');

var JobBuildsHistogram = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    getInitialState: function () {
        return { builds: [] };
    },

    getApiRequest: function () {
        return {
            id: 'jenkins.job.' + this.props.job,
            params: { job: this.props.job }
        };
    },

    onApiData: function (builds) {
        this.setState({ builds: builds.slice(0, 20).reverse() });
    },

    componentDidMount: function () {
        var $this = $(this.getDOMNode());

        this.$body = $this.find('.widget__body');
        this.svg   = d3.select(this.$body.find('svg').get(0));

        this.backgroundBarsContainer = this.svg.append('g');
        this.barsContainer           = this.svg.append('g');
        this.xAxisContainer          = this.svg.append('g');

        this.xAxisContainer.attr('class', 'jenkins__job-build_durations__axis jenkins__job-build_durations__axis--x');
    },

    drawGraph: function () {
        var width  = this.$body.outerWidth();
        var height = this.$body.outerHeight();

        this.svg.attr({
            width:  width,
            height: height
        });

        var margin = {
            top:    20,
            right:  10,
            bottom: 50,
            left:   50
        };

        var utilWidth  = width  - margin.left - margin.right;
        var utilHeight = height - margin.top  - margin.bottom;

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, utilWidth], .2);

        var y = d3.scale.linear()
            .range([utilHeight, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');

        x.domain(this.state.builds.map(function (d) {
            return d.number;
        }));
        y.domain([0, d3.max(this.state.builds, function (d) {
            return d.duration;
        })]);

        this.backgroundBarsContainer
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        this.backgroundBarsContainer.selectAll('.jenkins__job-build_durations__bar-bg')
            .data(this.state.builds)
        .enter().append('rect')
            .attr('class', function (d) {
                return 'jenkins__job-build_durations__bar-bg';
            })
            .attr('x', function (d) {
                return x(d.number);
            })
            .attr('width', x.rangeBand())
            .attr('y', 0)
            .attr('height', function (d) {
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

        this.barsContainer
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        this.barsContainer.selectAll('.jenkins__job-build_durations__bar')
            .data(this.state.builds)
        .enter().append('rect')
            .attr('class', function (d) {
                return 'jenkins__job-build_durations__bar jenkins__job-build_durations__bar--' + d.result.toLowerCase();
            })
            .attr('x', function (d) {
                return x(d.number);
            })
            .attr('width', x.rangeBand())
            .attr('y', function (d) {
                return y(d.duration);
            })
            .attr('height', function (d) {
                return utilHeight - y(d.duration);
            });
    },

    componentDidUpdate: function () {
        this.drawGraph();
    },

    render: function () {
        return (
            <div>
                <div className="widget__header">
                    Jenkins {this.props.job} builds
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                    <svg />
                </div>
            </div>
        );
    }
});

module.exports = JobBuildsHistogram;