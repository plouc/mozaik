import d3 from 'd3';
import _  from 'lodash';


class Pie {
    constructor(element, options) {
        this.svg             = d3.select(element);
        this.arcsContainer   = this.svg.append('g').attr('class', 'arcs');
        this.paths           = this.arcsContainer.selectAll('path');
        this.shadowContainer = this.svg.append('g').attr('class', 'pie_shadow');
        this.shadowPath      = this.shadowContainer.append('path');
        this.lightContainer = this.svg.append('g').attr('class', 'pie_light');
        this.lightPath      = this.lightContainer.append('path');

        this.options = _.merge({
            sort:            null,
            gauge:           false,
            handAnchorRatio: 0.03,
            handLengthRatio: 0.7,
            startAngle:      0,
            endAngle:        360
        }, options);

        let { sort, gauge, padAngle, startAngle, endAngle } = this.options;

        if (gauge === true) {
            this.hand       = this.svg.append('g').attr('class', 'pie_hand');
            this.handAnchor = this.hand.append('circle').attr('class', 'pie_hand_anchor');
            this.handLine   = this.hand.append('path').attr('class', 'pie_hand_line');
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

    draw(data, gaugeVal) {
        let prevData = this.paths.data();
        let newData  = this.pie(data);

        this.svg.attr({
            width:  this.width,
            height: this.height
        });

        let { donutRatio, spacing, transitionDuration, gauge } = this.options;

        let centerX     = this.width  / 2;
        let centerY     = this.height / 2;
        let minSize     = Math.min(this.width, this.height);
        let radius      = minSize / 2 - minSize * spacing;
        let innerRadius = radius * donutRatio;

        if (gauge === true) {
            if (gaugeVal === undefined) {
                throw 'Pie: gauge value is undefined and gauge option is set to true';
            }

            let { handLengthRatio, handAnchorRatio } = this.options;

            let totalCount = d3.sum(data, d => d.count);
            this.angleScale.domain([0, totalCount]);

            this.hand
                .attr('transform', `translate(${ centerX },${ centerY }) rotate(${ this.angleScale(Math.min(gaugeVal, totalCount)) } 0 0)`)
            ;
            this.handAnchor.attr('r', radius * handAnchorRatio);

            var line = d3.svg.line()
                .x(d => d.x)
                .y(d => d.y)
            ;

            this.handLine.attr('d', line([
                { x: -radius * handAnchorRatio,       y: 0 },
                { x: -radius * (handAnchorRatio / 4), y: -radius * handLengthRatio },
                { x:  radius * (handAnchorRatio / 4), y: -radius * handLengthRatio },
                { x:  radius * handAnchorRatio,       y: 0 }
            ]));
        }

        let shadowArc = d3.svg.arc()
            .outerRadius(radius * (donutRatio + (1 - donutRatio) / 8))
            .innerRadius(innerRadius)
        ;

        this.shadowContainer.attr('transform', `translate(${ centerX },${ centerY })`);
        this.shadowPath.attr('d', shadowArc({ startAngle: this.pie.startAngle(), endAngle: this.pie.endAngle() }));

        let lightArc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radius * (donutRatio + (1 - donutRatio) / 8 * 7))
        ;

        this.lightContainer.attr('transform', `translate(${ centerX },${ centerY })`);
        this.lightPath.attr('d', lightArc({ startAngle: this.pie.startAngle(), endAngle: this.pie.endAngle() }));

        let arc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(innerRadius)
        ;

        this.arcsContainer.attr('transform', `translate(${ centerX },${ centerY })`);

        this.paths = this.paths.data(newData, Pie.dataKey);

        this.paths.enter().append('path')
            .each(function (d, i) {
                this._current = Pie.findNeighborArc(i, prevData, newData) || d;
            })
            .attr('fill', d => d.data.color)
        ;

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

        return this;
    }

    static degreesToRadians(degrees) {
    	return degrees * Math.PI / 180;
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


export { Pie as default };
