import d3 from 'd3';
import _  from 'lodash';


class Pie {
    constructor(element, options) {
        this.svg              = d3.select(element);
        this.arcsContainer    = this.svg.append('g').attr('class', 'arcs');
        this.paths            = this.arcsContainer.selectAll('.pie_slice');
        this.arcsOutline      = this.arcsContainer.append('path').attr('class', 'pie_outline');
        this.legendsContainer = this.svg.append('g').attr('class', 'pie_svg_legends');
        this.legends          = this.legendsContainer.selectAll('.pie_svg_legend');

        this.options = _.merge({
            sort:            null,
            gauge:           false,
            handAnchorRatio: 0.03,
            handLengthRatio: 0.7,
            startAngle:      0,
            endAngle:        360,
            spacing:         _.merge({
                top:    10,
                right:  10,
                bottom: 10,
                left:   10
            }, options.spacing || {})
        }, options);

        const { sort, gauge, padAngle, startAngle, endAngle } = this.options;

        if (gauge === true) {
            this.hand       = this.svg.append('g').attr('class', 'pie_gauge_needle');
            this.handAnchor = this.hand.append('circle').attr('class', 'pie_gauge_anchor');
            this.handBase   = this.hand.append('circle').attr('class', 'pie_gauge_needle_base');
            this.handLine   = this.hand.append('path').attr('class', 'pie_gauge_needle_arrow');
            this.angleScale = d3.scale.linear().range([startAngle, endAngle]);
        }

        this.pie = d3.layout.pie()
            .value(d => d.count)
            .sort(sort)
            .startAngle(Pie.degreesToRadians(startAngle))
            .endAngle(Pie.degreesToRadians(endAngle))
        ;

        if (padAngle !== undefined) {
            this.pie.padAngle = Pie.degreesToRadians(padAngle);
        }

        this.width  = 100;
        this.height = 100;
    }

    size(width, height) {
        this.width  = width;
        this.height = height;

        return this;
    }

    draw(data, gaugeVal, legends = []) {
        let prevData = this.paths.data();
        let newData  = this.pie(data);

        this.svg.attr({
            width:  this.width,
            height: this.height
        });

        let { spacing, donutRatio, transitionDuration, gauge } = this.options;

        const utilWidth  = this.width  - spacing.left - spacing.right;
        const utilHeight = this.height - spacing.top  - spacing.bottom;

        if (utilWidth < 1 || utilHeight < 1) {
            return;
        }

        let centerX     = utilWidth  / 2 + spacing.left;
        let centerY     = utilHeight / 2 + spacing.top;
        let minSize     = Math.min(utilWidth, utilHeight);
        let radius      = minSize / 2;
        let innerRadius = radius * donutRatio;

        const line = d3.svg.line()
            .x(d => d.x)
            .y(d => d.y)
        ;

        if (gauge === true) {
            if (gaugeVal === undefined) {
                throw 'Pie: gauge value is undefined and gauge option is set to true';
            }

            const { handLengthRatio, handAnchorRatio } = this.options;

            const totalCount = d3.sum(data, d => d.count);
            this.angleScale.domain([0, totalCount]);

            this.hand
                .attr('transform', `translate(${ centerX },${ centerY })`)
            ;
            this.handBase.attr('r', radius * handAnchorRatio);

            this.handLine.transition()
                .duration(transitionDuration)
                .attr('transform', `rotate(${ this.angleScale(Math.min(gaugeVal, totalCount)) } 0 0)`)
            ;

            this.handLine.attr('d', line([
                { x: -radius * handAnchorRatio,       y: 0 },
                { x: -radius * (handAnchorRatio / 4), y: -radius * handLengthRatio },
                { x:  radius * (handAnchorRatio / 4), y: -radius * handLengthRatio },  // eslint-disable-line key-spacing
                { x:  radius * handAnchorRatio,       y: 0 }                           // eslint-disable-line key-spacing
            ]));
        }

        let arc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(innerRadius)
        ;

        this.arcsContainer.attr('transform', `translate(${ centerX },${ centerY })`);

        this.paths = this.paths.data(newData, Pie.dataKey);

        this.paths.enter().append('path')
            .attr('class', 'pie_slice')
            .each(function (d, i) {
                this._current = Pie.findNeighborArc(i, prevData, newData) || d;
            })
            .attr('fill', d => d.data.color)
        ;

        this.arcsOutline.attr('d', arc({
            startAngle: Pie.degreesToRadians(this.options.startAngle),
            endAngle:   Pie.degreesToRadians(this.options.endAngle)
        }));

        // Store the displayed angles in _current.
        // Then, interpolate from _current to the new angles.
        // During the transition, _current is updated in-place by d3.interpolate.
        function arcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function (t) {
                return arc(i(t));
            };
        }

        this.paths.exit()
            .datum(function (d, i) {
                return  Pie.findNeighborArc(i, prevData, newData, key) || d;
            })
            .transition()
            .duration(transitionDuration)
            .attrTween('d', arcTween)
            .remove()
        ;

        this.paths.transition()
            .duration(transitionDuration)
            .attrTween('d', arcTween)
            .attr('fill', d => d.data.color)
        ;

        // —————————————————————————————————————————————————————————————————————————————————————————————————————————————
        // legends
        // —————————————————————————————————————————————————————————————————————————————————————————————————————————————
        let legendsArc = d3.svg.arc()
            .innerRadius(radius + 24)
            .outerRadius(radius + 24)
        ;

        this.legendsContainer.attr('transform', `translate(${ centerX },${ centerY })`);

        this.legends = this.legends.data(this.pie(legends));

        this.legends.enter().append('g')
            .attr('class', 'pie_svg_legend')
            .each(function (d) {
                const elem = d3.select(this);
                elem.append('path')
                    .attr('d', line([
                        { x: -9, y:  0 }, // eslint-disable-line key-spacing
                        { x:  9, y:  0 }, // eslint-disable-line key-spacing
                        { x:  0, y: 18 }  // eslint-disable-line key-spacing
                    ]));
                ;
                elem.append('rect')
                    .attr('rx', 3)
                    .attr('ry', 3)
                ;
                elem.append('text')
                    .attr('alignment-baseline', 'middle')
                ;
            })
        ;

        this.legends
            .attr('transform', (d) => {
                d.startAngle = d.endAngle;
                const centroid = legendsArc.centroid(d);
                d.x = centroid[0];
                d.y = centroid[1];

                return `translate(${d.x}, ${d.y})`;
            })
            .each(function (d) {
                const elem = d3.select(this);
                const legendText = elem.select('text')
                    .style('text-anchor', Math.abs(d.x) < 30 ? 'middle' : (d.x < 0 ? 'end' : 'start'))
                    .text(d.data.label)
                ;

                const textBBox = legendText[0][0].getBBox();

                const angle = Pie.radiansToDegrees(d.startAngle);
                elem.select('path')
                    .attr('transform', `rotate(${angle} 0 0)`)
                ;

                elem.select('rect')
                    .attr('x',      textBBox.x      - 8)
                    .attr('y',      textBBox.y      - 3)
                    .attr('width',  textBBox.width  + 16)
                    .attr('height', textBBox.height + 6)
                ;
            })
        ;

        this.legends.exit().remove();

        return this;
    }

    static degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    static radiansToDegrees(radians) {
        return 180 * radians / Math.PI;
    }

    // Return computed arc data key
    static dataKey(d) {
        return d.data.id;
    }

    // Try to get a neighbor arc, otherwise, returns null
    static findNeighborArc(i, prevData, newData) {
        let d;

        return (d = Pie.findPreceding(i, prevData, newData)) ? { startAngle: d.endAngle,   endAngle: d.endAngle   }
             : (d = Pie.findFollowing(i, prevData, newData)) ? { startAngle: d.startAngle, endAngle: d.startAngle }
             : null;
    }

    // Find the element in prevData that joins
    // the highest preceding element in newData.
    static findPreceding(i, prevData, newData) {
        var m = prevData.length;
        while (--i >= 0) {
            var k = Pie.dataKey(newData[i]);
            for (var j = 0; j < m; ++j) {
                if (Pie.dataKey(prevData[j]) === k) {
                    return prevData[j];
                }
            }
        }
    }

    // Find the element in prevData that joins
    // the lowest following element in newData.
    static findFollowing(i, prevData, newData) {
        var n = newData.length, m = prevData.length;
        while (++i < n) {
            var k = Pie.dataKey(newData[i]);
            for (var j = 0; j < m; ++j) {
                if (Pie.dataKey(prevData[j]) === k) return prevData[j];
            }
        }
    }
}


export default Pie;
