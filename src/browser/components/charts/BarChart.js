import d3 from 'd3';
import _  from 'lodash';


class BarChart {
    constructor(element, options) {
        this.svg            = d3.select(element);
        this.xAxisContainer = this.svg.append('g');
        this.yAxisContainer = this.svg.append('g');

        this.barsContainer  = this.svg.append('g');
        this.bars           = this.barsContainer.selectAll('.bar-chart_bar');

        this.xAxisContainer.attr('class', 'bar-chart_axis bar-chart_axis--x');
        this.yAxisContainer.attr('class', 'bar-chart_axis bar-chart_axis--y');

        this.xAxis = d3.svg.axis().orient('bottom');
        this.yAxis = d3.svg.axis().orient('left');

        this.xScale = d3.scale.ordinal();
        this.yScale = d3.scale.linear();

        this.options = _.merge({
            mode:               BarChart.MODE_STACKED,
            xLegend:            'absciss',
            xLegendPosition:    'right',
            yLegend:            'ordinate',
            yLegendPosition:    'top',
            xPadding:           0.1,
            yTickFormat:        '',
            transitionDuration: 600,
            barColor:           null,
            barClass:           null,
            margin:             {
                top:    20,
                right:  20,
                bottom: 60,
                left:   60
            }
        }, options);

        this.xAxisLegend = this.svg.append('text');
        this.xAxisLegend
            .attr('class', 'bar-chart_axis_legend bar-chart_axis_legend--x')
            .text(this.options.xLegend)
        ;
        switch (this.options.xLegendPosition) {
            case 'left':
                this.xAxisLegend.attr('text-anchor', 'start');
                break;

            case 'center':
                this.xAxisLegend.attr('text-anchor', 'middle');
                break;

            case 'right':
                this.xAxisLegend.attr('text-anchor', 'end');
                break;

            default:
                throw `unsupported x legend position '${ this.options.xLegendPosition }'`;
        }

        this.yAxisLegend = this.svg.append('text');
        this.yAxisLegend
            .attr('class', 'bar-chart_axis_legend bar-chart_axis_legend--y')
            .text(this.options.yLegend)
        ;
        switch (this.options.yLegendPosition) {
            case 'top':
                this.yAxisLegend.attr('text-anchor', 'end');
                break;

            case 'center':
                this.yAxisLegend.attr('text-anchor', 'middle');
                break;

            case 'bottom':
                this.yAxisLegend.attr('text-anchor', 'start');
                break;

            default:
                throw `unsupported x legend position '${ this.options.yLegendPosition }'`;
        }

        this.rawData      = [];
        this.computedData = [];
    }

    size(width, height) {
        this.width  = width;
        this.height = height;

        return this;
    }

    data(data) {
        this.rawData = data;

        this.computeData();

        return this;
    }

    computeData() {
        let { mode } = this.options;

        let computed = [];

        this.rawData.forEach(row => {
            row.data.forEach(d => {
                let column = _.find(computed, { 'x': d.x });
                if (column === undefined) {
                    column = { x: d.x, ys: [] };
                    computed.push(column);
                }

                d.y0 = 0;
                d.y1 = d.y;

                column.ys.push(d);
            });
        });

        computed.forEach(d => {
            d.maxX = _.max(_.pluck(d.ys, 'y1'));

            if (mode === BarChart.MODE_STACKED) {
                d.ys.sort((a, b) => a.y1 - b.y1);
                d.ys.forEach((o, i) => {
                    if (i > 0) {
                        o.y0 = d.ys[i-1].y1;
                    }
                });
            }
        });

        this.computedData = computed;

        return this;
    }

    draw() {
        let { mode, margin, xPadding, transitionDuration, xLegendPosition, yLegendPosition, barClass, barColor } = this.options;

        this.svg.attr({ width: this.width, height: this.height });

        let innerWidth  = this.width  - margin.left - margin.right;
        let innerHeight = this.height - margin.top  - margin.bottom;

        switch (xLegendPosition) {
            case 'left':
                this.xAxisLegend.attr('transform', `translate(${ margin.left },${ margin.top + innerHeight + 45 })`);
                break;

            case 'center':
                this.xAxisLegend.attr('transform', `translate(${ margin.left + innerWidth / 2 },${ margin.top + innerHeight + 45 })`);
                break;

            case 'right':
                this.xAxisLegend.attr('transform', `translate(${ margin.left + innerWidth },${ margin.top + innerHeight + 45 })`);
                break;

            default:
                throw `unsupported x legend position '${ xLegendPosition }'`;
        }

        switch (yLegendPosition) {
            case 'top':
                this.yAxisLegend.attr('transform', `rotate(-90) translate(-${ margin.top },24)`);
                break;

            case 'center':
                this.yAxisLegend.attr('transform', `rotate(-90) translate(-${ margin.top + innerHeight / 2 },24)`);
                break;

            case 'bottom':
                this.yAxisLegend.attr('transform', `rotate(-90) translate(-${ margin.top + innerHeight },24)`);
                break;

            default:
                throw `unsupported y legend position '${ yLegendPosition }'`;
        }

        this.xScale
            .rangeRoundBands([0, innerWidth], xPadding)
            .domain(_.pluck(this.computedData, 'x'))
        ;
        this.yScale
            .rangeRound([innerHeight, 0])
            .domain([0, _.max(_.pluck(this.computedData, 'maxX'))])
        ;

        let { yTickFormat } = this.options;

        this.xAxis.scale(this.xScale);
        this.yAxis
            .scale(this.yScale)
            .tickSize(-innerWidth, 0, 0)
            .tickFormat(d3.format(yTickFormat))
        ;

        this.xAxisContainer
            .transition()
            .duration(transitionDuration)
            .attr('transform', `translate(${ margin.left },${ margin.top + innerHeight })`)
            .call(this.xAxis)
        ;

        this.yAxisContainer
            .transition()
            .duration(transitionDuration)
            .attr('transform', `translate(${ margin.left },${ margin.top })`)
            .call(this.yAxis)
        ;

        this.barsContainer.attr('transform', `translate(${ margin.left },${ margin.top })`);

        this.bars = this.bars.data(this.computedData);

        let barWidth   = mode === BarChart.MODE_STACKED ? this.xScale.rangeBand() : this.xScale.rangeBand() / 3;
        let barXoffset = mode === BarChart.MODE_STACKED ? 0 : barWidth;

        this.bars.enter().append('g')
            .attr('class', 'bar-chart_bar')
            .attr('transform', d => `translate(${ this.xScale(d.x) }, 0)`)
        ;

        this.bars
            .transition()
            .duration(transitionDuration)
            .attr('transform', d => `translate(${ this.xScale(d.x) }, 0)`)
        ;

        let barParts = this.bars.selectAll('rect').data(d => d.ys);

        let customBarAttributes = {};
        if (barClass !== null) {
            customBarAttributes['class'] = barClass;
        }
        if (barColor !== null) {
            customBarAttributes['fill'] = barColor;
        }

        barParts.enter().append('rect')
           .attr('width', barWidth)
           .attr('x', (d, i) => i * barXoffset)
           .attr('y', innerHeight)
           .attr('height', 0)
           .attr(customBarAttributes)
        ;

        barParts
            .transition()
            .duration(transitionDuration)
            .attr('width', barWidth)
            .attr('x', (d, i) => i * barXoffset)
            .attr('y', d => this.yScale(d.y1))
            .attr('height', d => this.yScale(d.y0) - this.yScale(d.y1))
            .attr(customBarAttributes)
        ;

        this.bars.exit()
            .each(function (d) {
                let bar = d3.select(this);
                bar.selectAll('rect')
                    .transition()
                    .duration(transitionDuration / 2)
                    .attr('y', innerHeight)
                    .attr('height', 0)
                ;
            })
        ;
    }
}

BarChart.MODE_STACKED = 'stacked';
BarChart.MODE_PACKED  = 'packed';


export { BarChart as default };
